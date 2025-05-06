"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Trash2, Edit, Plus } from "lucide-react";
import { API_BASE_URL } from "../config";

function Achievement() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/achievement`);
      const data = await response.json();
      setAchievements(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      toast.error("Failed to load achievements");
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openModal = (achievement = null) => {
    if (achievement) {
      setCurrentAchievement(achievement);
      setFormData({
        title: achievement.title || "",
        description: achievement.description || "",
        image: null,
      });
      setPreviewUrl(achievement.image || "");
    } else {
      setCurrentAchievement(null);
      setFormData({
        title: "",
        description: "",
        image: null,
      });
      setPreviewUrl("");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentAchievement(null);
    setPreviewUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);

      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      let url = `${API_BASE_URL}/api/achievement`;
      let method = "POST";

      if (currentAchievement) {
        url = `${url}?id=${currentAchievement._id}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to save achievement");
      }

      toast.success(
        currentAchievement ? "Achievement updated" : "Achievement added"
      );
      fetchAchievements();
      closeModal();
    } catch (error) {
      console.error("Error saving achievement:", error);
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this achievement?")) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/achievement?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete achievement");
      }

      toast.success("Achievement deleted");
      fetchAchievements();
    } catch (error) {
      console.error("Error deleting achievement:", error);
      toast.error(error.message);
    }
  };

  let achievementList;

  if (achievements && achievements.length > 0) {
    achievementList = achievements[0].achievements;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Yutuqlar</h1>
        <button
          onClick={() => openModal()}
          className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-1" />
          Yangi qo‘shish
        </button>
      </div>

      {achievementList && loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 animate-pulse"
            >
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded"></div>
              </div>
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : achievementList && achievementList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementList.map((achievement) => (
            <div
              key={achievement._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              {achievement.image && (
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={
                      `${API_BASE_URL}/uploads/${achievement.image}` ||
                      "/placeholder.svg"
                    }
                    alt={achievement.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  {achievement.title}
                </h2>
                <p className="text-gray-700 mb-4">{achievement.description}</p>
                <div className="flex justify-end">
                  <button
                    onClick={() => openModal(achievement)}
                    className="text-teal-600 hover:text-teal-900 mr-3"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(achievement._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-gray-500">
            Yutuqlar topilmadi. "Yangi qo‘shish" tugmasini bosing.
          </p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={closeModal}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {currentAchievement
                      ? "Yutuqni tahrirlash"
                      : "Yutuq qo‘shish"}
                  </h3>

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

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="description"
                    >
                      Tavsif
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="image"
                    >
                      Rasm
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleFileChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      accept="image/*"
                    />
                    {previewUrl && (
                      <div className="mt-2">
                        <img
                          src={previewUrl || "/placeholder.svg"}
                          alt="Preview"
                          className="h-32 object-cover rounded"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {currentAchievement ? "Yangilash" : "Qo‘shish"}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Achievement;
