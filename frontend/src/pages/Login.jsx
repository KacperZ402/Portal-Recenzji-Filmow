import React from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../services/api';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.user.role);
      const decoded = jwtDecode(response.data.token);
      setUser(decoded);
      navigate('/');
    } catch (err) {
      alert('Niepoprawne dane logowania');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      <input type="password" {...register('password')} placeholder="Hasło" />
      <button type="submit">Zaloguj</button>
    </form>
  );
};


export default Login;
