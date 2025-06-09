import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getMovieDetails,
  getReviewsByMovie,
  deleteReviewAsAdmin,
  deleteOwnReview
} from '../services/api';

import ReviewForm from '../components/ReviewForm';

import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
  Rating,
  Stack,
} from '@mui/material';

const MovieDetails = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const loggedUserEmail = localStorage.getItem('email');

  const truncateEmail = (email) => {
    if (!email) return '';
    const [name] = email.split('@');
    return `${name}@...`;
  };

  // Oblicz średnią ocenę
  const averageRating = reviews.length
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieResponse = await getMovieDetails(id);
        setMovie(movieResponse.data);

        const reviewsResponse = await getReviewsByMovie(id);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Błąd wczytywania szczegółów filmu lub recenzji:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleDeleteReview = async (reviewId) => {
    const confirm = window.confirm('Czy na pewno chcesz usunąć tę recenzję?');
    if (!confirm) return;

    try {
      if (role === 'admin') {
        await deleteReviewAsAdmin(reviewId, token);
      } else {
        await deleteOwnReview(reviewId, token);
      }
      setReviews(reviews.filter((r) => r._id !== reviewId));
    } catch (err) {
      console.error(err);
      alert('Błąd przy usuwaniu recenzji');
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      {movie && (
        <>
          <Card sx={{ display: 'flex', mb: 3, p: 2 }}>
            {movie.image && (
              <CardMedia
                component="img"
                sx={{ width: 250, borderRadius: 2 }}
                image={movie.image}
                alt={movie.title}
              />
            )}
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {movie.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Gatunek: {movie.genre}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Rok wydania: {movie.releaseYear}
              </Typography>
              <Typography variant="body1" paragraph>
                {movie.description}
              </Typography>

              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <Rating value={Number(averageRating)} precision={0.1} readOnly />
                <Typography variant="subtitle2">
                  {averageRating} ({reviews.length} {reviews.length === 1 ? 'recenzja' : 'recenzji'})
                </Typography>
              </Stack>

              {role === 'admin' && (
                <Button variant="contained" onClick={() => navigate(`/movies/${id}/edit`)}>
                  Edytuj film
                </Button>
              )}
            </CardContent>
          </Card>

          <ReviewForm movieId={id} user={user} />

          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Recenzje:
          </Typography>
          {reviews.length === 0 && <Typography>Brak recenzji.</Typography>}

          {reviews.map((review) => (
            <Card key={review._id} variant="outlined" sx={{ mb: 2, p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Użytkownik: {truncateEmail(review.user?.email)}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <Rating value={review.rating} readOnly size="small" />
                <Typography variant="body2">{review.rating} / 5</Typography>
              </Stack>
              <Typography variant="body1" paragraph>
                {review.content}
              </Typography>
              {(role === 'admin' || review.user.email === loggedUserEmail) && (
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleDeleteReview(review._id)}
                >
                  🗑 Usuń recenzję
                </Button>
              )}
            </Card>
          ))}
        </>
      )}
    </Box>
  );
};

export default MovieDetails;
