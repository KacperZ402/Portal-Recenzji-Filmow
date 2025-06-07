const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/auth');
const Review = require('../models/Review');

const {
  createReview,
  updateReview,
  deleteReview,
  getReviewsByMovie
} = require('../controllers/reviewController');

// ✅ Publiczny dostęp do recenzji filmu
router.get('/movie/:movieId', getReviewsByMovie);

// ✅ Chronione operacje
router.post('/', protect, createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview); // <- zwykły użytkownik może usunąć SWOJĄ recenzję

// ✅ Admin może usuwać każdą recenzję
router.delete('/admin/:id', protect, isAdmin, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Recenzja nie istnieje' });
    }

    await review.deleteOne();
    res.status(200).json({ message: 'Recenzja usunięta przez admina' });
  } catch (error) {
    console.error('Błąd przy usuwaniu recenzji przez admina:', error);
    res.status(500).json({ message: 'Błąd serwera' });
  }
});

module.exports = router;
