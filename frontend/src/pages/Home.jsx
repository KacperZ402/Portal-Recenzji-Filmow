import React, { useEffect, useState } from 'react';
import { getMovies } from '../services/api';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import { deleteMovie } from '../services/api';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await getMovies();
      setMovies(response.data);
    };
    fetchMovies();
  }, []);

   const isAdmin = localStorage.getItem('role') === 'admin';
  const token = localStorage.getItem('token');

  const handleDelete = async (id) => {
  const token = localStorage.getItem('token');
  if (window.confirm('Czy na pewno chcesz usunąć ten film?')) {
    try {
      await deleteMovie(id, token);
      setMovies((prev) => prev.filter((movie) => movie._id !== id));
    } catch (error) {
      alert('Błąd podczas usuwania filmu');
    }
  }
};


  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {movies.map((movie) => (
        <div
          key={movie._id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '10px',
            width: '200px',
            textAlign: 'center',
            position: 'relative',
          }}
          >
          <Link to={`/movies/${movie._id}`} style={{ textDecoration: 'none', color: 'black' }}>
            {movie.image && (
              <img
                src={movie.image}
                alt={movie.title}
                style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
              />
            )}
            <h3>{movie.title}</h3>
          </Link>
            {isAdmin && (
            <button
              onClick={() => handleDelete(movie._id)}
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          )}
          </div>
        ))}

        {/* PUSTA KARTA DODAWANIA FILMU */}
        {isAuthenticated() && (
        <div
          style={{
            border: '1px dashed #aaa',
            borderRadius: '8px',
            padding: '10px',
            width: '200px',
            height: '100%',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Link to="/add-movie" style={{ textDecoration: 'none', color: '#333' }}>
            <div>
              <div style={{ fontSize: '2.5rem' }}>➕</div>
              <p>Dodaj film</p>
            </div>
          </Link>
        </div>
        )}
      </div>
  );
};

export default MoviesList;
