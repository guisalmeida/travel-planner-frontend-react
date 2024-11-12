import { useContext, useState } from "react";
import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../button";
import { Modal } from "../modal";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import "react-day-picker/style.css";

import { TripContext } from "../../contexts/tripContext";

export function DestinationAndDateInput() {
  const {
    currentTrip,
    isGuestListShow,
    handleChange,
    toogleGuestListShow,
    eventStartAndEndRange,
    setEventStartAndEndRange,
  } = useContext(TripContext);

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const defaultClassNames = getDefaultClassNames();

  function toogleDatePicker(value: boolean) {
    setIsDatePickerOpen(value);
  }

  let footer = `Please pick the first day.`;
  if (eventStartAndEndRange?.from) {
    if (!eventStartAndEndRange?.to) {
      footer = format(eventStartAndEndRange.from, "d", {
        locale: ptBR,
      });
    } else if (eventStartAndEndRange?.to) {
      footer = `${format(
        eventStartAndEndRange?.from,
        "d ' de 'LLLL",
        {
          locale: ptBR,
        }
      )} até ${format(eventStartAndEndRange?.to, "d' de 'LLLL", {
        locale: ptBR,
      })}`;
    }
  }

  return (
    <div className="h-16 bg-zinc-900 w-full rounded-xl px-4 shadow-shape flex items-center justify-between gap-5">
      <div className="flex gap-2 items-center flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          type="text"
          name="destination"
          value={currentTrip.destination}
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
          {eventStartAndEndRange?.from &&
          eventStartAndEndRange?.to
            ? format(
                new Date(eventStartAndEndRange?.from as Date),
                "dd/MM/yyyy"
              ) +
              " - " +
              format(
                new Date(eventStartAndEndRange?.to as Date),
                "dd/MM/yyyy"
              )
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
              selected={eventStartAndEndRange}
              onSelect={setEventStartAndEndRange}
              disabled={{ before: new Date() }}
              excludeDisabled={true}
              footer={footer}
              classNames={{
                today: `text-blue-300 font-semibold`,
                chevron: `${defaultClassNames.chevron} fill-blue-300`,
                selected: `${defaultClassNames.selected} bg-zinc-800 text-zinc-400`,
                range_start: `${defaultClassNames.range_start} bg-zinc-900`,
                range_end: `${defaultClassNames.range_end} bg-zinc-900`,
                day_button: `${defaultClassNames.day_button} hover:bg-blue-300 hover:text-zinc-800 border-blue-600 text-zinc-900`,
                footer: `${defaultClassNames.footer} text-blue-300`,
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
