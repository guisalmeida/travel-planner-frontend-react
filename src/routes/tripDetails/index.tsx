import { useEffect, useState } from "react";
import { CreateActivityModal } from "../../components/createActivityModal";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { Trip } from "../createTrip";
import { DestinationAndDateInput } from "../../components/destinationAndDateInput";
import { GuestsList } from "../../components/guestsList";
import { LinksList } from "../../components/linksList";
import { ActivitiesList } from "../../components/activitiesList";
import { CreateLinkModal } from "../../components/createLinkModal";
import { DateRange } from "react-day-picker";

export function TripDetails() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | undefined>();
  const [showCreateActivityModal, setShowCreateActivityModal] = useState(false);
  const [showCreateLinkModal, setShowCreateLinkModal] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  function toogleCreateActivityModal(value: boolean) {
    setShowCreateActivityModal(value);
  }

  function toogleCreateLinkModal(value: boolean) {
    setShowCreateLinkModal(value);
  }

  useEffect(() => {
    api.get(`/trips/${tripId}`).then((response) => {
      setTrip(response.data.trip);
      const tripRangeDate = {
        from: new Date(response.data.trip?.starts_at as string),
        to: new Date(response.data.trip?.ends_at as string),
      };
      setDateRange(tripRangeDate);
    });
  }, [trip?.ends_at, trip?.starts_at, tripId]);

  return (
    <section className="py-8">
      <Header>
        <DestinationAndDateInput
          destination={trip?.destination}
          handleChange={() => {}}
          isGuestListShow={true}
          toogleGuestListShow={() => {}}
          dateRange={dateRange}
          setDateRange={() => undefined}
        />
      </Header>

      <main className="max-w-6xl px-4 mx-auto flex gap-16">
        <ActivitiesList toogleCreateActivityModal={toogleCreateActivityModal} />

        <aside className="w-80 space-y-6 flex flex-col">
          <LinksList
            links={trip?.links}
            toogleCreateLinkModal={toogleCreateLinkModal}
          />
          <div className="w-full h-px bg-zinc-800" />
          <GuestsList participants={trip?.participants} />
        </aside>
      </main>

      <Footer />

      {showCreateActivityModal && (
        <CreateActivityModal
          toogleCreateActivityModal={toogleCreateActivityModal}
        />
      )}

      {showCreateLinkModal && (
        <CreateLinkModal toogleCreateLinkModal={toogleCreateLinkModal} />
      )}
    </section>
  );
}
