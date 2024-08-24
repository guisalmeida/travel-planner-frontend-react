import { FormEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail } from "lucide-react";
import { format } from "date-fns";
import { Button } from "../button";
import { Modal } from "../modal";
import { TripContext } from "../../contexts/tripContext";
import { api } from "../../lib/axios";

export function ConfirmTripModal() {
  const navegate = useNavigate();
  const {
    currentTrip,
    handleChange,
    toogleConfirmModal,
    eventStartAndEndRange,
  } = useContext(TripContext);

  async function confirmTrip(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!eventStartAndEndRange?.from || !eventStartAndEndRange?.to) {
      return;
    }

    const response = await api.post("/trips", {
      destination: currentTrip.destination,
      starts_at: format(eventStartAndEndRange.from, "yyyy-MM-dd HH:mm:ss"),
      ends_at: format(eventStartAndEndRange.to, "yyyy-MM-dd HH:mm:ss"),
      emails_to_invite: currentTrip.participantsEmailList,
      owner_name: currentTrip.ownerName,
      owner_email: currentTrip.ownerEmail,
    });

    const { tripId } = response.data;
    navegate(`/trips/${tripId}`);
  }

  return (
    <Modal toogleFn={toogleConfirmModal}>
      <div className="shadow-shape bg-zinc-900 py-5 px-6 rounded-xl space-y-5 w-[640px] relative">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Confirmar criação da viagem</h3>
          <p className="text-zinc-400 text-sm">{`Para concluir a criação da viagem para ${
            currentTrip.destination
          } de ${format(
            eventStartAndEndRange?.from as Date,
            "dd/MM/yyyy"
          )} até ${format(
            eventStartAndEndRange?.to as Date,
            "dd/MM/yyyy"
          )} preencha seus dados abaixo:`}</p>
        </div>

        <form
          className="flex justify-between flex-col gap-2"
          onSubmit={confirmTrip}
        >
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg flex items-center py-2.5 px-4 gap-2 w-full">
            <User className="size-5 text-zinc-400" />
            <input
              type="text"
              name="ownerName"
              onChange={handleChange}
              className="bg-transparent text-lg placeholder-zinc-400 flex-1 text-zinc-400"
              placeholder="Digite seu nome completo"
            />
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-lg flex items-center py-2.5 px-4 gap-2 w-full">
            <Mail className="size-5 text-zinc-400" />
            <input
              type="email"
              name="ownerEmail"
              onChange={handleChange}
              className="bg-transparent text-lg placeholder-zinc-400 flex-1 text-zinc-400"
              placeholder="Digite seu e-mail pessoal"
            />
          </div>
          <div className="w-full h-px bg-zinc-800" />

          <Button>Confirmar criação da viagem</Button>
        </form>
      </div>
    </Modal>
  );
}
