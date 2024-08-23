import { ChangeEvent, useState } from "react";
import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../button";
import { Modal } from "../modal";
import { DateRange, DayPicker, getDefaultClassNames } from "react-day-picker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import "react-day-picker/style.css";

type DestinationAndDateInputProps = {
  destination?: string;
  isGuestListShow: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  toogleGuestListShow: () => void;
  dateRange?: DateRange;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
};

export function DestinationAndDateInput({
  destination,
  dateRange,
  setDateRange,
  isGuestListShow,
  handleChange,
  toogleGuestListShow,
}: DestinationAndDateInputProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const defaultClassNames = getDefaultClassNames();

  function toogleDatePicker(value: boolean) {
    setIsDatePickerOpen(value);
  }

  let footer = `Please pick the first day.`;
  if (dateRange?.from) {
    if (!dateRange?.to) {
      footer = format(dateRange.from, "d", { locale: ptBR });
    } else if (dateRange?.to) {
      footer = `${format(dateRange?.from, "d ' de 'LLLL", { locale: ptBR })} até ${format(dateRange?.to,"d' de 'LLLL",{ locale: ptBR })}`;
    }
  }

  return (
    <div className="h-16 bg-zinc-900 w-full rounded-xl px-4 shadow-shape flex items-center justify-between gap-5">
      <div className="flex gap-2 items-center flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          type="text"
          name="destination"
          value={destination}
          className="bg-transparent text-lg text-zinc-400 placeholder-zinc-400 flex-1"
          placeholder="Para onde você vai?"
          onChange={handleChange}
          disabled={isGuestListShow}
        />
      </div>

      <button
        onClick={() => toogleDatePicker(true)}
        disabled={isGuestListShow}
        className="flex gap-2 items-center after:block after:w-px after:h-6 after:bg-zinc-400 text-left"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-md text-zinc-400 w-56">
          {dateRange?.from && dateRange?.to
            ? format(new Date(dateRange?.from as Date), "dd/MM/yyyy") +
              " - " +
              format(new Date(dateRange?.to as Date), "dd/MM/yyyy")
            : "Quando?"}
        </span>
      </button>

      {isDatePickerOpen && (
        <Modal toogleFn={toogleDatePicker}>
          <div className="shadow-shape bg-zinc-900 py-5 px-6 rounded-xl space-y-5">
            <h3 className="text-lg font-semibold">Selecione as datas:</h3>
            <DayPicker
              mode="range"
              min={2}
              selected={dateRange}
              onSelect={setDateRange}
              disabled={{ before: new Date() }}
              excludeDisabled={true}
              footer={footer}
              classNames={{
                today: `text-sky-300 font-semibold`,
                chevron: `${defaultClassNames.chevron} fill-sky-300`,
                selected: `${defaultClassNames.selected} bg-zinc-800 text-zinc-400`,
                range_start: `${defaultClassNames.range_start} bg-zinc-900`,
                range_end: `${defaultClassNames.range_end} bg-zinc-900`,
                day_button: `${defaultClassNames.day_button} hover:bg-sky-300 hover:text-zinc-800 border-sky-600 text-zinc-900`,
                footer: `${defaultClassNames.footer} text-sky-300`,
              }}
              required
            />
          </div>
        </Modal>
      )}

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
