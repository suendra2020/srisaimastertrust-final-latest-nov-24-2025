// src/plugins/globalConfig.ts
import React, { createContext, useContext } from 'react';

// Define the shape of the context value
interface GlobalConfig {
  $base: string;
}

// Create the context with a default value
const GlobalConfigContext = createContext<GlobalConfig>({ $base: '/' });

// Custom hook to use the global properties
export const useGlobalConfig = () => useContext(GlobalConfigContext);

// Provider component to wrap the application
export const GlobalConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use import.meta.env.BASE_URL for the base path
  const $base = import.meta.env.BASE_URL;

  return (
    <GlobalConfigContext.Provider value={{ $base }}>
      {children}
    </GlobalConfigContext.Provider>
  );
};
