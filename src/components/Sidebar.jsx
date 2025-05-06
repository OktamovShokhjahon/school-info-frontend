"use client";

import { NavLink } from "react-router-dom";
import { Home, Info, Share2, MapPin, Award, BookOpen, X } from "lucide-react";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div className="flex">
      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
      </div>

      {/* Sidebar content */}
      <aside
        className={`fixed h-screen inset-y-0 left-0 z-40 w-80 bg-gray-800 transition-transform duration-300 ease-in-out transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:w-64`}
        style={{ zIndex: 50 }}
      >
        <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
          <div className="flex items-center">
            <span className="text-white text-xl font-semibold">
              Admin Panel
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-5 px-2 space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }
            end
          >
            <Home className="mr-3 h-5 w-5" />
            Boshqaruv paneli
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <Info className="mr-3 h-5 w-5" />
            Haqida
          </NavLink>

          <NavLink
            to="/social"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <Share2 className="mr-3 h-5 w-5" />
            Ijtimoiy
          </NavLink>

          <NavLink
            to="/location"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <MapPin className="mr-3 h-5 w-5" />
            Manzil
          </NavLink>

          <NavLink
            to="/passing-scores"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <BookOpen className="mr-3 h-5 w-5" />
            O‘tish ballari
          </NavLink>

          <NavLink
            to="/achievement"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <Award className="mr-3 h-5 w-5" />
            Yutuqlar
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : "ml-0"
        }`}
      >
        {/* Main content goes here */}
      </div>
    </div>
  );
}

export default Sidebar;
