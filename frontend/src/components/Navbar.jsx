import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
    window.location.reload(); // odświeżenie aplikacji po wylogowaniu
  };

  return (
    <nav>
      <Link to="/">FilmSpot</Link>
      {user ? (
        <>
          <Link to="/profile">Profil</Link>
          <button onClick={handleLogout}>Wyloguj</button>
        </>
      ) : (
        <>
          <Link to="/login">Zaloguj</Link>
          <Link to="/register">Zarejestruj</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
