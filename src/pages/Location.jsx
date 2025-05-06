"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { API_BASE_URL } from "../config";

function Location() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
  });

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/location`);
      const data = await response.json();

      // Handle both array and single object responses
      const locationData = Array.isArray(data) ? data[0] : data;

      setLocation(locationData);
      setFormData({
        location: locationData?.location || "",
      });
    } catch (error) {
      console.error("Error fetching location data:", error);
      toast.error("Failed to load location data");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = location ? "PUT" : "POST";
      const response = await fetch(`${API_BASE_URL}/api/location`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save location data");
      }

      toast.success(
        location
          ? "Location updated successfully"
          : "Location created successfully"
      );
      fetchLocation();
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving location data:", error);
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Manzil</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
        >
          {isEditing ? "Bekor qilish" : location ? "Tahrirlash" : "Yaratish"}
        </button>
      </div>

      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="location"
            >
              Manzil URL
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Google Maps URL-ni kiriting"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      ) : location.locations && location ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Manzil xaritasi</h2>
          <div className="mb-4">
            <a
              href={location.location}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              {location.locations[0].location}
            </a>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-gray-500">
            Manzil haqida ma'lumot topilmadi. "Yaratish" tugmasini bosing.
          </p>
        </div>
      )}
    </div>
  );
}

export default Location;
