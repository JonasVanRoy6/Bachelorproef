import React, { createContext, useContext, useState } from 'react';

const PuffContext = createContext(null);

export const PuffProvider = ({ children }) => {
  const [puffs, setPuffs] = useState(0);

  return (
    <PuffContext.Provider value={{ puffs, setPuffs }}>
      {children}
    </PuffContext.Provider>
  );
};

export const usePuffs = () => {
  const context = useContext(PuffContext);
  if (!context) {
    throw new Error('usePuffs must be used within a PuffProvider');
  }
  return context;
};

export default PuffContext;
