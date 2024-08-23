import { ArrowRight, AtSign, X } from "lucide-react";
import { Trip } from "../../routes/createTrip";
import { FormEvent, useState } from "react";
import { Button } from "../button";
import { Modal } from "../modal";

type InviteGuestsModalProps = {
  trip: Trip;
  addToGuestList: (e: FormEvent<HTMLFormElement>) => void;
  toogleGuestModal: (value: boolean) => void;
  removeFromGuestList: (email: string) => void;
};

export function InviteGuestsModal({
  addToGuestList,
  toogleGuestModal,
  removeFromGuestList,
  trip,
}: InviteGuestsModalProps) {
  const [guestEmail, setGuestEmail] = useState("");

  function handleGuestList(e: FormEvent<HTMLFormElement>) {
    addToGuestList(e);
    setGuestEmail("");
  }

  return (
    <Modal toogleFn={toogleGuestModal}>
      <div className="shadow-shape bg-zinc-900 py-5 px-6 rounded-xl space-y-5 w-[640px] relative">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Selecionar convidados</h3>
          <p className="text-zinc-400 text-sm">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {trip.participantsEmailList &&
            trip.participantsEmailList.map((email, index) => (
              <div
                key={index}
                className="bg-zinc-800 px-2.5 py-1.5 rounded-md flex justify-between gap-2 items-center relative"
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

        <form className="flex justify-between" onSubmit={handleGuestList}>
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg flex items-center py-2.5 px-4 gap-2 w-full">
            <AtSign className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              className="bg-transparent text-lg placeholder-zinc-400 flex-1 text-zinc-400"
              placeholder="Digite o e-mail do convidado"
              onChange={(e) => setGuestEmail(e.target.value)}
              required
            />
            <Button disabled={Boolean(!guestEmail)}>
              Convidar
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
