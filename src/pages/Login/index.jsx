import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";

import { toast } from "react-toastify";
import { useAuth } from "../../hooks/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const { signIn, loading, setLoading } = useAuth();
  const [seePassword, setSeePassword] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("ok");
      await signIn({
        email,
        password,
      });

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: " 90vh",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Entrar
        </Typography>
        <Box noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            label="Senha"
            type={seePassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label={<Typography variant="inherit">Ver senha</Typography>}
              onChange={() => setSeePassword(!seePassword)}
            />
          </FormGroup>
          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : "Entrar"}
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="/forgot-password" variant="body2">
                Esqueceu a senha?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Não tem uma conta? Cadastre-se"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
    </Container>
  );
}
