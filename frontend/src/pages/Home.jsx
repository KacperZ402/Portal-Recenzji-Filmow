import React, { useEffect, useState } from 'react';
import { getMovies, deleteMovie } from '../services/api';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Tooltip,
  Rating,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // asc or desc
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [allGenres, setAllGenres] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await getMovies();
      setMovies(response.data);

      // Unikalne gatunki
      const genres = Array.from(new Set(response.data.map((m) => m.genre))).filter(Boolean);
      setAllGenres(genres);
    };
    fetchMovies();
  }, []);

  const isAdmin = localStorage.getItem('role') === 'admin';

  const handleDelete = async (id) => {
    if (window.confirm('Czy na pewno chcesz usunąć ten film?')) {
      try {
        await deleteMovie(id, localStorage.getItem('token'));
        setMovies((prev) => prev.filter((movie) => movie._id !== id));
      } catch (error) {
        alert('Błąd podczas usuwania filmu');
      }
    }
  };

  // Filtracja i sortowanie
  const filteredMovies = movies
    .filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((movie) =>
      selectedGenre === 'all' ? true : movie.genre === selectedGenre
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.title.localeCompare(b.title);
      else return b.title.localeCompare(a.title);
    });

  return (
    <Box sx={{ p: 3 }}>
      {/* Wyszukiwarka i filtry */}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextField
          label="Szukaj po tytule..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ minWidth: 200 }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Sortuj</InputLabel>
          <Select
            value={sortOrder}
            label="Sortuj"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <MenuItem value="asc">A–Z</MenuItem>
            <MenuItem value="desc">Z–A</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Gatunek</InputLabel>
          <Select
            value={selectedGenre}
            label="Gatunek"
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <MenuItem value="all">Wszystkie gatunki</MenuItem>
            {allGenres.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Lista filmów */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'center',
        }}
      >
        {filteredMovies.map((movie) => (
          <Card
            key={movie._id}
            sx={{ width: 220, position: 'relative', display: 'flex', flexDirection: 'column' }}
          >
            <Link to={`/movies/${movie._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {movie.image ? (
                <CardMedia
                  component="img"
                  height="300"
                  image={movie.image}
                  alt={movie.title}
                  sx={{ borderRadius: '4px 4px 0 0' }}
                />
              ) : (
                <Box
                  sx={{
                    height: 300,
                    backgroundColor: '#ccc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px 4px 0 0',
                    fontWeight: 'bold',
                    color: '#555',
                  }}
                >
                  Brak zdjęcia
                </Box>
              )}

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" noWrap>
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 1 }}>
                  {movie.genre}
                </Typography>
                {/* Średnia ocen z gwiazdkami */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Rating
                    name="read-only"
                    value={movie.averageRating || 0}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                  <Typography variant="body2" color="text.secondary">
                    {movie.averageRating ? movie.averageRating.toFixed(1) : 'Brak ocen'}
                  </Typography>
                </Box>
              </CardContent>
            </Link>

            {isAdmin && (
              <CardActions
                sx={{ justifyContent: 'flex-end', p: 1, pt: 0 }}
              >
                <Tooltip title="Usuń film">
                  <IconButton
                    onClick={() => handleDelete(movie._id)}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
            )}
          </Card>
        ))}

        {/* Dodaj film */}
        {isAuthenticated() && (
          <Card
            sx={{
              width: 220,
              height: 380,
              border: '2px dashed #aaa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              textAlign: 'center',
              flexDirection: 'column',
              color: '#555',
              '&:hover': { borderColor: '#333', color: '#333' },
            }}
          >
            <Link to="/add-movie" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h3" component="div" mb={1}>
                ➕
              </Typography>
              <Typography variant="body1">Dodaj film</Typography>
            </Link>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default MoviesList;
