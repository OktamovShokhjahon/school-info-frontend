"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Info, Share2, MapPin, Award, BookOpen } from "lucide-react";
import { API_BASE_URL } from "../config";

function Dashboard() {
  const [stats, setStats] = useState({
    about: 0,
    social: 0,
    location: 0,
    passingScores: 0,
    achievements: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        // Fetch counts from each endpoint
        const aboutRes = await fetch(`${API_BASE_URL}/api/about`);
        const aboutData = await aboutRes.json();

        const socialRes = await fetch(`${API_BASE_URL}/api/social`);
        const socialData = await socialRes.json();

        const locationRes = await fetch(`${API_BASE_URL}/api/location`);
        const locationData = await locationRes.json();

        const passRes = await fetch(`${API_BASE_URL}/api/pass`);
        const passData = await passRes.json();

        const achievementRes = await fetch(`${API_BASE_URL}/api/achievement`);
        const achievementData = await achievementRes.json();

        setStats({
          about: Array.isArray(aboutData.about) ? aboutData.about.length : 1,
          social: Array.isArray(socialData.socialMedia)
            ? socialData.socialMedia.length
            : 0,
          location: Array.isArray(locationData.locations)
            ? locationData.locations.length
            : 1,
          passingScores: Array.isArray(passData.passingScores)
            ? passData.passingScores.length
            : 1,
          achievements: achievementData
            ? achievementData.achievements.length
            : 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Haqida",
      count: stats.about,
      icon: <Info className="h-8 w-8 text-blue-500" />,
      link: "/about",
      color: "bg-blue-100",
    },
    {
      title: "Ijtimoiy havolalar",
      count: stats.social,
      icon: <Share2 className="h-8 w-8 text-purple-500" />,
      link: "/social",
      color: "bg-purple-100",
    },
    {
      title: "Manzil",
      count: stats.location,
      icon: <MapPin className="h-8 w-8 text-red-500" />,
      link: "/location",
      color: "bg-red-100",
    },
    {
      title: "O‘tish ballari",
      count: stats.passingScores,
      icon: <BookOpen className="h-8 w-8 text-green-500" />,
      link: "/passing-scores",
      color: "bg-green-100",
    },
    {
      title: "Yutuqlar",
      count: stats.achievements,
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      link: "/achievement",
      color: "bg-yellow-100",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Boshqaruv paneli
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-6 animate-pulse"
            >
              <div className="flex items-center">
                <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                <div className="ml-4 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((card, index) => (
            <Link
              to={card.link}
              key={index}
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className={`rounded-full ${card.color} p-3`}>
                    {card.icon}
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      {card.title}
                    </h2>
                    <p className="text-3xl font-bold text-gray-700">
                      {card.count}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
