import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { createReview } from '../services/api';
import {
  Box,
  TextField,
  Button,
  Typography,
  Rating,
  Stack
} from '@mui/material';

const ReviewForm = ({ movieId, user }) => {
  const { control, register, handleSubmit, reset } = useForm();

  if (!user) {
    return <Typography variant="body1" color="error" fontWeight="bold">Zaloguj się, aby dodać recenzję.</Typography>;
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
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ 
        mt: 2, 
        p: 2, 
        border: '1px solid #ccc', 
        borderRadius: 2,
        maxWidth: 500,
        mx: 'auto'
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h6" mb={2}>Dodaj recenzję</Typography>

      <TextField
        {...register('content', { required: true })}
        label="Twoja recenzja"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        required
      />

      <Controller
        name="rating"
        control={control}
        defaultValue={0}
        rules={{ required: true, min: 1, max: 5 }}
        render={({ field }) => (
          <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <Typography>Ocena:</Typography>
            <Rating
              {...field}
              value={Number(field.value)}
              onChange={(_, value) => field.onChange(value)}
              precision={1}
              max={5}
              size="large"
            />
          </Stack>
        )}
      />

      <Button variant="contained" type="submit" color="primary" fullWidth>
        Dodaj recenzję
      </Button>
    </Box>
  );
};

export default ReviewForm;
