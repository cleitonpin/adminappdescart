import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { formatCep, formatCnpj } from "../../utils";
import { FormHelperText } from "@mui/material";
import Geocode from "react-geocode";
import { useAuth } from "../../hooks/AuthContext";
import { useNavigate } from "react-router-dom";

Geocode.setApiKey("AIzaSyCLCokNnTaCGSgpLlV33WPA9i5ZXU-H5vQ");
Geocode.setLanguage("pt-BR");
Geocode.setRegion("br");

const validator = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Campo obrigatório"),
  password: Yup.string()
    .min(6, "Mínimo de 6 caracteres")
    .required("Campo obrigatório"),
  cnpj: Yup.string()
    .min(18, "Mínimo de 18 caracteres")
    .required("Campo obrigatório"),
  companyName: Yup.string().required("Campo obrigatório"),
  zip: Yup.string()
    .min(9, "Mínimo de 9 caracteres")
    .required("Campo obrigatório"),
  number: Yup.string().required("Campo obrigatório"),
});

export default function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    cnpj: "",
    companyName: "",
    type: "franchise",
  });
  const [addressData, setAddressData] = React.useState({
    street: "",
    city: "",
    state: "",
    uf: "",
    zip: "",
    country: "",
    complement: "",
    district: "",
    number: "",
  });

  const [errors, setErrors] = React.useState({
    email: false,
    password: false,
    cnpj: false,
    companyName: false,
    type: false,
    zip: false,
    number: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const keys = Object.keys(errors);

    const isValid = keys.every((key) => formData[key] !== "");

    if (!isValid) {
      toast.error("Preencha todos os campos");
      return;
    }

    const { results } = await Geocode.fromAddress(
      `${addressData.street}, ${addressData.number}`
    );

    const { lat, lng } = results[0].geometry.location;

    const sendData = {
      ...formData,
      address: {
        ...addressData,
        coordinates: {
          latitude: lat,
          longitude: lng,
        },
      },
    };

    try {
      await signUp(sendData);

      toast.success("Cadastro realizado com sucesso", {
        delay: 2000,
      });

      navigate("/");
    } catch (error) {
      toast("Email ou CNPJ já cadastrado, tente outro", { type: "error" });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setAddressData({ ...addressData, [name]: value });
  };

  const handleBlur = async (event) => {
    const { name, value } = event.target;

    await validator
      .validateAt(name, { [name]: value })
      .then((data) => {
        console.log("ok", data);
        setErrors({ ...errors, [name]: false });
      })
      .catch((err) => {
        console.log(err);
        setErrors({ ...errors, [name]: err.errors[0] });
      });

    if (name === "zip") {
      console.log("é cep");
      const response = await fetch(
        `https://viacep.com.br/ws/${addressData.zip}/json/`
      );
      const data = await response.json();

      setAddressData({
        ...addressData,
        district: data.bairro,
        street: data.logradouro,
        city: data.localidade,
        uf: data.uf,
        state: data.uf,
        complement: data.complemento,
      });
    }
  };

  return (
    <Container component="main" maxWidth="sm">
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
          Cadastro
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onBlur={handleBlur}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                name="cnpj"
                id="cnpj"
                label="CNPJ"
                value={formatCnpj(formData.cnpj)}
                inputProps={{
                  maxLength: 18,
                }}
                error={!!errors.cnpj}
                helperText={errors.cnpj}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="companyName"
                label="Razão social"
                name="companyName"
                autoComplete="family-name"
                value={formData.companyName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={!!errors.companyName}
                helperText={errors.companyName}
              />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <TextField
                required
                fullWidth
                name="zip"
                label="CEP"
                id="zip"
                autoComplete="cep"
                value={formatCep(addressData.zip)}
                onBlur={handleBlur}
                onChange={handleAddressChange}
                error={!!errors.zip}
                helperText={errors.zip}
              />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <TextField
                required
                fullWidth
                name="number"
                label="Número"
                id="number"
                onChange={handleAddressChange}
                value={addressData.number}
                onBlur={handleBlur}
                error={!!errors.number}
                helperText={errors.number}
              />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <TextField
                fullWidth
                name="bairro"
                label="Bairro"
                id="bairro"
                disabled
                value={addressData.district}
              />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <TextField
                fullWidth
                name="complemento"
                label="Complemento"
                id="complemento"
                disabled
                value={addressData.complement}
              />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <TextField
                fullWidth
                name="localidade"
                label="Cidade"
                id="localidade"
                disabled
                value={addressData.city}
              />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <TextField
                fullWidth
                name="state"
                label="UF"
                id="state"
                disabled
                value={addressData.state}
              />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <TextField
                fullWidth
                name="street"
                label="Logradouro"
                id="street"
                disabled
                value={addressData.street}
              />
            </Grid>
            <Grid item xs={12}>
              <FormHelperText>
                Selecione o tipo de cadastro: PEV (Ponto de Entrega Voluntária)
                ou Franquia.
              </FormHelperText>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="pev"
                  control={<Radio />}
                  label="PEV"
                  onChange={handleInputChange}
                />
                <FormControlLabel
                  value="franchise"
                  control={<Radio />}
                  label="Franquia"
                  onChange={handleInputChange}
                />
              </RadioGroup>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            CADASTRE-SE
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Já tem uma conta? Entre aqui
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 5 }} /> */}
    </Container>
  );
}
