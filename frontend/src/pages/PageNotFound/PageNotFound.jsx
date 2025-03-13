import './PageNotFound.css';
import Button from '../../components/Button/button';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  const onHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="PageNotFound">
      <img src="/images/404.jpg" alt="404 img" />
      <h1>Page Not Found</h1>
      <Button
        text="Return To Home Page"
        onclick={onHomeClick}
        className="Button404"
      />
    </div>
  );
};

export default PageNotFound;
