import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext({
  currentUser: null,
  setCurrentUser: () => {}, // Default no-op function
  logout: () => {}, // Default no-op function
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  console.log('cureeent', currentUser); // Add this to inspect the full response

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("currentUser");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser); // Set the user in context
        axios.defaults.headers["Authorization"] = `Bearer ${storedToken}`; // Set token in axios headers
      }
    } catch (error) {
      console.error("Error initializing AuthContext:", error);
      localStorage.removeItem("currentUser");
      localStorage.removeItem("token");
    }
  }, []);

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    delete axios.defaults.headers["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
