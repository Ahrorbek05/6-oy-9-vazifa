import React, { useRef, useState } from 'react';
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    setLoading(true); 
    fetch("https://auth-rg69.onrender.com/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.message === "User Not Found!") {
        alert(data.message);
        usernameRef.current.focus();
        return;
      }

      if (data.message === "Invalid password!") {
        alert(data.message);
        passwordRef.current.focus();
        return;
      }

      if (data.accessToken) {
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', data.accessToken);
        navigate('/');
      }
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
  }

  return (
    <div className={styles.LoginCard}>
      <h1>Login</h1>
      <form>
        <input ref={usernameRef} type="text" placeholder='Foydalanuvchi nomi'/>
        <input ref={passwordRef} type="password" placeholder='Parolni kiriting!'/>
        {
          loading ? (
            <button className={styles.submit} disabled>Loading...</button>
          ) : (
            <button className={styles.submit} onClick={handleSubmit}>Submit</button>
          )
        }
      </form>
    </div>
  );
}

export default Login;
