import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../hooks/AppContext";

const CardItem = ({ item, type }) => {
  const { toggleFavorite, isFavorite } = useAppContext();
  const [imgError, setImgError] = useState(false);

  const imageMap = { person: "characters", vehicle: "vehicles", planet: "planets" };
  const imageUrl = `https://raw.githubusercontent.com/dsmora/star-wars-guide/refs/heads/master/build/assets/img/${imageMap[type]}/${item.uid}.jpg`;
  const fallbackUrl = `https://raw.githubusercontent.com/dsmora/star-wars-guide/refs/heads/master/build/assets/img/placeholder.jpg`;

  const favorite = isFavorite(item.uid, type);

  return (
    <div
      style={{
        width: "200px",
        minWidth: "200px",
        borderRadius: "12px",
        overflow: "hidden",
        background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)",
        border: favorite ? "2px solid #FFE81F" : "2px solid #2a2a4a",
        boxShadow: favorite ? "0 0 20px rgba(255,232,31,0.3)" : "0 4px 15px rgba(0,0,0,0.5)",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
    >
      {/* Imagen */}
      <div style={{ position: "relative", height: "280px", overflow: "hidden" }}>
        <img
          src={imgError ? fallbackUrl : imageUrl}
          onError={() => setImgError(true)}
          alt={item.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
            transition: "transform 0.3s ease",
          }}
          onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
        />
        {/* Botón favorito encima de la imagen */}
        <button
          onClick={() => toggleFavorite({ ...item, type })}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: favorite ? "#FFE81F" : "rgba(0,0,0,0.6)",
            border: "none",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            fontSize: "16px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
        >
          {favorite ? "★" : "☆"}
        </button>
        {/* Gradiente bottom */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "80px",
          background: "linear-gradient(transparent, #1a1a2e)",
        }} />
      </div>

      {/* Info */}
      <div style={{ padding: "12px 14px 14px" }}>
        <h6 style={{
          color: "#FFE81F",
          fontWeight: "700",
          marginBottom: "10px",
          fontSize: "0.95rem",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {item.name}
        </h6>
        <Link
          to={`/${type}/${item.uid}`}
          style={{
            display: "block",
            textAlign: "center",
            padding: "6px",
            borderRadius: "6px",
            background: "transparent",
            border: "1px solid #FFE81F",
            color: "#FFE81F",
            fontSize: "0.8rem",
            textDecoration: "none",
            transition: "all 0.2s ease",
          }}
          onMouseOver={e => { e.currentTarget.style.background = "#FFE81F"; e.currentTarget.style.color = "#000"; }}
          onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#FFE81F"; }}
        >
          Learn more →
        </Link>
      </div>
    </div>
  );
};

export default CardItem;