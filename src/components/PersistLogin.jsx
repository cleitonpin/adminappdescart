import { useEffect } from "react"
import { useAuth } from "../hooks/AuthContext";
import { Outlet, Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

export default function PersistLogin() {
  const { currentFranchise, setCurrentFranchise, loading } = useAuth()
  const franchise = localStorage.getItem('currentFranchise')

  console.log('franchise', franchise)

  useEffect(() => {
    if (!franchise) {
      console.log('aq')
      setCurrentFranchise(null)
    }

    if (franchise) {
      localStorage.setItem('currentFranchise', franchise)
      setCurrentFranchise(franchise)
    }

  }, [])

  if (franchise) return <Outlet />

  return <Navigate to="/"  />
}