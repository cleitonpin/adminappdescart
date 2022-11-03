import React from 'react';
import { Box, Button, Container, Link, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import SvgNotFound from '../assets/pageNotFound.svg';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const nav = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">
              404
            </Typography>
            <Typography variant="h6">
              Oops! Page não encontrada
            </Typography>
            <Button variant="contained" sx={{ marginTop: 2 }} onClick={() => nav('/')} >
              Voltar para o início
            </Button>
          </Grid>
          <Grid xs={6}>
            <img
              src={SvgNotFound}
              alt=""
              width={500} height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}