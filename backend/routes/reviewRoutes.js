const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createReview,
  updateReview,
  deleteReview,
  getReviewsByMovie
} = require('../controllers/reviewController');
const protect = require('../middleware/auth');

// Publiczny dostęp do recenzji filmu
router.get('/movie/:movieId', getReviewsByMovie);

// Chronione operacje
router.post('/', protect, createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);
router.post('/', auth, async (req, res) => {
  // tutaj użytkownik musi być zalogowany
});
module.exports = router;
