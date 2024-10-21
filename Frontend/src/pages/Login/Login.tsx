
import React, { useState } from 'react';
import axios from 'axios'; 
import { LogIn, Eye, EyeOff, Mail, Lock, User2Icon } from "lucide-react";
import './Login.css';
import { useLogin } from "@refinedev/core"; 

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { mutate: login } = useLogin(); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        username,
        password
      });
      alert(response.data.message)
      console.log('Login successful:', response.data);
      localStorage.setItem("login", response.data.login);
      localStorage.setItem("token", response.data.token);

     
      await login({ username, password }); 

    }
    //  catch (error: any) {
    //   console.error('Login failed:', error.response?.data || error.message);
    //   setError("Invalid username or password. Please try again.");
    // }
    catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Network error or Server Error");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <User2Icon className="w-16 h-16 mx-auto text-white"  data-testid="title-icon" />
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Sign in to your secure account</p>
        </div>
        <form onSubmit={handleLogin} data-testid="form-test">
          <div className="input-group">
            <Mail className="input-icon" data-testid="mail-icon" />
            <input
              type="text"
              className="input-field"
              id='username'
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <Lock className="input-icon" data-testid="password-icon"/>
            <input
              type={showPassword ? "text" : "password"}
              className="input-field"
              id='password'
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              data-testid="toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1} 
              aria-label={showPassword ? "Hide password" : "Show password"} 
            >
              {showPassword ? <EyeOff  /> : <Eye />}
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button"  data-testid="login-btn"
          >
            <LogIn data-testid="login-icon"/>
            Login
          </button>
          <p style={{ color: "white", textDecoration: "none", fontWeight: "lighter", fontSize: "13px" }}>Don't have an Account?  <a style={{fontSize:"14px",fontWeight:"bold", color:"DodgerBlue", textDecoration: "underline DodgerBlue" }}  href="/signup"> Click here</a>&nbsp;to signup</p>
        </form>
        <div className="divider">
          <span className="divider-text">Or continue with</span>
        </div>
        <div className="social-buttons">
          <button className="social-button" data-testid="google-btn">
            Google Account
          </button>
        </div>
      </div>
      {/* <img src={LoginImage} alt="Login" className="right-image" /> */}
    </div>
  );
};

export default Login;
