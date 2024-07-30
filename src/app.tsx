import { MapPin, Calendar, ArrowRight, Settings2, UserRoundPlus } from "lucide-react";
import { useState } from "react";

export function App() {
  const [isGuestListShow, setIsGuestListShow] = useState(false);

  function toogleGuestListShow() {
    setIsGuestListShow((prev) => !prev);
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

          <div className="flex gap-2 items-center after:block after:w-px after:h-6 after:bg-zinc-400">
            <Calendar className="size-5 text-zinc-400" />
            <input
              type="text"
              disabled={isGuestListShow}
              className="bg-transparent text-lg placeholder-zinc-400 w-40"
              placeholder="Quando?"
            />
          </div>

          {isGuestListShow ? (
            <button
              onClick={toogleGuestListShow}
              className="bg-zinc-800 text-zinc-200 py-2 px-5 rounded-lg flex items-center gap-2 hover:bg-zinc-700 transition-all"
            >
              Alterar local/data
              <Settings2 className="size-5" />
            </button>
          ) : (
            <button
              onClick={toogleGuestListShow}
              className="bg-lime-300 text-lime-950 py-2 px-5 rounded-lg flex items-center gap-2 hover:bg-lime-400 transition-all"
            >
              Continuar
              <ArrowRight className="size-5" />
            </button>
          )}
        </div>

        {isGuestListShow && (
          <div className="h-16 bg-zinc-900 w-full max-w-screen-md rounded-xl px-4 shadow-shape flex items-center justify-between gap-5">
            <div className="flex gap-2 items-center flex-1">
              <UserRoundPlus className="size-5 text-zinc-400" />
              <input
                type="text"
                className="bg-transparent text-lg placeholder-zinc-400 flex-1"
                placeholder="Quem estará na viagem?"
              />
            </div>

            <button className="bg-lime-300 text-lime-950 py-2 px-5 rounded-lg flex items-center gap-2 hover:bg-lime-400 transition-all">
              Confirmar viagem
              <ArrowRight className="size-5" />
            </button>
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
