import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/AuthContext";

const RequireAuth = () => {
  const { currentFranchise } = useAuth();

  const location = useLocation();

  return currentFranchise ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
