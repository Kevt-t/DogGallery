import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react"; // Add useContext and useEffect
import Navbar from "./components/nav/NavBar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SettingsPanel from "./components/settings/SettingsPanel";
import { SettingsContext, SettingsProvider } from "./context/SettingsContext";
import Footer from "./components/Footer";
import "./App.css";

// Create a themed app component
function ThemedApp() {
  const { settings } = useContext(SettingsContext);
  
  useEffect(() => {
    // Apply dark mode class to body when theme changes
    if (settings.theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [settings.theme]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/settings" element={<SettingsPanel />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

// Main App component that provides settings
export default function App() {
  return (
    <SettingsProvider>
      <ThemedApp />
    </SettingsProvider>
  );
}
