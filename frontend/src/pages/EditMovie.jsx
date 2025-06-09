import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, updateMovie } from '../services/api';
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

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [releaseYear, setReleaseYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieDetails(id);
        const movie = response.data;
        setTitle(movie.title);
        setGenre(movie.genre);
        setDescription(movie.description);
        setImage(movie.image || '');
        setReleaseYear(movie.releaseYear || new Date().getFullYear());
      } catch (error) {
        console.error('Błąd pobierania filmu:', error);
      }
    };
    fetchMovie();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await updateMovie(id, { title, genre, description, image, releaseYear }, token);
      alert('Film zaktualizowany!');
      navigate(`/movies/${id}`);
    } catch (error) {
      console.error('Błąd aktualizacji filmu:', error);
      alert('Nie udało się zaktualizować filmu');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
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
        Edytuj film
      </Typography>

      <TextField
        label="Tytuł"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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
        label="Opis"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={4}
        required
        fullWidth
      />

      <TextField
        label="Link do zdjęcia"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        type="url"
        fullWidth
      />

      <TextField
        label="Rok produkcji"
        type="number"
        value={releaseYear}
        onChange={(e) => setReleaseYear(Number(e.target.value))}
        inputProps={{
          min: 1888,
          max: new Date().getFullYear(),
        }}
        required
        fullWidth
      />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Zapisz zmiany
      </Button>
    </Box>
  );
};

export default EditMovie;
