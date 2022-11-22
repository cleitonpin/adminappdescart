import { useEffect } from "react";
import { useAuth } from "../hooks/AuthContext";
import { Outlet, Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

export default function PersistLogin() {
  const { currentFranchise, setCurrentFranchise, loading, setIsLoading } =
    useAuth();

  // useEffect(() => {
  //   if (!franchise) {
  //     setCurrentFranchise(null);
  //   }

  //   if (franchise) {
  //     localStorage.setItem("currentFranchise", franchise);
  //     setCurrentFranchise(franchise);
  //   }
  // }, []);

  useEffect(() => {
    let isMounted = true;

    const verifyFranchise = async () => {
      try {
        const franchise = localStorage.getItem("currentFranchise");
        // localStorage.setItem("currentFranchise", franchise);
        setCurrentFranchise(franchise);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    if (!currentFranchise) {
      verifyFranchise();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return loading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Outlet />
  );
}
