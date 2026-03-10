import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../hooks/AppContext";

const DetailPerson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useAppContext();
const [person, setPerson] = useState(null);
const [homeworld, setHomeworld] = useState("Unknown");
const [imgError, setImgError] = useState(false);

 useEffect(() => {
    fetch(`https://www.swapi.tech/api/people/${id}`)
      .then((r) => r.json())
      .then((data) => {
        const props = data.result.properties;
        setPerson(props);
        if (props.homeworld) {
          fetch(props.homeworld)
            .then((r) => r.json())
            .then((hw) => setHomeworld(hw.result.properties.name));
        }
      });
  }, [id]);

  if (!person) return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: "#FFE81F", fontSize: "1.5rem" }}>Loading...</div>
    </div>
  );

  const imageUrl = `https://raw.githubusercontent.com/dsmora/star-wars-guide/refs/heads/master/build/assets/img/characters/${id}.jpg`;
  const favorite = isFavorite(id, "person");

  const details = [
    ["Height", person.height],
    ["Mass", person.mass],
    ["Hair Color", person.hair_color],
    ["Eye Color", person.eye_color],
    ["Birth Year", person.birth_year],
    ["Gender", person.gender],
    ["Skin Color", person.skin_color],
    ["Homeworld", homeworld],
  ];

  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh", padding: "40px 30px", color: "white" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          background: "transparent",
          border: "1px solid #FFE81F",
          color: "#FFE81F",
          padding: "8px 20px",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "30px",
        }}
      >
        ← Back
      </button>

      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        {/* Imagen */}
        <div style={{ position: "relative" }}>
          <img
            src={imgError ? "https://via.placeholder.com/300x400/1a1a2e/FFE81F?text=?" : imageUrl}
            onError={() => setImgError(true)}
            alt={person.name}
            style={{
              width: "300px",
              height: "400px",
              objectFit: "cover",
              objectPosition: "top",
              borderRadius: "12px",
              border: "2px solid #2a2a4a",
            }}
          />
          <button
            onClick={() => toggleFavorite({ uid: id, name: person.name, type: "person" })}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: favorite ? "#FFE81F" : "rgba(0,0,0,0.7)",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            {favorite ? "★" : "☆"}
          </button>
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: "280px" }}>
          <h1 style={{ color: "#FFE81F", fontSize: "2.5rem", marginBottom: "8px" }}>{person.name}</h1>
          <hr style={{ borderColor: "#2a2a4a", marginBottom: "24px" }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {details.map(([label, value]) => (
              <div key={label} style={{
                background: "#1a1a2e",
                padding: "14px",
                borderRadius: "8px",
                border: "1px solid #2a2a4a",
              }}>
                <p style={{ color: "#888", fontSize: "0.75rem", textTransform: "uppercase", marginBottom: "4px" }}>{label}</p>
                <p style={{ color: "white", fontWeight: "600", margin: 0 }}>{value ?? "Unknown"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPerson;