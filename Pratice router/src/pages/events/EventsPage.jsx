import React from "react";
import eventsData from "../../data/events";
import { useNavigate } from "react-router-dom";

const EventsPage = () => {
  const navigate = useNavigate();

  const handleExploreClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const handleEditClick = (eventId, e) => {
    e.stopPropagation(); // Prevent event bubbling
    navigate(`/events/${eventId}/edit`);
  };

  const handleDeleteClick = (eventId, e) => {
    e.stopPropagation(); // Prevent event bubbling
    
    // Confirm before deletion
    if (window.confirm("Are you sure you want to delete this event?")) {
      // Find the index of the event in the eventsData array
      const eventIndex = eventsData.findIndex((event) => event.id === eventId);
      
      // Remove the event if found
      if (eventIndex !== -1) {
        eventsData.splice(eventIndex, 1);
        
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-down';
        toast.style.animation = 'fadeIn 0.3s, fadeOut 0.3s 4.7s';
        toast.innerHTML = `
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            <span>Event deleted successfully!</span>
          </div>
        `;
        
        document.body.appendChild(toast);
        
        // Remove toast after 5 seconds
        setTimeout(() => {
          toast.remove();
        }, 5000);
        
        // Force a re-render by updating state
        navigate('/events');
      }
    }
  };

  const handleNewEventClick = () => {
    navigate('/events/new');
  };

  return (
    <section className="w-full bg-gray-950 text-gray-200 py-12 min-h-[60vh]">
      <div className="max-w-6xl mx-auto px-6">
        <header className="mb-8 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Events
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              Browse upcoming and recent events. Replace with real data later.
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              className="rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
              onClick={handleNewEventClick}
            >
              New Event
            </button>
            <button className="rounded bg-gray-800 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-700">
              Filters
            </button>
          </div>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {eventsData.map((event) => (
            <div
              key={event.id}
              className="group rounded-lg border border-gray-800 bg-gray-900 p-5 flex flex-col relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-3 mb-1">
                <h3 className="text-lg font-semibold text-white leading-tight pr-2">
                  {event.title}
                </h3>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    type="button"
                    title="Edit event"
                    className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 border border-gray-700"
                    onClick={(e) => handleEditClick(event.id, e)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z" />
                    </svg>
                    <span className="sr-only">Edit</span>
                  </button>
                  <button
                    type="button"
                    title="Delete event"
                    className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-red-600/10 text-red-400 hover:text-white hover:bg-red-600/80 border border-red-600/40"
                    onClick={(e) => handleDeleteClick(event.id, e)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M3 6h18" />
                      <path d="M8 6v-.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V6" />
                      <path d="M19 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                      <path d="M10 11v6" />
                      <path d="M14 11v6" />
                    </svg>
                    <span className="sr-only">Delete</span>
                  </button>
                </div>
              </div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                {event.category} • {event.location}
              </p>
              <p className="mt-3 text-sm text-gray-400 line-clamp-3">
                {event.description}
              </p>
              <div className="mt-auto pt-4 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <button
                  className="text-indigo-400 text-sm hover:underline"
                  onClick={() => handleExploreClick(event.id)}
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsPage;
