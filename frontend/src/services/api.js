import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const registerUser = (data) => API.post('/users/register', data);
export const loginUser = (data) => API.post('/users/login', data);
export const getMovies = () => API.get('/movies');
export const getMovieDetails = (id) => API.get(`/movies/${id}`);
export const getReviewsByMovie = (movieId) => API.get(`/reviews/movie/${movieId}`);
export const createReview = (data, token) =>
  API.post('/reviews', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const createMovie = (data, token) =>
  API.post('/movies', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const updateMovie = (id, data, token) => {
  return axios.put(`/api/movies/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
export const deleteMovie = (movieId, token) =>
  API.delete(`/movies/${movieId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteOwnReview = (reviewId, token) => {
  return axios.delete(`/api/reviews/${reviewId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteReviewAsAdmin = (reviewId, token) => {
  return axios.delete(`/api/reviews/admin/${reviewId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};