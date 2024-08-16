import { CircleCheck, CircleDashed, Link2, Plus, UserCog } from "lucide-react";
import { DestinationAndDateInput } from "../../components/destinationAndDateInput";
import { useState } from "react";
import { CreateActivityModal } from "../../components/createActivityModal";
import { Button } from "../../components/button";
import { Header } from "../../components/header";

export function TripDetails() {
  const [showCreateActivityModal, setShowCreateActivityModal] = useState(false);

  function toogleCreateActivityModal(value: boolean) {
    setShowCreateActivityModal(value);
  }

  return (
    <>
      <Header />
      <header className="max-w-6xl py-10 mx-auto space-y-8">
        <DestinationAndDateInput
          handleChange={() => {}}
          isGuestListShow={true}
          toogleGuestListShow={() => {}}
        />
      </header>

      <main className="max-w-6xl px-6 mx-auto flex gap-16">
        <section className="flex-1 space-y-6">
          <div className="flex justify-between">
            <h1 className="font-semibold text-3xl text-zinc-50">Atividades</h1>
            <Button onClick={() => toogleCreateActivityModal(true)}>
              <Plus className="size-5" />
              Cadastrar atividade
            </Button>
          </div>

          <div className="space-y-8">
            <div className="w-full space-y-2.5">
              <div className="flex gap-2 items-baseline">
                <h3 className="text-xl font-semibold text-zinc-300">Dia 17</h3>
                <span className="text-xs text-zinc-500">Sábado</span>
              </div>

              <div>
                <p className="text-zinc-500 text-sm">
                  Nenhuma atividade cadastrada nessa data.
                </p>
              </div>
            </div>

            <div className="w-full space-y-2.5">
              <div className="flex gap-2 items-baseline">
                <h3 className="text-xl font-semibold text-zinc-300">Dia 18</h3>
                <span className="text-xs text-zinc-500">Domingo</span>
              </div>

              <div className="flex flex-col gap-3">
                <div className="bg-zinc-900 flex gap-3 py-2 px-4 rounded-xl shadow-shape items-center">
                  <CircleCheck className="size-5 text-lime-300" />
                  <p className="text-zinc-100">Corrida de Kart</p>
                  <p className="ml-auto text-zinc-400 text-sm">08:00h</p>
                </div>

                <div className="bg-zinc-900 flex gap-3 py-2 px-4 rounded-xl shadow-shape items-center">
                  <CircleCheck className="size-5 text-lime-300" />
                  <p className="text-zinc-100">Corrida de Kart</p>
                  <p className="ml-auto text-zinc-400 text-sm">08:00h</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <aside className="w-80 space-y-6 flex flex-col">
          <div className="flex w-full flex-col space-y-6">
            <h2 className="text-xl text-zinc-50 font-semibold">
              Links importantes
            </h2>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="space-y-1.5">
                  <p className="text-zinc-100 font-medium">Reserva do AirBnB</p>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-zinc-200 text-xs truncate block"
                  >
                    https://www.airbnb.com.br/rooms/104700011222222222222222222222222
                  </a>
                </div>
                <Link2 className="size-5 text-zinc-400 hover:text-zinc-200 flex-shrink-0" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1.5">
                  <p className="text-zinc-100 font-medium">Reserva do AirBnB</p>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-zinc-200 text-xs truncate block"
                  >
                    https://www.airbnb.com.br/rooms/104700011222222222222222222222222
                  </a>
                </div>
                <Link2 className="size-5 text-zinc-400 hover:text-zinc-200 flex-shrink-0" />
              </div>
            </div>

            <Button onClick={() => {}} colorVariant="secondary">
              <Plus className="size-5 text-zinc-200" />
              Cadastrar novo link
            </Button>
          </div>

          <div className="w-full h-px bg-zinc-800" />

          <div className="flex w-full flex-col space-y-6">
            <h2 className="text-xl text-zinc-50 font-semibold">Convidados</h2>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="space-y-1.5">
                  <p className="text-zinc-100 font-medium">Jessica White</p>
                  <span className="text-zinc-400 hover:text-zinc-200 text-sm truncate block">
                    jessica.white44@yahoo.com
                  </span>
                </div>
                <CircleDashed className="size-5 text-zinc-400 hover:text-zinc-200 flex-shrink-0" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1.5">
                  <p className="text-zinc-100 font-medium">Rodney White</p>
                  <a href="#" className="text-zinc-400 text-sm truncate block">
                    ford_prosacco@hotmail.com
                  </a>
                </div>
                <CircleDashed className="size-5 text-zinc-400 flex-shrink-0" />
              </div>
            </div>

            <Button onClick={() => {}} colorVariant="secondary">
              <UserCog className="size-5 text-zinc-200" />
              Gerenciar convidados
            </Button>
          </div>
        </aside>
      </main>

      {showCreateActivityModal && (
        <CreateActivityModal
          toogleCreateActivityModal={toogleCreateActivityModal}
        />
      )}
    </>
  );
}
