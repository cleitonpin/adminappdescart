import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"
import { AuthProvider } from "./hooks/AuthContext"
import MainRoutes from "./routes"
import { GlobalStyle } from "./style/global"

function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <MainRoutes />
      <ToastContainer /> 
    </AuthProvider>
  )
}

export default App
