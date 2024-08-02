import {
  MapPin,
  Calendar,
  ArrowRight,
  Settings2,
  UserRoundPlus,
  AtSign,
  X,
} from "lucide-react";
import { FormEvent, useState } from "react";

export function App() {
  const [isGuestListShow, setIsGuestListShow] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [guestList, setGuestList] = useState<string[]>([]);

  function toogleGuestListShow() {
    setIsGuestListShow((prev) => !prev);
  }

  function toogleGuestModal() {
    setIsGuestModalOpen((prev) => !prev);
  }

  function addToGuestList(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email")?.toString();

    if (!email || guestList.includes(email)) {
      return;
    }

    setGuestList((prevList) => [...prevList, email]);
    e?.currentTarget.reset();
  }

  function removeFromGuestList(email: string) {
    const updatedList = guestList.filter((guestEmail) => guestEmail !== email);
    setGuestList(updatedList);
  }

  return (
    <section className="h-screen w-full flex flex-col align items-center justify-center">
      <header className="flex flex-col align items-center justify-center gap-2">
        <img src="./images/logo.svg" alt="Planner logo" />
        <p className="text-lg text-zinc-300">
          Convide seus amigos e planeje sua próxima viagem!
        </p>
      </header>

      <main className="flex flex-col gap-4 my-10">
        <div className="h-16 bg-zinc-900 w-full max-w-screen-md rounded-xl px-4 shadow-shape flex items-center justify-between gap-5">
          <div className="flex gap-2 items-center flex-1">
            <MapPin className="size-5 text-zinc-400" />
            <input
              type="text"
              className="bg-transparent text-lg placeholder-zinc-400 flex-1"
              placeholder="Para onde você vai?"
              disabled={isGuestListShow}
            />
          </div>

          <div className="flex gap-2 items-center after:block after:w-px after:h-6 after:bg-zinc-400 relative">
            <input
              type="date"
              disabled={isGuestListShow}
              className="bg-transparent text-lg placeholder-zinc-400 w-40 text-zinc-400"
              placeholder="Quando?"
            />
            <Calendar className="size-5 text-zinc-400 absolute right-3" />
          </div>

          {isGuestListShow ? (
            <button
              onClick={toogleGuestListShow}
              className="bg-zinc-800 text-zinc-200 py-2 px-5 rounded-lg flex items-center gap-2 hover:bg-zinc-700  shadow-shape"
            >
              Alterar local/data
              <Settings2 className="size-5" />
            </button>
          ) : (
            <button
              onClick={toogleGuestListShow}
              className="bg-lime-400 text-lime-950 py-2 px-5 rounded-lg flex items-center gap-2 hover:bg-lime-500 shadow-shape"
            >
              Continuar
              <ArrowRight className="size-5" />
            </button>
          )}
        </div>

        {isGuestListShow && (
          <div className="h-16 bg-zinc-900 w-full max-w-screen-md rounded-xl px-4 shadow-shape flex items-center justify-between gap-5">
            <div className="flex gap-2 items-center flex-1 after:block after:w-px after:h-6 after:bg-zinc-400">
              <UserRoundPlus className="size-5 text-zinc-400" />
              <button
                onClick={toogleGuestModal}
                className="bg-transparent text-lg placeholder-zinc-400 flex-1 text-zinc-400 text-left"
              >
                Quem estará na viagem?
              </button>
            </div>

            <button className="bg-lime-400 text-lime-950 py-2 px-5 rounded-lg flex items-center gap-2 hover:bg-lime-500 transition-all shadow-shape">
              Confirmar viagem
              <ArrowRight className="size-5" />
            </button>
          </div>
        )}

        {isGuestModalOpen && (
          <div className="bg-black/50 fixed inset-0 backdrop-blur-sm flex items-center justify-center">
            <div className="shadow-shape bg-zinc-900 py-5 px-6 rounded-xl space-y-5 w-[640px] relative">
              <div className="space-y-2">
                <button
                  onClick={toogleGuestModal}
                  className="absolute right-6 top-5"
                >
                  <X className="text-zinc-300 size-4 " />
                </button>
                <h3 className="text-lg font-semibold">Selecionar convidados</h3>
                <p className="text-zinc-400 text-sm">
                  Os convidados irão receber e-mails para confirmar a
                  participação na viagem.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {guestList &&
                  guestList.map((email, index) => (
                    <div
                      key={index}
                      className="bg-zinc-800 px-2.5 py-1.5 rounded-md flex justify-between gap-2 items-center"
                    >
                      <span className="text-zinc-300 text-base">{email}</span>
                      <button
                        onClick={() => removeFromGuestList(email)}
                        className="size-5 rounded-sm hover:bg-zinc-700 flex items-center justify-center"
                      >
                        <X className="text-zinc-300 size-4" />
                      </button>
                    </div>
                  ))}
              </div>

              <div className="w-full h-px bg-zinc-800" />

              <form className="flex justify-between" onSubmit={addToGuestList}>
                <div className="bg-zinc-950 border border-zinc-800 rounded-lg flex items-center py-2.5 px-4 gap-2 w-full">
                  <AtSign className="size-5 text-zinc-400" />
                  <input
                    type="email"
                    name="email"
                    className="bg-transparent text-lg placeholder-zinc-400 flex-1 text-zinc-400"
                    placeholder="Digite o e-mail do convidado"
                  />
                  <button className="bg-lime-400 text-lime-950 py-2 px-5 rounded-lg flex items-center gap-2 hover:bg-lime-500 transition-all shadow-shape">
                    Convidar
                    <ArrowRight className="size-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <footer>
        <small className="text-zinc-500 text-center w-full max-w-screen-md text-sm">
          Ao planejar sua viagem pela plann.er você automaticamente concorda
          <br />
          com nossos{" "}
          <a href="#" className="text-zinc-300 underline">
            termos de uso
          </a>{" "}
          e{" "}
          <a href="#" className="text-zinc-300 underline">
            políticas de privacidade
          </a>
          .
        </small>
      </footer>
    </section>
  );
}
