import React from 'react';
import { useForm } from 'react-hook-form';
import { createReview } from '../services/api';

const ReviewForm = ({ movieId, user }) => {
  const { register, handleSubmit, reset } = useForm();

  // Jeśli użytkownik nie jest zalogowany, nie pokazuj formularza
  if (!user) {
    return <p><strong>Zaloguj się, aby dodać recenzję.</strong></p>;
  }

  const onSubmit = async (data) => {
    const token = localStorage.getItem('token');
    try {
      await createReview({ ...data, movie: movieId }, token);
      alert('Recenzja dodana!');
      reset();
    } catch (error) {
      alert('Błąd podczas dodawania recenzji.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea {...register('content')} placeholder="Twoja recenzja" required /><br/>
      <input
        type="number"
        {...register('rating')}
        placeholder="Ocena (1–5)"
        min="1"
        max="5"
        required
      /><br/>
      <button type="submit">Dodaj recenzję</button>
    </form>
  );
};

export default ReviewForm;
