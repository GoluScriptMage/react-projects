import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import eventsData from "../../data/events";

const EditEventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  const event = eventsData.find((event) => event.id === eventId);
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
    organizer: "",
  });
  
  useEffect(() => {
    if (event) {
      setForm({
        title: event.title || "",
        description: event.description || "",
        date: event.date || "",
        location: event.location || "",
        category: event.category || "",
        organizer: event.organizer || "",
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedEvent = {
      ...event,
      ...form
    };

    const eventIndex = eventsData.findIndex((e) => e.id === eventId);
    if (eventIndex !== -1) {
      eventsData[eventIndex] = updatedEvent;
      
      // Create toast notification
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-down';
      toast.style.animation = 'fadeIn 0.3s, fadeOut 0.3s 4.7s';
      toast.innerHTML = `
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <span>Event updated successfully!</span>
        </div>
      `;
      
      document.body.appendChild(toast);
      
      // Remove toast after 5 seconds
      setTimeout(() => {
        toast.remove();
      }, 5000);
      
      navigate(`/events/${eventId}`);
    } else {
      // Create error toast notification
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-down';
      toast.style.animation = 'fadeIn 0.3s, fadeOut 0.3s 4.7s';
      toast.innerHTML = `
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <span>Event not found!</span>
        </div>
      `;
      
      document.body.appendChild(toast);
      
      // Remove toast after 5 seconds
      setTimeout(() => {
        toast.remove();
      }, 5000);
    }
  };
  
  const handleCancel = () => {
    navigate(`/events/${eventId}`);
  };

  return (
    <section className="w-full bg-gray-950 text-gray-200 py-12 min-h-[50vh]">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Edit Event
        </h1>
        <p className="text-gray-400 mt-3 mb-8 max-w-prose text-sm">
          Modify existing event details.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-5">
            <label
              htmlFor="title"
              className="text-lg font-semibold text-white mb-2 block"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              className="mt-2 w-full h-10 rounded bg-gray-800/60 text-gray-200 px-3"
              placeholder="Enter event title"
            />
          </div>
          
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-5">
            <label
              htmlFor="category"
              className="text-lg font-semibold text-white mb-2 block"
            >
              Category
            </label>
            <input
              id="category"
              name="category"
              type="text"
              value={form.category}
              onChange={handleChange}
              className="mt-2 w-full h-10 rounded bg-gray-800/60 text-gray-200 px-3"
              placeholder="Conference / Workshop / Meetup"
            />
          </div>
          
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-5">
            <label
              htmlFor="date"
              className="text-lg font-semibold text-white mb-2 block"
            >
              Date
            </label>
            <input
              id="date"
              name="date"
              type="datetime-local"
              value={form.date}
              onChange={handleChange}
              className="mt-2 w-full h-10 rounded bg-gray-800/60 text-gray-200 px-3"
            />
          </div>
          
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-5">
            <label
              htmlFor="location"
              className="text-lg font-semibold text-white mb-2 block"
            >
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={form.location}
              onChange={handleChange}
              className="mt-2 w-full h-10 rounded bg-gray-800/60 text-gray-200 px-3"
              placeholder="City / Venue / Online"
            />
          </div>
          
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-5">
            <label
              htmlFor="organizer"
              className="text-lg font-semibold text-white mb-2 block"
            >
              Organizer
            </label>
            <input
              id="organizer"
              name="organizer"
              type="text"
              value={form.organizer}
              onChange={handleChange}
              className="mt-2 w-full h-10 rounded bg-gray-800/60 text-gray-200 px-3"
              placeholder="Organization or individual name"
            />
          </div>
          
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-5">
            <label
              htmlFor="description"
              className="text-lg font-semibold text-white mb-2 block"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="mt-2 w-full rounded bg-gray-800/60 text-gray-200 px-3 py-2"
              placeholder="Enter event description"
            />
          </div>
          
          <div className="mt-10 flex gap-3">
            <button
              type="submit"
              className="rounded bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-500"
            >
              Update Event
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="rounded bg-gray-700 px-5 py-2 text-sm font-medium text-gray-200 hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditEventPage;
