import React from "react";
import { NavLink } from "react-router-dom";
import EventDetailsPage from "../pages/Events/EventDetailsPage";

const linkBase =
  "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200";
// const linkInactive = "text-gray-300 hover:text-white hover:bg-gray-700";
const linkActive = "bg-gray-800 text-white";

const Header = () => {
  return (
    <header className="w-full bg-gray-900 border-b border-gray-800 shadow-md sticky top-0 z-10">
      <nav className="max-w-6xl mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="text-white font-semibold tracking-wide">React Router</div>
          <ul className="flex gap-2 list-none m-0 p-0">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
              end
                to="/events"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : ""}`
                }
              >
                Events
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/events/new"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : ""}`
                }
              >
                Create Event
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
