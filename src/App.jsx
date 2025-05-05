import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Social from "./pages/Social";
import Location from "./pages/Location";
import PassingScores from "./pages/PassingScores";
import Achievement from "./pages/Achievement";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="about" element={<About />} />
          <Route path="social" element={<Social />} />
          <Route path="location" element={<Location />} />
          <Route path="passing-scores" element={<PassingScores />} />
          <Route path="achievement" element={<Achievement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
