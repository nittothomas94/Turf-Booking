import './Footer.css';

import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className="footer">
      <div className="top-footer">
        <div className="left">
          <img src="/images/logo.png" alt="logo" />
          <h1>TurfTime</h1>

          <div className="app">
            <h5>Download The App</h5>
            <i class="fa-brands fa-google-play"></i>
            <i class="fa-brands fa-apple"></i>
          </div>
        </div>
        <div className="center">
          <Link to={'/'} className="footer-link">
            Home
          </Link>

          <Link to={'/turfs'} className="footer-link">
            Turfs
          </Link>
          <Link to={'/contact'} className="footer-link">
            Connect Us
          </Link>
          <Link to={'/signup'} className="footer-link">
            SignUp
          </Link>
          <Link to={'/admin/account-info'} className="footer-link">
            Add Turf
          </Link>
          <p>News and Events</p>
          <p>Careers</p>
          <p>Blogs</p>
        </div>
        <div className="right">
          <p>KERALA STARTUP MISSION</p>
          <p>Info Park Kakkanad,</p>
          <p>Ernakulam, India</p>
          <p> +91 9446979075 </p>
          <p>nittothomas94@gmail.com</p>
          <h1>Connect Us</h1>
          <div className="Connect-Icons">
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-square-facebook"></i>
            <i class="fa-brands fa-linkedin"></i>
            <i class="fa-brands fa-square-x-twitter"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
