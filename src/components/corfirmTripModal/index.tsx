import { X, User, Mail } from "lucide-react";
import { FormEvent } from "react";
import { Trip } from "../../routes/createTrip";

type ConfirmTripModalProps = {
  trip: Trip;
  toogleConfirmModal: (value: boolean) => void;
  confirmTrip: (e: FormEvent<HTMLFormElement>) => void;
};

export function ConfirmTripModal({
  trip,
  confirmTrip,
  toogleConfirmModal,
}: ConfirmTripModalProps) {
  return (
    <div className="bg-black/50 fixed inset-0 backdrop-blur-sm flex items-center justify-center">
      <div className="shadow-shape bg-zinc-900 py-5 px-6 rounded-xl space-y-5 w-[640px] relative">
        <div className="space-y-2">
          <button
            onClick={() => toogleConfirmModal(false)}
            className="absolute right-6 top-5"
          >
            <X className="text-zinc-300 size-4 " />
          </button>
          <h3 className="text-lg font-semibold">Confirmar criação da viagem</h3>
          <p className="text-zinc-400 text-sm">{`Para concluir a criação da viagem para ${trip.destination} nas datas de ${trip.date} preencha seus dados abaixo:`}</p>
        </div>

        <form
          className="flex justify-between flex-col gap-2"
          onSubmit={confirmTrip}
        >
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg flex items-center py-2.5 px-4 gap-2 w-full">
            <User className="size-5 text-zinc-400" />
            <input
              type="text"
              name="text"
              className="bg-transparent text-lg placeholder-zinc-400 flex-1 text-zinc-400"
              placeholder="Digite seu nome completo"
            />
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-lg flex items-center py-2.5 px-4 gap-2 w-full">
            <Mail className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              className="bg-transparent text-lg placeholder-zinc-400 flex-1 text-zinc-400"
              placeholder="Digite seu e-mail pessoal"
            />
          </div>
          <div className="w-full h-px bg-zinc-800" />
          <button className="bg-lime-400 text-lime-950 py-2 px-5 rounded-lg flex items-center justify-center gap-2 hover:bg-lime-500 transition-all shadow-shape">
            Confirmar criação da viagem
          </button>
        </form>
      </div>
    </div>
  );
}
