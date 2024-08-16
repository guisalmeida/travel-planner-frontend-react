import { ChangeEvent, useState } from "react";
import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../button";
import { Modal } from "../modal";
import { DateRange, DayPicker, getDefaultClassNames } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/style.css";

type DestinationAndDateInputProps = {
  isGuestListShow: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  toogleGuestListShow: () => void;
  dateRange: DateRange | undefined;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
};

export function DestinationAndDateInput({
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
      footer = format(dateRange.from, "d");
    } else if (dateRange?.to) {
      footer = `${format(dateRange?.from, "d ' de 'LLL")} até ${format(
        dateRange?.to,
        "d' de 'LLL"
      )}`;
    }
  }

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

      <button
        onClick={() => toogleDatePicker(true)}
        disabled={isGuestListShow}
        className="flex gap-2 items-center after:block after:w-px after:h-6 after:bg-zinc-400 text-left"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-md text-zinc-400 w-56">
          {dateRange?.from && dateRange?.to
            ? format(new Date(dateRange?.from as Date), "dd/MM/yyyy") + ' - ' +
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
              footer={footer}
              classNames={{
                today: `text-lime-300 font-semibold`,
                chevron: `${defaultClassNames.chevron} fill-lime-300`,
                selected: `${defaultClassNames.selected} bg-zinc-800 text-zinc-400`, // Highlight the selected day
                range_start: `${defaultClassNames.range_start} bg-zinc-900 text-zinc-400`,
                range_end: `${defaultClassNames.range_end} bg-zinc-900 text-zinc-400`,
                day_button: `${defaultClassNames.day_button}`,
                footer: `${defaultClassNames.footer} text-lime-300`,
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
