import { Link } from "react-router-dom";
import { useAppContext } from "../hooks/AppContext";

export const Navbar = () => {
	const { favorites, toggleFavorite } = useAppContext();

	return (
		<nav style={{
			background: "#0a0a0f",
			borderBottom: "1px solid #2a2a4a",
			padding: "12px 30px",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			position: "sticky",
			top: 0,
			zIndex: 100,
		}}>
			{/* Logo */}
			<Link to="/">
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"
					alt="Star Wars"
					style={{ height: "50px" }}
				/>
			</Link>

			{/* Favorites dropdown */}
			<div className="dropdown">
				<button
					className="dropdown-toggle"
					data-bs-toggle="dropdown"
					style={{
						background: favorites.length > 0 ? "#FFE81F" : "transparent",
						border: "1px solid #FFE81F",
						color: favorites.length > 0 ? "#000" : "#FFE81F",
						padding: "8px 20px",
						borderRadius: "6px",
						cursor: "pointer",
						fontWeight: "600",
					}}
				>
					⭐ Favorites ({favorites.length})
				</button>
				<ul className="dropdown-menu dropdown-menu-end" style={{ background: "#1a1a2e", border: "1px solid #2a2a4a" }}>
					{favorites.length === 0 ? (
						<li><span className="dropdown-item" style={{ color: "#888" }}>No favorites yet</span></li>
					) : (
						favorites.map((fav) => (
							<li key={`${fav.type}-${fav.uid}`} style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								padding: "10px 16px",
								gap: "20px",
								borderBottom: "1px solid #2a2a4a",
							}}>
								<Link
									to={`/${fav.type}/${fav.uid}`}
									style={{ color: "#FFE81F", textDecoration: "none", flex: 1 }}
								>
									{fav.name}
								</Link>
								<button
									onClick={() => toggleFavorite(fav)}
									style={{
										background: "transparent",
										border: "1px solid #ff4d4d",
										color: "#ff4d4d",
										cursor: "pointer",
										fontSize: "0.75rem",
										padding: "3px 10px",
										borderRadius: "4px",
										whiteSpace: "nowrap",
									}}
								>
									Eliminar
								</button>
							</li>
						))

					)}
				</ul>
			</div>
		</nav>
	);
};