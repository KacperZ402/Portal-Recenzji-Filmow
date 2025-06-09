import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { registerUser } from '../services/api';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const schema = yup.object().shape({
  email: yup.string().email('Nieprawidłowy email').required('Email jest wymagany'),
  password: yup.string().min(6, 'Hasło musi mieć co najmniej 6 znaków').required('Hasło jest wymagane'),
});

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log('Dane do rejestracji:', data);
    try {
      await registerUser(data);
      alert('Rejestracja zakończona sukcesem!');
    } catch (error) {
      console.error('Błąd podczas rejestracji:', error.response?.data || error.message);
      alert('Błąd podczas rejestracji');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundColor: '#121212',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 400,
          width: '100%',
          backgroundColor: '#1e1e1e',
          borderRadius: 2,
          boxShadow: '0 0 10px rgba(0,0,0,0.8)',
        }}
      >
        <Typography variant="h5" mb={3} color="#fff" textAlign="center">
          Rejestracja
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Email"
            variant="filled"
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: '#bbb' } }}
            InputProps={{ style: { color: '#eee', backgroundColor: '#333' } }}
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Hasło"
            variant="filled"
            type="password"
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: '#bbb' } }}
            InputProps={{ style: { color: '#eee', backgroundColor: '#333' } }}
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              bgcolor: '#bb86fc',
              '&:hover': { bgcolor: '#9a68d4' },
              color: '#121212',
              fontWeight: 'bold',
            }}
          >
            Zarejestruj się
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
