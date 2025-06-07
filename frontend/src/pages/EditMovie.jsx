import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, updateMovie } from '../services/api';

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [releaseYear, setReleaseYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieDetails(id);
        const movie = response.data;
        setTitle(movie.title);
        setGenre(movie.genre);
        setDescription(movie.description);
        setImage(movie.image || '');
        setReleaseYear(movie.releaseYear || new Date().getFullYear());
      } catch (error) {
        console.error('Błąd pobierania filmu:', error);
      }
    };
    fetchMovie();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await updateMovie(id, { title, genre, description, image, releaseYear }, token);
      alert('Film zaktualizowany!');
      navigate(`/movies/${id}`);
    } catch (error) {
      console.error('Błąd aktualizacji filmu:', error);
      alert('Nie udało się zaktualizować filmu');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Edytuj film</h2>

      <label>Tytuł:</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} required />

      <label>Gatunek:</label>
      <input value={genre} onChange={(e) => setGenre(e.target.value)} required />

      <label>Opis:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

      <label>Link do zdjęcia:</label>
      <input value={image} onChange={(e) => setImage(e.target.value)} />

      <label>Rok produkcji:</label>
      <input
        type="number"
        value={releaseYear}
        onChange={(e) => setReleaseYear(Number(e.target.value))}
        min="1888"
        max={new Date().getFullYear()}
        required
      />

      <button type="submit">Zapisz zmiany</button>
    </form>
  );
};

export default EditMovie;
