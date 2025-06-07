const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Movie title is required']
  },
  genre: {
    type: String,
    required: [true, 'Genre is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  releaseYear: {
    type: Number,
    default: new Date().getFullYear()
  },
    image: {
    type: String, // np. URL do obrazka
    required: false,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);
