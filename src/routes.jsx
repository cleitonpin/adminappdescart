import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as ThemeProviderMaterial } from "@mui/material/styles";
import { theme, themeMaterial } from "./style/theme";

import SignIn from "./pages/Login";
import SignUp from "./pages/SignUp";
import PersistLogin from "./components/PersistLogin";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassord";
import ResetPassoword from "./pages/ResetPassword";
import RequireAuth from "./components/RequireAuth";
import { useAuth } from "./hooks/AuthContext";

export default function MainRoutes() {
  const { currentFranchise } = useAuth();

  return (
    <ThemeProviderMaterial theme={themeMaterial}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route element={<PersistLogin />}>
              <Route
                path="/"
                element={
                  currentFranchise ? <Navigate to="/dashboard" /> : <SignIn />
                }
              />
              <Route
                path="/register"
                element={
                  currentFranchise ? <Navigate to="/dashboard" /> : <SignUp />
                }
              />
              <Route
                path="/forgot-password"
                element={
                  currentFranchise ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <ForgotPassword />
                  )
                }
              />
              <Route
                path="/resetar-senha"
                element={
                  currentFranchise ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <ResetPassoword />
                  )
                }
              />
              <Route element={<RequireAuth />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeProviderMaterial>
  );
}
