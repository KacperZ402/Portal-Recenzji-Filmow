import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { registerUser } from '../services/api';

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      <p>{errors.email?.message}</p>

      <input type="password" {...register('password')} placeholder="Hasło" />
      <p>{errors.password?.message}</p>

      <button type="submit">Zarejestruj się</button>
    </form>
  );
};

export default Register;
