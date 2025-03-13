import './Users.css';
import AdminNavigationbar from '../../../components/AdminNavigatiobar/AdminNavigationbar';
import axios from '../../../utils/axios';
import { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem('token');

  const getUsers = async () => {
    const response = await axios.get('/user/users');
    setUsers(response.data);
  };

  console.log(users);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="user-container">
      <AdminNavigationbar />
      <div className="users-page">
        {/* User Page */}
        <h1 id="user-heading">Users Page</h1>

        {/* Users List */}
        <div className="users-list">
          {users.map(item => {
            return (
              <div className="card">
                <h3>First Name : {item.firstname}</h3>
                <h3>LastName : {item.lastname}</h3>
                <h3>Name: {item.firstname + ' ' + item.lastname}</h3>
                <h3>Email : {item.email}</h3>
                <h3>Phone Number : </h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Users;
