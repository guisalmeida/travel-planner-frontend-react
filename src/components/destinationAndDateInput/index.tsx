import { ChangeEvent } from "react";
import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";

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
    <div className="h-16 bg-zinc-900 w-full max-w-screen-md rounded-xl px-4 shadow-shape flex items-center justify-between gap-5">
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
  );
}
