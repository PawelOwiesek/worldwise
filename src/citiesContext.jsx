import { createContext, useEffect, useState } from "react";
import { getCities } from "./firebase";

const CitiesContext = createContext([]);

const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await getCities();
        setCities(res);
      } catch (error) {
        alert(`There was an error loading data... ${error}`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await getCities(id);
      setCurrentCity(res);
    } catch (error) {
      alert(`There was an error loading data... ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
};

export default CitiesProvider;
export { CitiesContext };
