import React, { createContext, useState, useContext } from 'react';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [activeSesionId, setActiveSesionId] = useState('');

  const setSession = (username) => {
    setActiveSesionId(username);
  };

  return (
    <SessionContext.Provider value={{ activeSesionId, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
