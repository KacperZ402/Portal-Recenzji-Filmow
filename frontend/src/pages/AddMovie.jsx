import React, { useState } from 'react';
import { createMovie } from '../services/api';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

const genres = [
  'Akcja',
  'Komedia',
  'Dramat',
  'Horror',
  'Romans',
  'Sci-Fi',
  'Fantasy',
  'Thriller',
  'Animacja',
  'Dokumentalny',
  'Przygodowy',
  'Musical',
  'Familijny',
  'Wojenny',
  'Kryminalny',
];

const AddMovie = ({ userToken }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseYear, setReleaseYear] = useState(new Date().getFullYear());

  if (!localStorage.getItem('token')) {
    return null; // nic nie pokazuj, jeśli brak tokena
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createMovie(
        { title, description, genre, image, releaseYear },
        userToken
      );
      alert('Film dodany pomyślnie!');
    } catch (error) {
      console.error(error);
      alert('Błąd podczas dodawania filmu');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 500,
        mx: 'auto',
        mt: 4,
        p: 3,
        border: '1px solid #ccc',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h5" textAlign="center" mb={2}>
        Dodaj film
      </Typography>

      <TextField
        label="Tytuł"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
      />

      <TextField
        label="Opis"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={4}
        required
        fullWidth
      />

      <TextField
        label="Rok wydania"
        type="number"
        value={releaseYear}
        onChange={(e) => setReleaseYear(e.target.value)}
        inputProps={{
          min: 1900,
          max: new Date().getFullYear(),
        }}
        required
        fullWidth
      />

      <FormControl fullWidth required>
        <InputLabel id="genre-label">Gatunek</InputLabel>
        <Select
          labelId="genre-label"
          value={genre}
          label="Gatunek"
          onChange={(e) => setGenre(e.target.value)}
        >
          <MenuItem value="" disabled>
            Wybierz gatunek
          </MenuItem>
          {genres.map((g) => (
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Link do zdjęcia"
        type="url"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="https://example.com/film.jpg"
        fullWidth
      />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Dodaj film
      </Button>
    </Box>
  );
};

export default AddMovie;
