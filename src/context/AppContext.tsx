'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  faculty: any[];
  addFaculty: (faculty: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [faculty, setFaculty] = useState<any[]>([]);

  const addFaculty = (newFaculty: any) => {
    setFaculty([...faculty, newFaculty]);
  };

  return (
    <AppContext.Provider value={{ faculty, addFaculty }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
