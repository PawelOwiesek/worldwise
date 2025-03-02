import { useContext } from "react";
import { CitiesContext } from "./citiesContext";

const useCities = () => {
  const provider = useContext(CitiesContext);
  return provider;
};

export default useCities;
