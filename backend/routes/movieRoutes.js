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

// Chronione
router.post('/', protect, createMovie);
router.put('/:id', protect, updateMovie);
router.delete('/:id', protect, deleteMovie);
router.put('/:id', protect, isAdmin, updateMovie);

router.post('/', protect, async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.delete('/:id', protect, isAdmin, async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'Film usunięty' });
});

module.exports = router;
