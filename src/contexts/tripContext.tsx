import {
  ChangeEvent,
  createContext,
  FormEvent,
  ReactNode,
  useState,
} from "react";
import { DateRange } from "react-day-picker";

export type Participant = {
  id: string;
  name?: string;
  email: string;
  is_confirmed: boolean;
  is_owner: boolean;
  trip_id: string;
};

export type Link = {
  id: string;
  title: string;
  url: string;
  trip_id: string;
};

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

type TripContextType = {
  currentTrip: Trip;
  eventStartAndEndRange: DateRange | undefined;
  setCurrentTrip: React.Dispatch<React.SetStateAction<Trip>>;
  setEventStartAndEndRange: React.Dispatch<
    React.SetStateAction<DateRange | undefined>
  >;
  isGuestListShow: boolean;
  isGuestModalOpen: boolean;
  isConfirmModalOpen: boolean;
  setIsGuestListShow: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGuestModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsConfirmModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toogleGuestListShow: () => void;
  toogleGuestModal: (value: boolean) => void;
  toogleConfirmModal: (value: boolean) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  addToGuestList: (e: FormEvent<HTMLFormElement>) => void;
  removeFromGuestList: (email: string) => void;
};

export const TripContext = createContext<TripContextType>({
  currentTrip: {
    participantsEmailList: [],
    eventStartAndEndRange: undefined,
    destination: "",
    ownerName: "",
    ownerEmail: "",
  },
  eventStartAndEndRange: undefined,
  setCurrentTrip: () => null,
  setEventStartAndEndRange: () => null,
  isGuestListShow: false,
  isGuestModalOpen: false,
  isConfirmModalOpen: false,
  setIsGuestListShow: () => null,
  setIsGuestModalOpen: () => null,
  setIsConfirmModalOpen: () => null,
  toogleGuestListShow: () => null,
  toogleGuestModal: () => null,
  toogleConfirmModal: () => null,
  handleChange: () => null,
  addToGuestList: () => null,
  removeFromGuestList: () => null,
});

type TripProviderProps = {
  children: ReactNode;
};

export const TripProvider = ({ children }: TripProviderProps) => {
  const [isGuestListShow, setIsGuestListShow] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [eventStartAndEndRange, setEventStartAndEndRange] = useState<
    DateRange | undefined
  >(undefined);

  const [currentTrip, setCurrentTrip] = useState<Trip>({
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

    setCurrentTrip((prevTrip) => {
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

    if (!email || currentTrip?.participantsEmailList?.includes(email)) {
      return;
    }

    setCurrentTrip((prevTrip) => ({
      ...prevTrip,
      participantsEmailList: [...prevTrip.participantsEmailList, email],
    }));
    e?.currentTarget.reset();
  }

  function removeFromGuestList(email: string) {
    const updatedList = currentTrip?.participantsEmailList.filter(
      (guestEmail) => guestEmail !== email
    );
    setCurrentTrip((prevTrip) => ({
      ...prevTrip,
      participantsEmailList: updatedList,
    }));
  }

  const value = {
    currentTrip,
    isGuestListShow,
    isGuestModalOpen,
    isConfirmModalOpen,
    eventStartAndEndRange,
    setCurrentTrip,
    setEventStartAndEndRange,
    setIsGuestListShow,
    setIsGuestModalOpen,
    setIsConfirmModalOpen,
    toogleGuestListShow,
    toogleGuestModal,
    toogleConfirmModal,
    handleChange,
    addToGuestList,
    removeFromGuestList,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};
