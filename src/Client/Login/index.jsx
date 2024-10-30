import { useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let validationErrors = {};
    if (!formData.email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      validationErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('http://localhost:3000/login', formData);
        if (response.data.message === 'Login successful') {
          setLoggedIn(true);
          onLogin(); 
          await navigate('/welcome');
        } else {
          console.error('Login failed:', response.data.message);
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
  };

  return (
    <div className="App">
      <h2 className="heading">Login Page</h2>
      {loggedIn && <p className="success-message">Login successful!</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="label">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="input"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="label">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="input"
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <button type="submit" className="button">Login</button>
        <p className="option">Don not have an account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
};

export default Login;
