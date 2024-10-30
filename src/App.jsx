import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import Login from './Client/Login';
import RegistrationForm from './Client/Register';
import NotFound from './Client/Not found';
import Welcome from './Client/Welcome';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route path="/register" element={<RegistrationForm />} />
        <Route
          path="/welcome"
          element={isLoggedIn ? <Welcome /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
