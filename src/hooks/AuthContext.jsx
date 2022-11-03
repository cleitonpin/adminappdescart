import { createContext, useContext, useEffect, useState } from "react";
import { createFranchise, loginFranchise } from "../services/franchise";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentFranchise, setCurrentFranchise] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentFranchise = JSON.parse(localStorage.getItem("currentFranchise"));
    setCurrentFranchise(currentFranchise);
  }, []);

  const signIn = async ({ email, password }) => {
    setLoading(true);
    if (isLogged) return;

    const franchise = await loginFranchise({ email, password });

    if (franchise) {
      setCurrentFranchise(franchise);

      localStorage.setItem("currentFranchise", JSON.stringify(franchise));

      setIsLogged(true);
    }

    setLoading(false);
  };

  const signOut = () => {
    setCurrentFranchise(null);
    setIsLogged(false);
    localStorage.removeItem("currentFranchise");
  };

  const signUp = async (data) => {
    setLoading(true);
    const franchise = await createFranchise(data);

    if (franchise) {
      setCurrentFranchise(franchise);
      setIsLogged(true);
    }

    setLoading(false);
    return franchise;
  };

  return (
    <AuthContext.Provider value={{ currentFranchise, setCurrentFranchise, signIn, isLogged, signOut, signUp, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);