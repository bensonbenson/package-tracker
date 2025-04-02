import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import '../styles/Login.css';

const Login = () => {
  const [password, setPassword] = useState('');
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLogin = (event) => {
    event.preventDefault();

    const success = login(password);
    if (!success) {
      setIsPasswordInvalid(true);
    }
  };

  return (
    <div className="centerLogin">
      <form onSubmit={handleLogin}>
        <h1>Please sign in</h1>
        <div>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
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
