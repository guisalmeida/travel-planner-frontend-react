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
import { Footer } from "../../components/footer";
import { Participant } from "../../components/guestsList";
import { Link } from "../../components/linksList";

export type Trip = {
  id?: string;
  participants?: Participant[];
  participantsEmailList: string[];
  eventStartAndEndRange: DateRange | undefined;
  destination: string;
  ownerName: string;
  ownerEmail: string;
  starts_at?: string;
  ends_at?: string;
  isConfirmed?: boolean;
  links?: Link[];
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
    participantsEmailList: [],
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

    if (!email || trip.participantsEmailList?.includes(email)) {
      return;
    }

    setTrip((prevTrip) => ({
      ...prevTrip,
      participantsEmailList: [...prevTrip.participantsEmailList, email],
    }));
    e?.currentTarget.reset();
  }

  function removeFromGuestList(email: string) {
    const updatedList = trip.participantsEmailList.filter(
      (guestEmail) => guestEmail !== email
    );
    setTrip((prevTrip) => ({
      ...prevTrip,
      participantsEmailList: updatedList,
    }));
  }

  async function confirmTrip(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!trip.eventStartAndEndRange?.from || !trip.eventStartAndEndRange?.to) {
      return;
    }

    const response = await api.post("/trips", {
      destination: trip.destination,
      starts_at: format(trip.eventStartAndEndRange.from, "yyyy-MM-dd HH:mm:ss"),
      ends_at: format(trip.eventStartAndEndRange.to, "yyyy-MM-dd HH:mm:ss"),
      emails_to_invite: trip.participantsEmailList,
      owner_name: trip.ownerName,
      owner_email: trip.ownerEmail,
    });

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

  return (
    <section className="h-screen w-full flex flex-col align items-center justify-center">
      <Header>
        <DestinationAndDateInput
          destination={trip.destination}
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
      </Header>

      <main className="flex flex-col gap-4 my-10 max-w-screen-md">
        {isGuestModalOpen && (
          <InviteGuestsModal
            participantsEmailList={trip.participantsEmailList}
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

      <Footer />
    </section>
  );
}
