import { createContext, useState, useEffect } from "react";

export const SettingsContext = createContext();

const defaultSettings = {
  theme: "light",
  notifications: true,
  sound: true,
  favorites: JSON.parse(localStorage.getItem("favorites")) || [], // Load favorites from localStorage
  timerPresets: {
    focusTime: 25,
    shortBreak: 5,
    longBreak: 15
  }
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    return JSON.parse(localStorage.getItem("appSettings")) || defaultSettings;
  });

  // Save settings & favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem("appSettings", JSON.stringify(settings));
    localStorage.setItem("favorites", JSON.stringify(settings.favorites)); // Sync favorites
  }, [settings]);

  function updateSetting(key, value) {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

