import React, { useState } from "react";
import eventsData from "../../data/events";
import { useNavigate } from "react-router-dom";

// Form for creating an event matching structure in events.js
const AddEventPage = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const initialState = {
    title: "",
    category: "",
    status: "scheduled",
    date: "",
    endDate: "",
    location: "",
    organizer: "",
    capacity: "",
    price: "",
    currency: "INR",
    image: "",
    tags: "", // comma separated
    description: "",
    agenda: [{ time: "", topic: "" }],
  };

  const [form, setForm] = useState(initialState);

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const updateAgendaItem = (idx, key, value) => {
    setForm((f) => {
      const agenda = [...f.agenda];
      agenda[idx] = { ...agenda[idx], [key]: value };
      return { ...f, agenda };
    });
  };

  const addAgendaRow = () =>
    setForm((f) => ({ ...f, agenda: [...f.agenda, { time: "", topic: "" }] }));
  const removeAgendaRow = (idx) =>
    setForm((f) => ({ ...f, agenda: f.agenda.filter((_, i) => i !== idx) }));

  const onSubmit = (e) => {
    e.preventDefault();
    // For now just log (replace with real submit later)
    const payload = {
      ...form,
      capacity: form.capacity ? Number(form.capacity) : null,
      price: form.price ? Number(form.price) : 0,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      agenda: form.agenda.filter((a) => a.time || a.topic),
    };
    eventsData.push(payload);
    console.log("Submit new event payload:", payload);

    // Show success popup
    setShowPopup(true);

    // Hide popup after 5 seconds and navigate to events page
    setTimeout(() => {
      setShowPopup(false);
      navigate("/events");
    }, 500);

    // Reset form
    setForm(initialState);
  }; // Quick-fill with sample data to test form without typing
  const fillSample = () => {
    setForm({
      title: "Sample Innovation Meetup",
      category: "Meetup",
      status: "scheduled",
      date: "2025-09-20T18:00",
      endDate: "2025-09-20T20:30",
      location: "Online / Zoom",
      organizer: "Dev Community Hub",
      capacity: "200",
      price: "0",
      currency: "USD",
      image: "https://picsum.photos/seed/innovation/800/400",
      tags: "innovation, networking, community",
      description:
        "An evening meetup sharing rapid prototyping tips, community projects, and lightning talks.",
      agenda: [
        { time: "18:00", topic: "Welcome & Intros" },
        { time: "18:15", topic: "Lightning Talks Round 1" },
        { time: "19:00", topic: "Break / Networking" },
        { time: "19:15", topic: "Lightning Talks Round 2" },
        { time: "20:10", topic: "Closing & Next Steps" },
      ],
    });
  };

  return (
    <section className="py-8 max-w-4xl mx-auto">
      <div className="px-4 sm:px-6">
        <h1 className="text-2xl font-bold text-white mb-6">Create New Event</h1>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-6">
            <h2 className="text-lg font-semibold text-white mb-1">
              Basic Info
            </h2>
            <p className="text-xs text-gray-400 mb-5">
              Core identifying details for the event listing.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">
                  Title<span className="text-pink-500 ml-1">*</span>
                </label>
                <input
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  required
                  placeholder="e.g. Frontend Fusion Summit"
                  className="rounded bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3 py-2 text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Category</label>
                <input
                  value={form.category}
                  onChange={(e) => update("category", e.target.value)}
                  placeholder="Conference / Workshop / Hackathon"
                  className="rounded bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3 py-2 text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => update("status", e.target.value)}
                  className="rounded bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3 py-2 text-sm"
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="draft">Draft</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 md:col-span-1">
                <label className="text-sm font-medium">Organizer</label>
                <input
                  value={form.organizer}
                  onChange={(e) => update("organizer", e.target.value)}
                  placeholder="Organization or Host Name"
                  className="rounded bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3 py-2 text-sm"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  rows={4}
                  placeholder="Brief overview, focus areas, goals..."
                  className="rounded bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3 py-2 text-sm resize-y"
                />
              </div>
            </div>
          </div>

          {/* Scheduling & Location */}
          <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-6">
            <h2 className="text-lg font-semibold text-white mb-1">
              Schedule & Location
            </h2>
            <p className="text-xs text-gray-400 mb-5">
              Define when and where the event happens.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col gap-2 md:col-span-1">
                <label className="text-sm font-medium">
                  Start Date & Time<span className="text-pink-500 ml-1">*</span>
                </label>
                <input
                  type="datetime-local"
                  value={form.date}
                  onChange={(e) => update("date", e.target.value)}
                  required
                  className="rounded bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3 py-2 text-sm"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-1">
                <label className="text-sm font-medium">End Date & Time</label>
                <input
                  type="datetime-local"
                  value={form.endDate}
                  onChange={(e) => update("endDate", e.target.value)}
                  className="rounded bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3 py-2 text-sm"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-1">
                <label className="text-sm font-medium">Location</label>
                <input
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  placeholder="City / Venue / Online"
                  className="rounded bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Capacity & Pricing */}
          <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-6">
            <h2 className="text-lg font-semibold text-white mb-1">
              Capacity & Pricing
            </h2>
            <p className="text-xs text-gray-400 mb-5">
              Attendance limits and cost information.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Capacity</label>
                <input
                  type="number"
                  min="0"
                  value={form.capacity}
                  onChange={(e) => update("capacity", e.target.value)}
                  placeholder="e.g. 150"
                  className="rounded bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3 py-2 text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Price</label>
                <input
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={(e) => update("price", e.target.value)}
                  placeholder="0 for free"
                  className="rounded bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3 py-2 text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Currency</label>
                <select
                  value={form.currency}
                  onChange={(e) => update("currency", e.target.value)}
                  className="rounded bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3 py-2 text-sm"
                >
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>
          </div>

          {/* Media & Tags */}
          <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-6">
            <h2 className="text-lg font-semibold text-white mb-1">
              Media & Tags
            </h2>
            <p className="text-xs text-gray-400 mb-5">
              Thumbnail image and discovery tags.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Image URL</label>
                <input
                  value={form.image}
                  onChange={(e) => update("image", e.target.value)}
                  placeholder="https://..."
                  className="rounded bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3 py-2 text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">
                  Tags (comma separated)
                </label>
                <input
                  value={form.tags}
                  onChange={(e) => update("tags", e.target.value)}
                  placeholder="react, performance, a11y"
                  className="rounded bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Agenda */}
          <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-6">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg font-semibold text-white">Agenda</h2>
              <button
                type="button"
                onClick={addAgendaRow}
                className="text-xs rounded bg-indigo-600 hover:bg-indigo-500 px-3 py-1 font-medium"
              >
                Add Item
              </button>
            </div>
            <p className="text-xs text-gray-400 mb-5">
              Outline time slots and topics.
            </p>
            <div className="space-y-4">
              {/* Header row for desktop alignment */}
              <div className="hidden md:grid md:grid-cols-6 text-[11px] uppercase tracking-wide text-gray-500 mb-2">
                <span className="md:col-span-1">Time</span>
                <span className="md:col-span-4">Topic</span>
                <span className="md:col-span-1 sr-only">Remove</span>
              </div>
              <div className="space-y-3">
                {form.agenda.map((a, idx) => (
                  <div
                    key={idx}
                    className="grid gap-3 md:grid-cols-6 items-center"
                  >
                    <div className="md:col-span-1">
                      <input
                        aria-label="Agenda time"
                        value={a.time}
                        onChange={(e) =>
                          updateAgendaItem(idx, "time", e.target.value)
                        }
                        placeholder="10:00"
                        className="h-9 w-full rounded bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-2 text-xs"
                      />
                    </div>
                    <div className="md:col-span-4">
                      <input
                        aria-label="Agenda topic"
                        value={a.topic}
                        onChange={(e) =>
                          updateAgendaItem(idx, "topic", e.target.value)
                        }
                        placeholder="Opening Keynote"
                        className="h-9 w-full rounded bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-2 text-xs"
                      />
                    </div>
                    <div className="md:col-span-1 flex items-center justify-end">
                      {form.agenda.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeAgendaRow(idx)}
                          className="text-xs rounded bg-rose-500/70 hover:bg-rose-500 px-2 py-1 font-medium text-white shadow-sm transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              className="rounded bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-500"
            >
              Publish
            </button>
            <button
              type="button"
              onClick={fillSample}
              className="rounded bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-500"
            >
              Fill Sample
            </button>
            <button
              type="reset"
              onClick={() =>
                setForm({
                  title: "",
                  category: "",
                  status: "scheduled",
                  date: "",
                  endDate: "",
                  location: "",
                  organizer: "",
                  capacity: "",
                  price: "",
                  currency: "USD",
                  image: "",
                  tags: "",
                  description: "",
                  agenda: [{ time: "", topic: "" }],
                })
              }
              className="rounded bg-gray-700 px-5 py-2 text-sm font-medium text-gray-200 hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* Modern Toast Notification */}
      {showPopup && (
        <div className="fixed top-4 right-4 z-50 animate-slideInRight">
          <div className="bg-gray-800 shadow-lg rounded-md overflow-hidden max-w-xs border-l-4 border-green-500">
            <div className="flex p-4">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">
                  Event created successfully!
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Redirecting to events list...
                </p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    onClick={() => setShowPopup(false)}
                    className="inline-flex rounded-md p-1.5 text-gray-400 hover:text-white focus:outline-none"
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AddEventPage;
