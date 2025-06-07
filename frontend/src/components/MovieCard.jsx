import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => (
  <div>
    <h2>{movie.title}</h2>
    <p>{movie.genre}</p>
    <Link to={`/movies/${movie._id}`}>Szczegóły</Link>
  </div>
);

export default MovieCard;
