import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [blueprint, setBlueprint] = useState(null);
  const [userStats, setUserStats] = useState({
    totalBlueprints: 0,
    successfulConnections: 0,
    responseRate: 0
  });

  const value = {
    user,
    setUser,
    blueprint,
    setBlueprint,
    userStats,
    setUserStats
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};