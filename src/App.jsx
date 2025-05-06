import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Social from "./pages/Social";
import Location from "./pages/Location";
import PassingScores from "./pages/PassingScores";
import Achievement from "./pages/Achievement";
import LoginPage from "./LoginPage";
// import AdminPanel from "./AdminPanel"; // Assuming this is your admin panel component

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        {/* <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        /> */}
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="about" element={<About />} />
          <Route path="social" element={<Social />} />
          <Route path="location" element={<Location />} />
          <Route path="passing-scores" element={<PassingScores />} />
          <Route path="achievement" element={<Achievement />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
