import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMovie } from '../services/api';


const AddMovie = () => {
    const navigate = useNavigate();

    useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Musisz być zalogowany, aby dodać film.');
        navigate('/login');
    }
    }, []);


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [genre, setGenre] = useState('');

  const genres = [
    'Akcja', 'Komedia', 'Dramat', 'Horror', 'Romans',
    'Sci-Fi', 'Fantasy', 'Thriller', 'Animacja', 'Dokumentalny',
    'Przygodowy', 'Musical', 'Familijny',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await createMovie(
        { title, description, image, genre },
        token
      );
      alert('Film dodany pomyślnie!');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Błąd podczas dodawania filmu');
    }
  };
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Dodaj film</h2>

      <label>Tytuł:</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} required />

      <label>Opis:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

      <label>Gatunek:</label>
      <select value={genre} onChange={(e) => setGenre(e.target.value)} required>
        <option value="" disabled>Wybierz gatunek</option>
        {genres.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>

      <label>Link do zdjęcia:</label>
      <input value={image} onChange={(e) => setImage(e.target.value)} />

      <button type="submit">Dodaj film</button>
    </form>
  );
};

export default AddMovie;
