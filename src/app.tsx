import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateTrip } from "./routes/createTrip";
import { TripDetails } from "./routes/tripDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTrip />,
  },
  {
    path: "/trips/:tripId",
    element: <TripDetails />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
