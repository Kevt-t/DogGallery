import { useContext, useState, useEffect } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import "./SettingsPanel.css";

export default function SettingsPanel() {
  const { settings, updateSetting } = useContext(SettingsContext);
  const [localPresets, setLocalPresets] = useState(settings.timerPresets || {
    focusTime: 25,
    shortBreak: 5,
    longBreak: 15
  });

  useEffect(() => {
    if (!settings.timerPresets) {
      updateSetting('timerPresets', {
        focusTime: 25,
        shortBreak: 5,
        longBreak: 15
      });
    }
  }, []);

  function handlePresetChange(event) {
    const { name, value } = event.target;
    const newValue = parseInt(value, 10);

    // Ensure the value is within a valid range (1-60 minutes)
    if (newValue >= 1 && newValue <= 60) {
      setLocalPresets((prev) => ({
        ...prev,
        [name]: newValue
      }));
    }
  }

  function savePresets() {
    updateSetting("timerPresets", localPresets);
  }

  return (
    <div className="settings-panel">
      <h2>Settings</h2>

      <label>
        Theme:
        <select value={settings.theme} onChange={(e) => updateSetting("theme", e.target.value)}>
          <option value="light">Light Mode</option>
          <option value="dark">Dark Mode</option>
        </select>
      </label>

      {/* Notification Toggle */}
      <label>
        Notifications:
        <input
          type="checkbox"
          checked={settings.notifications}
          onChange={() => updateSetting("notifications", !settings.notifications)}
        />
      </label>

      {/* Sound Toggle */}
      <label>
        App Sounds:
        <input
          type="checkbox"
          checked={settings.sound}
          onChange={() => updateSetting("sound", !settings.sound)}
        />
      </label>

      {/* Timer Presets */}
      <h3>Timer Presets (in minutes)</h3>
      <label>
        Focus Time:
        <input type="number" name="focusTime" value={localPresets.focusTime} onChange={handlePresetChange} />
      </label>
      <label>
        Short Break:
        <input type="number" name="shortBreak" value={localPresets.shortBreak} onChange={handlePresetChange} />
      </label>
      <label>
        Long Break:
        <input type="number" name="longBreak" value={localPresets.longBreak} onChange={handlePresetChange} />
      </label>
      <button onClick={savePresets}>Save Timer Presets</button>
    </div>
  );
}
