const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/auth');
const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movieController');

// Publiczne
router.get('/', getMovies);
router.get('/:id', getMovieById);

// Dodawanie – tylko zalogowany użytkownik
router.post('/', protect, createMovie);

// Edytowanie i usuwanie – tylko admin
router.put('/:id', protect, isAdmin, updateMovie);
router.delete('/:id', protect, isAdmin, deleteMovie);

module.exports = router;
