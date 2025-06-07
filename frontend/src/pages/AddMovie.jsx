import React, { useState } from 'react';
import { createMovie } from '../services/api';

const genres = [
  'Akcja',
  'Komedia',
  'Dramat',
  'Horror',
  'Romans',
  'Sci-Fi',
  'Fantasy',
  'Thriller',
  'Animacja',
  'Dokumentalny',
  'Przygodowy',
  'Musical',
  'Familijny',
];

const AddMovie = ({ userToken }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseYear, setReleaseYear] = useState(new Date().getFullYear());
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createMovie(
        { title, description, genre, image, releaseYear},
        userToken
      );
      alert('Film dodany pomyślnie!');
      // Możesz też wyczyścić pola formularza lub przekierować gdzieś
    } catch (error) {
      console.error(error);
      alert('Błąd podczas dodawania filmu');
    }
  };
  if (!localStorage.getItem('token')) {
    return null; // nic nie pokazuj
  }
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      <div>
        <label>Tytuł:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px' }}
        />
      </div>

      <div>
        <label>Opis:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          style={{ width: '100%', marginBottom: '10px' }}
        />
      </div>
      <div>
        <label>Rok wydania:</label>
        <input
          type="number"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          min="1900"
          max={new Date().getFullYear()}
          style={{ width: '100%', marginBottom: '10px' }}
        />
      </div>
      <div>
        <label>Gatunek:</label>
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px' }}
        >
          <option value="" disabled>Wybierz gatunek</option>
          {genres.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Link do zdjęcia:</label>
        <input
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://example.com/film.jpg"
          style={{ width: '100%', marginBottom: '10px' }}
        />
      </div>

      <button type="submit">Dodaj film</button>
    </form>
  );
};

export default AddMovie;