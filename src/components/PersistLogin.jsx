import { useEffect } from "react"
import { useAuth } from "../hooks/AuthContext";
import { Outlet, Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

export default function PersistLogin() {
  const { currentFranchise, setCurrentFranchise, loading } = useAuth()
  const franchise = localStorage.getItem('currentFranchise')

  useEffect(() => {
    if (franchise) setCurrentFranchise(JSON.parse(franchise))
  }, [])

  if (franchise) return <Outlet />

  return loading ? (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
    <CircularProgress />
  </Box>
  ) : (
    <Navigate to="/"  />
  )
}