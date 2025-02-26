// Favorites.jsx
import React, { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";
import "./Favorites.css";

export default function Favorites() {
  const { settings, updateSetting } = useContext(SettingsContext);
  const { favorites } = settings;

  function removeFavorite(image) {
    const updatedFavorites = favorites.filter((fav) => fav !== image);
    updateSetting("favorites", updatedFavorites);
  }

  return (
    <div className="favorites-page">
      <h2>Your Favorite Puppies ❤️</h2>

      {favorites.length === 0 ? (
        <p className="empty-message">No favorites yet! Like some dogs first.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((dog, index) => (
            <div key={index} className="favorite-item">
              <img src={dog} alt="Favorite dog" className="favorite-img" />
              <button onClick={() => removeFavorite(dog)}>Remove ❤️</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
