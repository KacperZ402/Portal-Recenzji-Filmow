import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetails from './pages/MovieDetails';
import Profile from './pages/Profile';
import AddMovie from './pages/AddMovie'; // lub odpowiednia ścieżka do pliku
import EditMovie from './pages/EditMovie';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error('Błąd dekodowania tokena');
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/add-movie" element={<AddMovie userToken={localStorage.getItem('token')} />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies/:id" element={<MovieDetails user={user} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/movies/:id/edit" element={<EditMovie />} />
      </Routes>
    </Router>
  );
}

export default App;
