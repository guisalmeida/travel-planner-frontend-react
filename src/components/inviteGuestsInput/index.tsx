import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Trip } from "../../routes/createTrip";

type InviteGuestsInputProps = {
  trip: Trip;
  toogleGuestModal: (value: boolean) => void;
  toogleConfirmModal: (value: boolean) => void;
};

export function InviteGuestsInput({
  trip,
  toogleGuestModal,
  toogleConfirmModal,
}: InviteGuestsInputProps) {
  return (
    <div className="h-16 bg-zinc-900 w-full max-w-screen-md rounded-xl px-4 shadow-shape flex items-center justify-between gap-5">
      <div className="flex gap-2 items-center flex-1 after:block after:w-px after:h-6 after:bg-zinc-400">
        <UserRoundPlus className="size-5 text-zinc-400" />
        {trip.participants.length > 0 ? (
          <button
            onClick={() => toogleGuestModal(true)}
            className="bg-transparent text-lg placeholder-zinc-400 flex-1 text-zinc-400 text-left"
          >{`${trip.participants.length} pessoa${
            trip.participants.length > 1 ? "s" : ""
          } convidada${trip.participants.length > 1 ? "s" : ""}`}</button>
        ) : (
          <button
            onClick={() => toogleGuestModal(true)}
            className="bg-transparent text-lg placeholder-zinc-400 flex-1 text-zinc-400 text-left"
          >
            Quem estará na viagem?
          </button>
        )}
      </div>

      <button
        onClick={()=>toogleConfirmModal(true)}
        className="bg-lime-400 text-lime-950 py-2 px-5 rounded-lg flex items-center gap-2 hover:bg-lime-500 transition-all shadow-shape"
      >
        Confirmar viagem
        <ArrowRight className="size-5" />
      </button>
    </div>
  );
}
