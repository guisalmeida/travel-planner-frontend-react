import { CircleCheck, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../button";
import { FormEvent, useState } from "react";
import { InviteGuestsModal } from "../inviteGuestsModal";

export type Participant = {
  id: string;
  name?: string;
  email: string;
  is_confirmed: boolean;
  is_owner: boolean;
  trip_id: string;
};

type GuestListProps = {
  participants?: Participant[];
  participantsEmailList: string[];
  addToGuestList: (e: FormEvent<HTMLFormElement>) => void;
  removeFromGuestList: (email: string) => void;
};

export function GuestsList({
  participants,
  participantsEmailList,
  addToGuestList,
  removeFromGuestList,
}: GuestListProps) {
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

  function toogleGuestModal(value: boolean) {
    setIsGuestModalOpen(value);
  }

  return (
    <div className="flex w-full flex-col space-y-6">
      <h2 className="text-xl text-zinc-50 font-semibold">Convidados</h2>

      <div className="space-y-5">
        {participants &&
          participants.length > 0 &&
          participants.map((participant, index) => (
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

      {isGuestModalOpen && (
        <InviteGuestsModal
          participantsEmailList={participantsEmailList}
          addToGuestList={addToGuestList}
          removeFromGuestList={removeFromGuestList}
          toogleGuestModal={toogleGuestModal}
        />
      )}
    </div>
  );
}
