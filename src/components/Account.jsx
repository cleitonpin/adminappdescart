import {
  Box,
  Button,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/AuthContext";
import { updateFranchise } from "../services/franchise";
import { formatCep, formatCnpj } from "../utils";
import { fetchCep } from "../services/cep";
import { getLatLng } from "../services/google";

console.log(import.meta.env.VITE_API_URL);

export default function Account() {
  const franchise = JSON.parse(localStorage.getItem("currentFranchise"));
  const token = localStorage.getItem("@token");
  const [loading, setLoading] = useState(false);
  const { updateField, currentFranchise } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isDirty, dirtyFields, touchedFields },
    setValue,
  } = useForm({
    defaultValues: {
      email: franchise.email,
      companyName: franchise.companyName,
      address: {
        zip: franchise.address.zip,
        district: franchise.address.district,
        street: franchise.address.street,
        number: franchise.address.number,
        complement: franchise.address.complement,
        city: franchise.address.city,
        state: franchise.address.uf,
        uf: franchise.address.uf,
      },
    },
  });

  const [errors, setErrors] = useState({});

  const onSubmit = async (data) => {
    if (!isDirty) {
      toast.warning("Você precisa alterar algum campo para salvar");
      return;
    }

    if (Object.keys(errors).length > 0) {
      toast.warning("Verifique os campos com erro");
      return;
    }

    const coordinates = await getLatLng(
      `${data.address.street}, ${data.address.number}`
    );

    Object.assign(data, {
      address: {
        ...data.address,
        coordinates,
      },
    });

    try {
      console.log(data);
      setLoading(true);
      const response = await updateFranchise(data, franchise._id, token);

      toast.success("Dados atualizados com sucesso!");
      updateField(response);
    } catch (e) {
      toast("Erro ao atualizar dados, tente novamente.", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleBlur = async (event) => {
    const { value, name } = event.target;
    console.log(value.length);

    if (name === "address.zip" && value.length === 8) {
      const address = await fetchCep(value);

      if (address.erro) {
        toast.error("CEP inválido");

        setErrors({
          ...errors,
          [name]: "CEP inválido",
        });

        return;
      } else {
        setValue("address.zip", formatCep(address.cep));
        setValue("address.district", address.bairro, { shouldDirty: true });
        setValue("address.street", address.logradouro, { shouldDirty: true });
        setValue("address.city", address.localidade, { shouldDirty: true });
        setValue("address.uf", address.uf, { shouldDirty: true });
        setValue("address.state", address.state, { shouldDirty: true });
        setValue("address.complement", address.complemento, {
          shouldDirty: true,
        });
      }
    }
  };

  const translateType = {
    franchise: "Franquia",
    pev: "Ponto de entrega voluntária",
  };

  return (
    <Container>
      <Typography variant="h4">Configurações</Typography>

      <Typography variant="subtitle1" color="#888">
        Tipo de local de descarte: {translateType[franchise.type]}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box component="div" display="flex" mt="16px">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                // onBlur={onBlur}
                autoComplete="email"
                // value={franchise.email}
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("email")}
                onBlur={handleBlur}
                // onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                // error={!!errors.email}
                // helperText={errors.email}
                variant="outlined"
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
                autoFocus
                InputLabelProps={{
                  shrink: true,
                }}
                disabled
                value={formatCnpj(franchise.cnpj.toString())}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("companyName")}
                id="companyName"
                label="Razão social"
                name="companyName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={2} sm={6}>
              <TextField
                required
                fullWidth
                name="zip"
                label="CEP"
                id="zip"
                inputProps={{
                  maxLength: 8,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                // format cep
                {...register("address.zip")}
                autoComplete="cep"
                error={!!errors["address.zip"]}
                helperText={errors["address.zip"]}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <TextField
                required
                fullWidth
                name="number"
                label="Número"
                id="number"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("address.number")}
              />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <TextField
                fullWidth
                name="bairro"
                label="Bairro"
                id="bairro"
                disabled
                {...register("address.district")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <TextField
                fullWidth
                name="complemento"
                label="Complemento"
                id="complemento"
                disabled
                {...register("address.complement")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <TextField
                fullWidth
                name="localidade"
                label="Cidade"
                id="localidade"
                disabled
                {...register("address.city")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <TextField
                fullWidth
                name="state"
                label="UF"
                id="state"
                {...register("address.uf")}
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <TextField
                fullWidth
                name="street"
                label="Logradouro"
                id="street"
                disabled
                {...register("address.street")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Box p="16px" alignItems="center">
              <Button
                type="submit"
                variant="contained"
                color="error"
                sx={{ marginRight: "16px" }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? "Carregando..." : "Salvar"}
              </Button>
            </Box>
          </Grid>
        </Box>
      </form>
    </Container>
  );
}
