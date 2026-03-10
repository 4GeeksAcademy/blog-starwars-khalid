import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [people, setPeople] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const loadData = async () => {
    try {
      const [pRes, vRes, plRes] = await Promise.all([
        fetch("https://www.swapi.tech/api/people?page=1&limit=10"),
        fetch("https://www.swapi.tech/api/vehicles?page=1&limit=10"),
        fetch("https://www.swapi.tech/api/planets?page=1&limit=10"),
      ]);
      const [pData, vData, plData] = await Promise.all([
        pRes.json(), vRes.json(), plRes.json()
      ]);
      setPeople(pData.results ?? []);
      setVehicles(vData.results ?? []);
      setPlanets(plData.results ?? []);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFavorite = (item) => {
    const exists = favorites.find((f) => f.uid === item.uid && f.type === item.type);
    if (exists) {
      setFavorites(favorites.filter((f) => !(f.uid === item.uid && f.type === item.type)));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  const isFavorite = (uid, type) => favorites.some((f) => f.uid === uid && f.type === type);

  useEffect(() => { loadData(); }, []);

  return (
    <AppContext.Provider value={{ people, vehicles, planets, favorites, toggleFavorite, isFavorite }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);