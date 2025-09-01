import React from "react";
import Button from "../components/ui/Button";
import eventsData from "../data/events";
import { useNavigate } from "react-router-dom";
import EventDetailsPage from "./Events/EventDetailsPage";

const HomePage = () => {
  const navigate = useNavigate();

  const handleExploreClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <section className="w-full bg-gray-950 text-gray-200 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Welcome Back
        </h1>
        <p className="mt-4 max-w-2xl text-gray-400">
          This landing area can showcase a quick summary, announcements, or
          highlight content. Replace this placeholder text with real copy later.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {eventsData.map((event) => (
            <div
              key={event.id}
              className="rounded-lg border border-gray-800 bg-gray-900 p-5 shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {event.title}
              </h3>
              <p className="text-sm text-gray-400">{event.description}</p>
              <Button name="Explore" fn={() => handleExploreClick(event.id)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
