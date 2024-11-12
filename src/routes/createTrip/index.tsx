import { useContext } from "react";
import { InviteGuestsModal } from "../../components/inviteGuestsModal";
import { ConfirmTripModal } from "../../components/corfirmTripModal";
import { DestinationAndDateInput } from "../../components/destinationAndDateInput";
import { InviteGuestsInput } from "../../components/inviteGuestsInput";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { TripContext } from "../../contexts/tripContext";

export function CreateTrip() {
  const {isGuestListShow, isGuestModalOpen, isConfirmModalOpen} = useContext(TripContext);

  return (
    <section className="h-screen w-full flex flex-col align items-center justify-center">
      <Header>
        <DestinationAndDateInput />

        {isGuestListShow && (
          <InviteGuestsInput />
        )}
      </Header>

      <main className="flex flex-col gap-4 my-10 max-w-screen-md">
        {isGuestModalOpen && (
          <InviteGuestsModal />
        )}

        {isConfirmModalOpen && (
          <ConfirmTripModal />
        )}
      </main>

      <Footer />
    </section>
  );
}
