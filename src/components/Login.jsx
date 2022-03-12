import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { authPassword } from '../password';
import '../styles/Login.css';

const Login = () => {
  const [password, setPassword] = useState('');
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

  const handlePasswordFormChange = (event) => {
    let newPass = event.target.value;
    setPassword(newPass);
  };

  const handleLogin = (event) => {
    if (password === authPassword.password) {
      localStorage.setItem('packagetracker', 'token');
      window.location.reload();
    } else {
      setIsPasswordInvalid(true);
      event.preventDefault();
    }
  };

  if (localStorage.getItem('packagetracker') === 'token') {
    return <Redirect to="/" />;
  }

  return (
    <div className="centerLogin">
      <form onSubmit={handleLogin}>
        <h1>Please sign in</h1>
        <div>
          <input
            type="password"
            name="password"
            onChange={handlePasswordFormChange}
          />
          <input type="submit" value="Submit" />
        </div>
      </form>
      {isPasswordInvalid && (
        <p className="passwordIncorrect">password incorrect</p>
      )}
    </div>
  );
};

export default Login;
