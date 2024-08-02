import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [token, setToken] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(function() {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuth(true);
    } else {
      if (location.pathname !== '/register') {
        navigate('/register');
      }
    }
  }, [token, navigate]);

  function ProtectedRoute({ isAuthenticated, children }) {
    return isAuthenticated ? children : null;
  }

  return (
    <div>
      <Routes>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route
          path='/'
          element={
            <ProtectedRoute isAuthenticated={isAuth}>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
        <Route path='*' element={<ErrorPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
