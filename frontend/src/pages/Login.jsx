import React from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../services/api';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const Login = ({ setUser }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.user.role);
      localStorage.setItem('email', response.data.user.email);
      const decoded = jwtDecode(response.data.token);
      setUser(decoded);
      navigate('/');
    } catch (err) {
      alert('Niepoprawne dane logowania');
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
          Logowanie
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Email"
            variant="filled"
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: '#bbb' } }}
            InputProps={{ style: { color: '#eee', backgroundColor: '#333' } }}
            {...register('email', { required: 'Email jest wymagany' })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />
          <TextField
            label="Hasło"
            variant="filled"
            type="password"
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: '#bbb' } }}
            InputProps={{ style: { color: '#eee', backgroundColor: '#333' } }}
            {...register('password', { required: 'Hasło jest wymagane' })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
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
            Zaloguj
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
