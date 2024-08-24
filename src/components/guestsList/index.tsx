import { useContext, useState } from "react";
import { CircleCheck, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../button";
import { InviteGuestsModal } from "../inviteGuestsModal";
import { TripContext } from "../../contexts/tripContext";

export function GuestsList() {
  const { currentTrip } = useContext(TripContext);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

  function toogleGuestModal(value: boolean) {
    setIsGuestModalOpen(value);
  }

  return (
    <div className="flex w-full flex-col space-y-6">
      <h2 className="text-xl text-zinc-50 font-semibold">Convidados</h2>

      <div className="space-y-5">
        {currentTrip.participants &&
          currentTrip.participants.length > 0 &&
          currentTrip.participants.map((participant, index) => (
            <div
              className="flex items-center justify-between hover:bg-zinc-900 rounded py-1 px-2"
              key={participant.id}
            >
              <div className="space-y-1.5">
                <p className="text-zinc-100 font-medium">
                  {participant.name
                    ? participant.name
                    : `Convidado ${index + 1}`}
                </p>
                <span className="text-zinc-400  text-sm truncate block">
                  {participant.email}
                </span>
              </div>
              {participant.is_confirmed ? (
                <CircleCheck className="size-5 text-sky-400 flex-shrink-0" />
              ) : (
                <CircleDashed className="size-5 text-zinc-400 flex-shrink-0" />
              )}
            </div>
          ))}
      </div>

      <Button onClick={() => toogleGuestModal(true)}>
        <UserCog className="size-5 text-sky-950" />
        Gerenciar convidados
      </Button>

      {isGuestModalOpen && <InviteGuestsModal />}
    </div>
  );
}
