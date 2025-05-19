import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Maak een context aan
const PuffContext = createContext();

// Geef het backend-adres op
const API_URL = "192.168.0.105:5000"; 

export const PuffProvider = ({ children }) => {
  const [puffs, setPuffs] = useState(0);

  useEffect(() => {
    const fetchPuffs = async () => {
      try {
        // Haal de puffs op via de juiste endpoint
        const response = await axios.get(`${API_URL}/puffs`); // Gebruik '/puffs' zoals gedefinieerd in je backend
        setPuffs(response.data.total_puffs); // Zet de totaal aantal puffs
      } catch (error) {
        console.error("Fout bij ophalen van puffs:", error);
      }
    };
    fetchPuffs();
  }, []);

  const addPuff = async (amount) => {
    try {
      // Log de hoeveelheid puffs die je probeert toe te voegen
      console.log("Puff toevoegen:", amount);
  
      // Stuur een POST-verzoek naar de server
      const response = await axios.post(`${API_URL}/puffs`, { amount: amount });
  
      // Log de response om te zien wat er terugkomt
      console.log("Serverresponse:", response.data);
  
      if (response.data.message === "Puffs opgeslagen") {
        setPuffs((prev) => prev + amount); // Verhoog het aantal puffs als de server succesvol heeft opgeslagen
      } else {
        console.log("Onverwachte response:", response.data);
      }
    } catch (error) {
      console.error("Fout bij toevoegen van puffs:", error);
    }
  };
  

  return (
    <PuffContext.Provider value={{ puffs, addPuff }}>
      {children}
    </PuffContext.Provider>
  );
};

// **FIX:** Voeg de default export toe!
export default PuffProvider;

export const usePuffs = () => {
  return useContext(PuffContext);
};
