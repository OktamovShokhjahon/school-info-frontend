"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { API_BASE_URL } from "../config";

function PassingScores() {
  const [passingScores, setPassingScores] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    fetchPassingScores();
  }, []);

  const fetchPassingScores = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/pass`);
      const data = await response.json();

      // Handle both array and single object responses
      const scoresData = Array.isArray(data) ? data[0] : data;

      setPassingScores(scoresData);
      setFormData({
        title: scoresData?.title || "",
        body: scoresData?.body || "",
      });
    } catch (error) {
      console.error("Error fetching passing scores data:", error);
      toast.error("Failed to load passing scores data");
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
      const method = passingScores ? "PUT" : "POST";
      const response = await fetch(`${API_BASE_URL}/api/pass`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save passing scores data");
      }

      toast.success(
        passingScores
          ? "Passing scores updated successfully"
          : "Passing scores created successfully"
      );
      fetchPassingScores();
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving passing scores data:", error);
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">O‘tish Ballari</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
        >
          {isEditing
            ? "Bekor qilish"
            : passingScores
            ? "Tahrirlash"
            : "Yaratish"}
        </button>
      </div>

      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Sarlavha
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="body"
            >
              Matn
            </label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleInputChange}
              rows="6"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            ></textarea>
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
      ) : passingScores ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            {passingScores.passingScores[0].title}
          </h2>
          <p className="text-gray-700 whitespace-pre-line">
            {passingScores.passingScores[0].body}
          </p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-gray-500">
            O‘tish ballari haqida ma'lumot topilmadi. "Yaratish" tugmasini
            bosing.
          </p>
        </div>
      )}
    </div>
  );
}

export default PassingScores;
