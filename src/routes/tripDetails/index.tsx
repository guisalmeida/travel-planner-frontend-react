import { useContext, useEffect, useState } from "react";
import { CreateActivityModal } from "../../components/createActivityModal";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { DestinationAndDateInput } from "../../components/destinationAndDateInput";
import { GuestsList } from "../../components/guestsList";
import { LinksList } from "../../components/linksList";
import { ActivitiesList } from "../../components/activitiesList";
import { CreateLinkModal } from "../../components/createLinkModal";

import { TripContext } from "../../contexts/tripContext";

export function TripDetails() {
  const { tripId } = useParams();
  const {
    currentTrip,
    setCurrentTrip,
    setEventStartAndEndRange,
  } = useContext(TripContext);

  const [showCreateActivityModal, setShowCreateActivityModal] = useState(false);
  const [showCreateLinkModal, setShowCreateLinkModal] = useState(false);

  function toogleCreateActivityModal(value: boolean) {
    setShowCreateActivityModal(value);
  }

  function toogleCreateLinkModal(value: boolean) {
    setShowCreateLinkModal(value);
  }

  useEffect(() => {
    api.get(`/trips/${tripId}`).then((response) => {
      setCurrentTrip(response.data.trip);
      const tripRangeDate = {
        from: new Date(response.data.trip?.starts_at as string),
        to: new Date(response.data.trip?.ends_at as string),
      };
      setEventStartAndEndRange(tripRangeDate);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrip.ends_at, currentTrip.starts_at, tripId]);

  return (
    <section className="py-8">
      <Header>
        <DestinationAndDateInput />
      </Header>

      <main className="max-w-6xl px-4 mx-auto flex gap-16">
        <ActivitiesList toogleCreateActivityModal={toogleCreateActivityModal} />

        <aside className="w-80 space-y-6 flex flex-col">
          <LinksList
            links={currentTrip?.links}
            toogleCreateLinkModal={toogleCreateLinkModal}
          />
          <div className="w-full h-px bg-zinc-800" />
          <GuestsList />
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
