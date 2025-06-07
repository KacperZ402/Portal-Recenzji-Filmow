import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getMovieDetails,
  getReviewsByMovie,
  deleteReviewAsAdmin,
  deleteOwnReview
} from '../services/api';
import ReviewForm from '../components/ReviewForm';
import { isAdmin } from '../utils/auth';

const MovieDetails = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const truncateEmail = (email) => {
    if (!email) return '';
    const [name, domain] = email.split('@');
    return `${name}@...`;
  };
  
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
    <div>
      {movie && (
        <>
          <h1>{movie.title}</h1>

          {movie.image && (
            <img
              src={movie.image}
              alt={movie.title}
              style={{ maxWidth: '300px', marginBottom: '1rem' }}
            />
          )}

          <p><strong>Gatunek:</strong> {movie.genre}</p>
          <p><strong>Rok wydania:</strong> {movie.releaseYear}</p>
          <p><strong>Opis:</strong> {movie.description}</p>
          {role === 'admin' && (
            <button onClick={() => navigate(`/movies/${id}/edit`)}>Edytuj film</button>
          )}
          <hr/>
          <ReviewForm movieId={id} user={user} />
          <h3>Recenzje:</h3>
          {reviews.length === 0 && <p>Brak recenzji.</p>}
          {reviews.map((review) => (
            <div key={review._id} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
              <p>Użytkownik: {truncateEmail(review.user?.email)}</p>
              <p>{review.content}</p>
              <p>Ocena: {review.rating}</p>
              {isAdmin() && (
                <button
                  onClick={() => handleDeleteReview(review._id)}
                  style={{ backgroundColor: 'darkred', color: 'white' }}
                >
                  🗑 Usuń recenzję
                </button>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default MovieDetails;
