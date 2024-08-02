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

  function ProtectedRoute({ isAuthenticated, children }) {
    if (!isAuthenticated) {
      navigate('/login');
    }

    return children;
  }

  useEffect(function() {
    if(localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }
  }, [])

  useEffect(function() {
    if (!isAuth && location.pathname != '/register') {
      navigate('/register')
    }
  }, [token, navigate])

  useEffect(function() {
    setIsAuth(token ? true : false)
  }, [token])

  return (
    <div>
      <Routes>
      <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>

        <Route
          path='/'
          element={
            <ProtectedRoute isAuthenticated={isAuth}>
              <Home></Home>
            </ProtectedRoute>
          }
        ></Route>

        <Route path='*' element={<ErrorPage></ErrorPage>}></Route>
      </Routes>
    </div>
  );
}

export default App;
