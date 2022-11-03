import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { ThemeProvider as ThemeProviderMaterial } from '@mui/material/styles'
import { theme, themeMaterial } from './style/theme'

import SignIn from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import PersistLogin from './components/PersistLogin'
import NotFound from './pages/NotFound'

export default function MainRoutes(){
  return (
    <ThemeProviderMaterial theme={themeMaterial}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<PersistLogin />}>
              <Route path="/" element={<SignIn />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/home" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeProviderMaterial>
  )
}