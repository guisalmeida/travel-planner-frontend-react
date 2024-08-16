import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "../../components/inviteGuestsModal";
import { ConfirmTripModal } from "../../components/corfirmTripModal";
import { DestinationAndDateInput } from "../../components/destinationAndDateInput";
import { InviteGuestsInput } from "../../components/inviteGuestsInput";
import { type DateRange } from "react-day-picker";
import { Header } from "../../components/header";
import { api } from "../../lib/axios";
import { format } from "date-fns";

export type Trip = {
  participants: string[];
  eventStartAndEndRange: DateRange | undefined;
  destination: string;
  ownerName: string;
  ownerEmail: string;
};

export function CreateTrip() {
  const navegate = useNavigate();

  const [eventStartAndEndRange, setEventStartAndEndRange] = useState<
    DateRange | undefined
  >(undefined);
  const [isGuestListShow, setIsGuestListShow] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [trip, setTrip] = useState<Trip>({
    participants: [],
    eventStartAndEndRange: eventStartAndEndRange,
    destination: "",
    ownerName: "",
    ownerEmail: "",
  });

  function toogleGuestListShow() {
    setIsGuestListShow((prev) => !prev);
  }

  function toogleGuestModal(value: boolean) {
    setIsGuestModalOpen(value);
  }

  function toogleConfirmModal(value: boolean) {
    setIsConfirmModalOpen(value);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setTrip((prevTrip) => {
      return {
        ...prevTrip,
        [name]: value,
      };
    });
  }

  function addToGuestList(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email")?.toString();

    if (!email || trip.participants?.includes(email)) {
      return;
    }

    setTrip((prevTrip) => ({
      ...prevTrip,
      participants: [...prevTrip.participants, email],
    }));
    e?.currentTarget.reset();
  }

  function removeFromGuestList(email: string) {
    const updatedList = trip.participants.filter(
      (guestEmail) => guestEmail !== email
    );
    setTrip((prevTrip) => ({ ...prevTrip, participants: updatedList }));
  }

  async function confirmTrip(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(trip);

    if (!trip.eventStartAndEndRange?.from || !trip.eventStartAndEndRange?.to) {
      return;
    }

    const response = await api.post("/trips", {
      destination: trip.destination,
      starts_at: format(trip.eventStartAndEndRange.from, "yyyy-MM-dd HH:mm:ss"),
      ends_at: format(trip.eventStartAndEndRange.to, "yyyy-MM-dd HH:mm:ss"),
      emails_to_invite: trip.participants,
      owner_name: trip.ownerName,
      owner_email: trip.ownerEmail,
    })

    const { tripId } = response.data;

    navegate(`/trips/${tripId}`);
  }

  useEffect(() => {
    setTrip((prevTrip) => {
      return {
        ...prevTrip,
        eventStartAndEndRange: eventStartAndEndRange,
      };
    });
  }, [eventStartAndEndRange]);

  console.log(trip);

  return (
    <section className="h-screen w-full flex flex-col align items-center justify-center">
      <Header />

      <main className="flex flex-col gap-4 my-10 max-w-screen-md">
        <DestinationAndDateInput
          handleChange={handleChange}
          toogleGuestListShow={toogleGuestListShow}
          isGuestListShow={isGuestListShow}
          dateRange={eventStartAndEndRange}
          setDateRange={setEventStartAndEndRange}
        />

        {isGuestListShow && (
          <InviteGuestsInput
            toogleConfirmModal={toogleConfirmModal}
            toogleGuestModal={toogleGuestModal}
            trip={trip}
          />
        )}

        {isGuestModalOpen && (
          <InviteGuestsModal
            trip={trip}
            addToGuestList={addToGuestList}
            removeFromGuestList={removeFromGuestList}
            toogleGuestModal={toogleGuestModal}
          />
        )}

        {isConfirmModalOpen && (
          <ConfirmTripModal
            confirmTrip={confirmTrip}
            toogleConfirmModal={toogleConfirmModal}
            trip={trip}
            handleChange={handleChange}
          />
        )}
      </main>

      <footer>
        <small className="text-zinc-500 text-center w-full max-w-screen-md text-sm">
          Ao planejar sua viagem pela plann.er você automaticamente concorda
          <br />
          com nossos{" "}
          <a href="#" className="text-zinc-300 underline">
            termos de uso
          </a>{" "}
          e{" "}
          <a href="#" className="text-zinc-300 underline">
            políticas de privacidade
          </a>
          .
        </small>
      </footer>
    </section>
  );
}
