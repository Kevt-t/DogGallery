import { useState, useEffect, useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

function GetPuppy() {
  const { settings, updateSetting } = useContext(SettingsContext);
  const { favorites, notifications, sound } = settings;

  const [dogImage, setDogImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  // Fetch function
  async function pupAPI() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      if (!response.ok) {
        throw new Error("Failed to fetch dog image");
      }

      const data = await response.json();
      setDogImage(data.message);
      setHistory((prev) => [data.message, ...prev].slice(0, 10));

      // Use our settings
      if (notifications) {
        console.log("Would show a notification if implemented");
      }

      if (sound) {
        console.log("Would play a sound if implemented");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Like/unlike the current dog
  function likeDog() {
    let updatedFavorites;

    if (favorites.includes(dogImage)) {
      updatedFavorites = favorites.filter((fav) => fav !== dogImage);
    } else {
      updatedFavorites = [...favorites, dogImage];
    }
    
    updateSetting("favorites", updatedFavorites);
  }

  useEffect(() => {
    pupAPI();
  }, []);

  return (
    <div className="App">
      <h2>Random Dog Generator</h2>

      {loading ? (
        <div 
          style={{ 
            width: "300px", 
            height: "200px", 
            backgroundColor: "#ddd", 
            borderRadius: "8px",
            animation: "pulse 1.5s infinite ease-in-out"
          }} 
        />
      ) : (
        <img src={dogImage} alt="A random dog" style={{ width: "300px", borderRadius: "8px" }} />
      )}

      {error && <h1 style={{ color: "red" }}>{error}</h1>}

      {dogImage && !loading && !error && (
        <>
          <br />
          <button onClick={likeDog}>
            {favorites.includes(dogImage) ? "Unlike" : "Like"}
          </button>
          <button onClick={pupAPI}>Next</button>
        </>
      )}

      <br />

      <button onClick={pupAPI} disabled={loading}>
        {loading ? "Fetching..." : "Get me a puppy"}
      </button>

      {favorites.length > 0 && (
        <>
          <h3>Favorite Puppies ❤️</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "10px" }}>
            {favorites.map((img, index) => (
              <img key={index} src={img} alt="Favorite dog" style={{ width: "100px", borderRadius: "8px" }} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default GetPuppy;
