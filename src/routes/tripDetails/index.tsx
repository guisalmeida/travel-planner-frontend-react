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

export function TripDetails() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | undefined>();

  useEffect(() => {
    api.get(`/trips/${tripId}`).then((response) => setTrip(response.data.trip));
  }, [tripId]);

  const [showCreateActivityModal, setShowCreateActivityModal] = useState(false);

  function toogleCreateActivityModal(value: boolean) {
    setShowCreateActivityModal(value);
  }

  return (
    <section className="py-8">
      <Header>
        <DestinationAndDateInput
          destination={trip?.destination}
          handleChange={() => {}}
          isGuestListShow={true}
          toogleGuestListShow={() => {}}
          dateRange={undefined}
          setDateRange={() => undefined}
        />
      </Header>

      <main className="max-w-6xl px-6 mx-auto flex gap-16">
        <ActivitiesList toogleCreateActivityModal={toogleCreateActivityModal} />

        <aside className="w-80 space-y-6 flex flex-col">
          <LinksList links={trip?.links} />
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
    </section>
  );
}
