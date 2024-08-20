import { CircleDashed, UserCog } from "lucide-react";
import { Button } from "../button";

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
};

export function GuestsList({ participants }: GuestListProps) {
  return (
    <div className="flex w-full flex-col space-y-6">
      <h2 className="text-xl text-zinc-50 font-semibold">Convidados</h2>

      <div className="space-y-5">
        {participants &&
          participants.length > 0 &&
          participants.map((participant, index) => (
            <div className="flex items-center justify-between" key={participant.id}>
              <div className="space-y-1.5">
                <p className="text-zinc-100 font-medium">
                  {participant.name
                    ? participant.name
                    : `Convidado ${index + 1}`}
                </p>
                <span className="text-zinc-400 hover:text-zinc-200 text-sm truncate block">
                  {participant.email}
                </span>
              </div>
              <CircleDashed className="size-5 text-zinc-400 hover:text-zinc-200 flex-shrink-0" />
            </div>
          ))}
      </div>

      <Button onClick={() => {}}>
        <UserCog className="size-5 text-sky-950" />
        Gerenciar convidados
      </Button>
    </div>
  );
}
