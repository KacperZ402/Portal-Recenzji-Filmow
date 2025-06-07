const Review = require('../models/Review');

// POST /api/reviews
exports.createReview = async (req, res) => {
  const { content, rating, movie } = req.body;

  const review = new Review({
    content,
    rating,
    movie,
    user: req.user._id
  });

  await review.save();
  res.status(201).json(review);
};

// PUT /api/reviews/:id
exports.updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) return res.status(404).json({ message: 'Review not found' });
  if (!review.user.equals(req.user._id)) return res.status(403).json({ message: 'Not allowed' });

  review.content = req.body.content || review.content;
  review.rating = req.body.rating || review.rating;

  await review.save();
  res.json(review);
};

// DELETE /api/reviews/:id
exports.deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) return res.status(404).json({ message: 'Review not found' });
  if (!review.user.equals(req.user._id)) return res.status(403).json({ message: 'Not allowed' });

  await review.deleteOne();
  res.json({ message: 'Review deleted' });
};

// GET /api/reviews/movie/:movieId
exports.getReviewsByMovie = async (req, res) => {
  try {
    const reviews = await Review.find({ movie: req.params.movieId }).populate('user', 'email');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
