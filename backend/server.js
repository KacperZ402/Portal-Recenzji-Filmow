const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const protect = require('./middleware/auth');

const app = express();  // <-- tutaj tworzysz instancję Express

// Middleware do parsowania JSON w body requestów
app.use(express.json());

// Połącz z MongoDB, dopiero połączenie odpala serwer
mongoose.connect(process.env.MONGO_URI, {
})
.then(() => {
  console.log('MongoDB connected locally');

  // Trasy API
  app.use('/api/users', userRoutes);
  app.use('/api/movies', movieRoutes);
  app.use('/api/reviews', reviewRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch(err => console.error('MongoDB connection error:', err));
