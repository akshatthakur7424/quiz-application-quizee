import React, { createContext, useState } from 'react';

export const AuthContext = createContext(false); // Default value

export default function AuthProvider({ children }) {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial state

  const value = { isLoggedIn, setIsLoggedIn }; // Values to expose

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
