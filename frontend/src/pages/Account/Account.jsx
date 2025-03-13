import './Account.css';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from '../../utils/axios';
import { useState, useEffect } from 'react';

const Account = () => {
  const [accountInfo, setAccountInfo] = useState({
    email: '',
    firstname: '',
    lastname: '',
    role: '',
    _id: '',
  });

  const navigate = useNavigate();

  //id geting form the token
  const getUserId = () => {
    const token = localStorage.getItem('token');
    // console.log(token);

    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      // console.log(decoded);
      return decoded.id; // Extract _id from the token payload
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  };

  const userId = getUserId();

  // console.log('User ID:', userId);

  const getUserById = async () => {
    const response = await axios.get('/user/accountDetails', {
      headers: {
        Authorization: `Bearer ${userId}`, // Send the userId as part of the Authorization header
      },
    });

    const user = response.data[0];
    setAccountInfo({
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
      _id: user._id,
    });
  };

  console.log(accountInfo);

  useEffect(() => {
    getUserById();
  }, []);
  const onLogoutClick = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const onBookingClick = () => {
    navigate('/booked');
  };

  return (
    <div className="account-user-container">
      <Navbar />

      <div className="account-user">
        {/* Navbar of user Left side */}
        <div className="navbar-account">
          <div className="pic-name">
            <i className="material-icons">account_circle</i>
            <h2>{accountInfo.firstname}</h2>
          </div>
          <div className="card">
            <i className="material-icons">person</i>
            <a href="#">Account Information</a>
          </div>
          <div className="card" onClick={onBookingClick}>
            <i className="material-icons">shopping_bag</i>
            <p onClick={onBookingClick}>Bookings</p>
          </div>

          <div className="card">
            <i className="material-icons">credit_card</i>
            <a href="#">Wallet</a>
          </div>
          <div className="card" onClick={onLogoutClick}>
            <i className="material-icons">power_settings_new</i>
            <a href="#" onClick={onLogoutClick}>
              Logout
            </a>
          </div>
        </div>

        {/* Account details Right side */}
        <div className="account-details">
          <h2>First Name : {accountInfo.firstname}</h2>
          <h2>Last Name : {accountInfo.lastname}</h2>
          <h2>
            Full Name : {accountInfo.firstname + ' ' + accountInfo.lastname}
          </h2>
          <h2>Email : {accountInfo.email}</h2>
          <h2>Phone Number : </h2>
        </div>
      </div>
    </div>
  );
};

export default Account;
