const express = require('express');
const router = express.Router();
const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movieController');
const protect = require('../middleware/auth');

// Publiczne
router.get('/', getMovies);
router.get('/:id', getMovieById);

// Chronione
router.post('/', protect, createMovie);
router.put('/:id', protect, updateMovie);
router.delete('/:id', protect, deleteMovie);

module.exports = router;
