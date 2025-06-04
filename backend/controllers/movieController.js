const Movie = require('../models/Movie');

// GET /api/movies
exports.getMovies = async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};

// GET /api/movies/:id
exports.getMovieById = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).json({ message: 'Movie not found' });
  res.json(movie);
};

// POST /api/movies
exports.createMovie = async (req, res) => {
  const { title, genre, description } = req.body;
  const movie = new Movie({ title, genre, description });
  await movie.save();
  res.status(201).json(movie);
};

// PUT /api/movies/:id
exports.updateMovie = async (req, res) => {
  const { title, genre, description } = req.body;
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    { title, genre, description },
    { new: true }
  );
  if (!movie) return res.status(404).json({ message: 'Movie not found' });
  res.json(movie);
};

// DELETE /api/movies/:id
exports.deleteMovie = async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) return res.status(404).json({ message: 'Movie not found' });
  res.json({ message: 'Movie deleted' });
};
