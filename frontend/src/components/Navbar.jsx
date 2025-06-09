import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
    window.location.reload(); // odświeżenie aplikacji po wylogowaniu
  };

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#222',
    color: 'white',
    fontWeight: 'bold',
  };

  const linkGroupStyle = {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
  };

  const buttonStyle = {
    backgroundColor: '#f44336',
    border: 'none',
    color: 'white',
    padding: '6px 12px',
    cursor: 'pointer',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '1rem',
  };

  const brandStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={brandStyle}>
        FilmSpot
      </Link>

      <div style={linkGroupStyle}>
        {user ? (
          <>
            <Link to="/profile" style={linkStyle}>
              Profil
            </Link>
            <button onClick={handleLogout} style={buttonStyle}>
              Wyloguj
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>
              Zaloguj
            </Link>
            <Link to="/register" style={linkStyle}>
              Zarejestruj
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
