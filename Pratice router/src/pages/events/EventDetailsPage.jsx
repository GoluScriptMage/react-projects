import React from "react";
import eventsData from "../../data/events";
import { useParams, Link, useNavigate } from "react-router-dom";

const EventDetailsPage = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const event = eventsData.find((e) => e.id === eventId);

  const handleEdit = () => {
    navigate(`/events/${eventId}/edit`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const eventIndex = eventsData.findIndex((e) => e.id === eventId);
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
        
        navigate('/events');
      }
    }
  };

  const {
    title,
    description,
    date,
    endDate,
    location,
    category,
    status,
    organizer,
    capacity,
    attendeesCount,
    price,
    currency,
    image,
    tags = [],
    agenda = [],
  } = event;

  return (
    <section className="w-full bg-gray-950 text-gray-200 py-12 min-h-[60vh]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 min-w-0">
            {image && (
              <div className="mb-8 overflow-hidden rounded-lg border border-gray-800 bg-gray-900">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-64 object-cover object-center"
                  loading="lazy"
                />
              </div>
            )}
            <h1 className="text-3xl font-bold text-white tracking-tight">
              {title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-3 text-xs">
              <span className="inline-flex items-center rounded bg-gray-800 px-2.5 py-1 font-medium text-gray-300 uppercase tracking-wide">
                {category}
              </span>
              <span className="inline-flex items-center rounded bg-gray-800 px-2.5 py-1 font-medium text-gray-300">
                {location}
              </span>
              <span className="inline-flex items-center rounded bg-gray-800 px-2.5 py-1 font-medium text-gray-300">
                {status}
              </span>
            </div>
            <p className="mt-6 text-gray-400 leading-relaxed max-w-2xl">
              {description}
            </p>

            {tags.length > 0 && (
              <div className="mt-8">
                <h2 className="text-sm font-semibold text-white mb-3 tracking-wide uppercase">
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-indigo-600/10 text-indigo-300 border border-indigo-600/30 px-3 py-1 text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {agenda.length > 0 && (
              <div className="mt-10">
                <h2 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">
                  Agenda
                </h2>
                <ul className="space-y-3">
                  {agenda.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-4 rounded border border-gray-800 bg-gray-900/60 p-3"
                    >
                      <span className="text-indigo-400 font-mono text-xs w-16 shrink-0">
                        {item.time}
                      </span>
                      <span className="text-sm text-gray-300 leading-snug">
                        {item.topic}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="w-full lg:w-80 shrink-0 space-y-6">
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-5">
              <h2 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">
                Details
              </h2>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><span className="text-gray-500">Start:</span> {date}</li>
                <li><span className="text-gray-500">End:</span> {endDate}</li>
                <li><span className="text-gray-500">Organizer:</span> {organizer}</li>
                <li><span className="text-gray-500">Capacity:</span> {attendeesCount}/{capacity}</li>
                <li><span className="text-gray-500">Price:</span> {price === 0 ? 'Free' : `${price} ${currency}`}</li>
                <li><span className="text-gray-500">ID:</span> {event.id}</li>
              </ul>
              <div className="mt-6 flex gap-2">
                <button 
                  className="flex-1 rounded bg-indigo-600 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-500"
                  onClick={handleEdit}
                >
                  Edit
                </button>
                <button 
                  className="flex-1 rounded bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-500"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
            <Link
              to="/events"
              className="block text-center rounded border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Back to Events
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default EventDetailsPage;
