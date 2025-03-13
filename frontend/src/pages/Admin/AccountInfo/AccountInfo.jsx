import './AccountInfo.css';
import { useState, useEffect } from 'react';
import AdminNavigationbar from '../../../components/AdminNavigatiobar/AdminNavigationbar';
import { jwtDecode } from 'jwt-decode';
import axios from '../../../utils/axios';

const AccountInfo = () => {
  const [accountInfo, setAccountInfo] = useState({
    email: '',
    firstname: '',
    lastname: '',
    role: '',
    _id: '',
  });

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

  console.log('User ID:', userId);

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

  return (
    <div className="account-container">
      <AdminNavigationbar />

      <div className="account-admin">
        <div className="admin-information">
          <h1>Admin Information</h1>
          <p>First Name : {accountInfo.firstname}</p>
          <p>Last Name : {accountInfo.lastname}</p>
          <p>
            Full Name : {accountInfo.firstname + ' ' + accountInfo.lastname}
          </p>
          <p>Email : {accountInfo.email}</p>
          <p>Phone Number : </p>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
