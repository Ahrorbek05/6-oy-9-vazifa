import React, { useRef } from 'react'
import styles from './index.module.css'
import { useNavigate } from 'react-router-dom';

function register() {
    const usernameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const rePasswordRef = useRef('');
    const navigate = useNavigate();

    function validate(username, email, password, rePassword){
        if(username.current.value.length < 3){
            alert('username is not valid');
            username.current.focus();
            username.current.style.outlineColor = 'red'
            return false;
        }

        if(email.current.value.length < 3){
            alert('email is not valid')
            email.current.focus();
            email.current.style.outlineColor = 'red';
            return false;
        }

        if(password.current.value.length < 3){
            alert('password is not valid');
            password.current.focus();
            password.current.style.outlineColor = 'red';
            return false;
        }

        if(rePassword.current.value.length < 3){
            alert('rePassword is not valid');
            password.current.focus();
            password.current.style.outlineColor = 'red';
            return false;
        }

        if(password.current.value != rePassword.current.value){
            alert('password and rePassword is not the same!');
            rePassword.current.value = ''
            password.current.focus();
            return false;
        }


        return true;
    }

    function handleSubmit(event){
        event.preventDefault();
        const isValid = validate(usernameRef, emailRef, passwordRef, rePasswordRef);
    if (!isValid) {
      return;
    }

    const user = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    fetch("https://auth-rg69.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((reps) => reps.json())
      .then((data) => {
        if (data.message == "User registered successfully!") {
          navigate("/login");
        }

        if (data.message == "Failed! Username is already in use!") {
          alert(data.message);
          usernameRef.current.focus();
          usernameRef.current.value = '';
          return;
        }

        if (data.message == "Failed! Email is already in use!") {
          alert(data.message);
          usernameRef.current.focus();
          usernameRef.current.value = '';
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }

    return (
        <div className={styles.card}>
            <h1>REGISTRATION</h1>
            <form>
                <input ref={usernameRef} type="text" name='user' placeholder='Foydalanuvchi nomini kiriting!'/>
                <input ref={emailRef} type="email" placeholder='Emailingizni kiriting!' />
                <input ref={passwordRef} type="password" placeholder='Parol kiriting!'/>
                <input ref={rePasswordRef} type="password" placeholder='Parolni qayta kiriting!'/>
                <button onClick={handleSubmit} className={styles.submit} type="submit">Submit</button>
            </form>
        </div>
    )
}

export default register
