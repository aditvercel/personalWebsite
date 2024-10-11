"use client";
// components/context/SessionContext.js
import { createContext, useContext } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

// Create the context
const SessionContext = createContext();

// Create a provider component
export function SessionProvider({ children }) {
  const { data: session, status } = useSession();

  const login = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <SessionContext.Provider value={{ session, status, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
}

// Create a custom hook for using the session context
export const useSessionContext = () => {
  return useContext(SessionContext);
};
