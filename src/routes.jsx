import { BrowserRouter, Route, Routes } from "react-router-dom";
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

export default function MainRoutes() {
  return (
    <ThemeProviderMaterial theme={themeMaterial}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/resetar-senha" element={<ResetPassoword />} />
            <Route element={<PersistLogin />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeProviderMaterial>
  );
}
