const mongoose = require('mongoose');
const Movie = require('../models/Movie');
// GET /api/movies
// GET /api/movies
exports.getMovies = async (req, res) => {
  const movies = await Movie.aggregate([
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'movie',
        as: 'reviews'
      }
    },
    {
      $addFields: {
        averageRating: {
          $cond: [
            { $gt: [{ $size: '$reviews' }, 0] },
            { $avg: '$reviews.rating' },
            null
          ]
        }
      }
    },
    {
      $project: {
        reviews: 0
      }
    }
  ]);
  res.json(movies);
};


// GET /api/movies/:id
exports.getMovieById = async (req, res) => {
  const movie = await Movie.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'movie',
        as: 'reviews'
      }
    },
    {
      $addFields: {
        averageRating: {
          $cond: [
            { $gt: [{ $size: '$reviews' }, 0] },
            { $avg: '$reviews.rating' },
            null
          ]
        }
      }
    },
    { $project: { reviews: 0 } }
  ]);

  if (!movie || movie.length === 0) return res.status(404).json({ message: 'Movie not found' });

  res.json(movie[0]);
};


// POST /api/movies
exports.createMovie = async (req, res) => {
  const { title, genre, description, releaseYear, image } = req.body;
  const movie = new Movie({ title, genre, description, releaseYear, image });
  await movie.save();
  res.status(201).json(movie);
};

// PUT /api/movies/:id
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    // Aktualizuj tylko przesłane pola
    const fields = ['title', 'genre', 'description', 'image', 'releaseYear'];
    fields.forEach(field => {
      if (req.body[field] !== undefined) {
        movie[field] = req.body[field];
      }
    });

    await movie.save(); // to powinno wywołać updatedAt

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE /api/movies/:id
exports.deleteMovie = async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) return res.status(404).json({ message: 'Movie not found' });
  res.json({ message: 'Movie deleted' });
};

