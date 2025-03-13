import './Login.css';

import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/button';

import { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';

import axios from '../../../utils/axios';

import { Link, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [login, setLogin] = useState();

  const navigate = useNavigate();

  const onChange = (e, key) => {
    setLogin({ ...login, [key]: e.target.value });
  };

  console.log(login);

  const onLoginClick = async () => {
    try {
      const response = await axios.post('admin/login', login);

      console.log(response);

      localStorage.setItem('token', response.data.token);

      toast.success('Logined Sucessfully');

      setTimeout(() => {
        navigate('/admin/account-info');
      }, 2000);

      //
    } catch (e) {
      console.log(e.message);
      toast.error('Email or Password is incurrect! ');
    }
  };
  return (
    <div className="loginPage">
      <ToastContainer />
      {/* Left Side Of Login Page */}

      <div className="left">
        <h1>Admin Login</h1>
        <img src="/images/logo.png" alt="logo" />
        <h1>TurfTime</h1>
      </div>

      {/* Right Side Of LoginPage */}

      <div className="right">
        <div className="login">
          <div className="top">
            <Input
              type="text"
              placeholder="example@gmail.com"
              label="Email or Username "
              classname="inputField"
              onChange={e => {
                onChange(e, 'email');
              }}
            />
            <Input
              type="password"
              placeholder="exaple123"
              label="Password"
              classname="inputField"
              onChange={e => {
                onChange(e, 'password');
              }}
            />
            <Button
              text="Login"
              width="100%"
              height="40px"
              fontsize="20px"
              fontwaight="bold"
              backgroundcolor="#1ED760"
              borderradius="10px"
              className="LoginButton"
              onclick={onLoginClick}
            />

            <p>
              <u>Forgot your password</u>
            </p>
          </div>
          <p id="or">or</p>
          <div className="bottom">
            <div className="box">
              <img src="/images/mobileLogo.jpg" alt="" />
              <Button
                text="Continue With Phone Number "
                width="100%"
                height="30px"
                padding="10px"
                fontwaight="700"
              />
            </div>
            <div className="box">
              <img src="/images/googleLogo.jpg" alt="" />
              <Button
                text="Continue With Google"
                width="100%"
                height="30px"
                padding="10px"
                fontwaight="700"
              />
            </div>
            <div className="loginasuser">
              <Link to="/login">Login As User</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
