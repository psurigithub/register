import { useState } from 'react';
import './index.css';
import {Link} from 'react-router-dom'; 
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';


const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false); 
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let validationErrors = {};

    if (!formData.name) {
      validationErrors.name = 'Name is required';
    }
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
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };


const handleRegistrationSuccess = () =>{
      navigate('/login')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Registration successful:', formData);
      setSubmitted(true);  
       await axios.post('http://localhost:3002/register', formData)
      .then(handleRegistrationSuccess())
      .catch(error => console.error('Registration error:', error)); 

     
    } else {
      setSubmitted(false);
    }
  };

  return (
    <div className="App">
      <h2 className='heading'>Registration Form: </h2>
      {submitted && <p className="success-message">Registration successful!</p>}
      <form onSubmit={handleSubmit} className="registration-form">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange} 
            placeholder='Enter your name'
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange} 
            placeholder='Enter your password'
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange} 
            placeholder='Enter your password'
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange} 
            placeholder='confirm your password'
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword}</p>
          )}
        <div className='btn-container'>
        <button type="submit" className='button'>Register</button>
        </div> 
        <p className='option'> Do have an account? <Link to='/login'>login</Link></p>
      </form>
    </div>
  );
};

export default RegistrationForm;

