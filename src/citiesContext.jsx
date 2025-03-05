import { createContext, useEffect, useState } from "react";
import { db, getCities } from "./firebase";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";

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

  async function addCity(newCity) {
    try {
      setIsLoading(true);

      const docRef = await addDoc(collection(db, "cities"), newCity);
      setCities((prevCities) => [...prevCities, { ...newCity, id: docRef.id }]);
    } catch (error) {
      alert(`There was an error adding the city... ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function removeCity(id) {
    try {
      setIsLoading(true);
      await deleteDoc(doc(db, "cities", String(id)));
      setCities((prevCities) => prevCities.filter((city) => city.id !== id));
    } catch (error) {
      alert(`There was an error deleting the city... ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, getCity, addCity, removeCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

export default CitiesProvider;
export { CitiesContext };
