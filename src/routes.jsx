import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import DetailPerson from "./pages/DetailPerson";
import DetailVehicle from "./pages/DetailVehicle";
import DetailPlanet from "./pages/DetailPlanet";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/person/:id", element: <DetailPerson /> },
      { path: "/vehicle/:id", element: <DetailVehicle /> },
      { path: "/planet/:id", element: <DetailPlanet /> },
    ],
  },
]);