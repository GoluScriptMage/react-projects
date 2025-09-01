import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RootElement from "./components/RootElement";
import EventsPage from "./pages/events/EventsPage";
import AddEventPage from "./pages/events/AddEventPage";
import EditEventPage from "./pages/events/EditEventPage";
import EventDetailsPage from "./pages/events/EventDetailsPage";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootElement />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/events",
          element: <EventsPage />,
        },
        {
          path: "events/:eventId",
          element: <EventDetailsPage />,
        },
        {
          path: "events/new",
          element: <AddEventPage />,
        },
        {
          path: "events/:eventId/edit",
          element: <EditEventPage />,
        },
      ],
    },
  ]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-950 text-gray-100">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
