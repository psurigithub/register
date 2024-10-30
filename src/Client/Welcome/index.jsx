import { useNavigate } from 'react-router-dom';
import './index.css';

const Welcome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="welcome-container">
      <h1>Welcome </h1>
      <p>Thank you for logging in. Explore and enjoy our app features!</p>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};




export default Welcome;
