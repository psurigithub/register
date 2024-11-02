import { useState } from 'react';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate(); 
  

  // eslint-disable-next-line react/prop-types
  const {onLogin} = props

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
          const response = await axios.post('http://localhost:3002/login', formData);  
          console.log(response)
             
            if (response.status === 200) {
                setFormData({ email: '', password: '' });
                onLogin(true)
                navigate('/');
            } else {
                setLoginError(`Login failed: ${response.data.message}`);
            }
        } catch (error) {  
            console.log(error)
            if (error.response) {
              
                setLoginError(`Error: ${error.response.data.message}`);
            } else if (error.request) {
             
                setLoginError('No response received from server. Please check if the server is running.');
            } else {
                
                setLoginError('Error during login: ' + error.message);
            }
            console.error('Error during login:', error);
        }
    }
};


  return (
    <div className="App">
      <h2 className="heading">Login Page</h2>
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
       
        {loginError && <p className="error-message">{loginError}</p>}
        <p className="option">Don not have an account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
};

export default Login;
