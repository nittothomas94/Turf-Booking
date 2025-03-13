import './AdminNavigationbar.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AdminNavigationbar = () => {
  const navigate = useNavigate();

  const onAdminLogoutClick = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="Navigationbar">
      {/* Admin Side */}

      <div className="admin">
        <i className="material-icons">account_circle</i>
        <h2>ADMIN</h2>
      </div>

      {/* navigation */}

      <div className="navigation">
        <h4>Navigation</h4>

        <Link to={'/admin/account-info'} className="nav-link">
          <i className="material-icons users">group</i>
          <p>ACCOUNT INFO</p>
        </Link>

        <Link to={'/admin/turfs'} className="nav-link">
          <i className="material-icons turfs-i">shopping_cart_checkout</i>
          <p>TURFS</p>
        </Link>

        <Link to={'/admin/bookings'} className="nav-link">
          <i className="material-icons booking"> task</i>

          <p>BOOKINGS</p>
        </Link>

        <Link to={'/admin/users'} className="nav-link">
          <i className="material-icons account-info"> account_circle</i>
          <p>USERS</p>
        </Link>

        <button className="nav-link logout-btn" onClick={onAdminLogoutClick}>
          <i className="material-icons logout-i">logout</i>
          <p>LOGOUT</p>
        </button>
      </div>
    </div>
  );
};

export default AdminNavigationbar;
