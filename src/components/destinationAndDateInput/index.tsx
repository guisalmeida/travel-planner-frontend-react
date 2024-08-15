import { ChangeEvent } from "react";
import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../button";

type DestinationAndDateInputProps = {
  isGuestListShow: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  toogleGuestListShow: () => void;
};

export function DestinationAndDateInput({
  isGuestListShow,
  handleChange,
  toogleGuestListShow,
}: DestinationAndDateInputProps) {
  return (
    <div className="h-16 bg-zinc-900 w-full rounded-xl px-4 shadow-shape flex items-center justify-between gap-5">
      <div className="flex gap-2 items-center flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          type="text"
          name="destination"
          className="bg-transparent text-lg text-zinc-400 placeholder-zinc-400 flex-1"
          placeholder="Para onde você vai?"
          onChange={handleChange}
          disabled={isGuestListShow}
        />
      </div>

      <div className="flex gap-2 items-center after:block after:w-px after:h-6 after:bg-zinc-400 relative">
        <input
          type="date"
          name="date"
          onChange={handleChange}
          disabled={isGuestListShow}
          className="bg-transparent text-lg placeholder-zinc-400 w-40 text-zinc-400"
          placeholder="Quando?"
        />
        <Calendar className="size-5 text-zinc-400 absolute right-3" />
      </div>

      {isGuestListShow ? (
        <Button onClick={toogleGuestListShow} colorVariant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button onClick={toogleGuestListShow}>
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  );
}
