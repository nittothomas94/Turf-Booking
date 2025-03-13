import './Navbar.css';
import { Link } from 'react-router-dom';
import Button from '../Button/button';
import { useNavigate } from 'react-router-dom';
import { checkToken } from '../../utils/check-token';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();

  const [close, setClose] = useState(true);

  const onLogoutClick = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isAuthenticated = checkToken();

  return (
    <div className="navbar">
      <div className="left">
        <img src="/images/logo.png" alt="logo" />
        <h1>TurfTime</h1>
      </div>

      <div className={`right ${close ? '' : 'show'}`}>
        <div className="x" onClick={() => setClose(true)}>
          <i className="material-icons">close_smoll</i>
        </div>
        <Link to={'/'} className="nav-link">
          Home
        </Link>
        <Link to={'/turfs'} className="nav-link">
          Turfs
        </Link>
        <Link to={'/booked'} className="nav-link">
          Booked
        </Link>

        <Link to={'/contact'} className="nav-link">
          Contact Us
        </Link>

        {!isAuthenticated && ( // Show Login only when user is NOT authenticated
          <Link to={'/login'} className="nav-link" id="login">
            Login
          </Link>
        )}

        {isAuthenticated && ( // Show Logout only when user is authenticated
          <Link to={'/account'} className="nav-link">
            Account
          </Link>
        )}
      </div>
      <div className="right-menubar-icon">
        <i className="material-icons menu-icon" onClick={() => setClose(false)}>
          menu
        </i>
      </div>
    </div>
  );
};

export default Navbar;
