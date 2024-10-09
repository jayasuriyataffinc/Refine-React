
import React, { useState } from 'react';
import { LogIn, Eye, EyeOff, Mail, Lock, UserPlus } from "lucide-react";
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); 

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/api/signup', {
        username,
        email,
        password,
      });

      if (res.data.signup) {
        navigate('/'); 
      }
      
    } catch (error: any) {
      setError("Error creating account. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <UserPlus className="w-16 h-16 mx-auto text-white" />
          <h2 className="login-title">Create Account</h2>
          <p className="login-subtitle">Sign up for a new account</p>
        </div>
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <Mail className="input-icon" />
            <input
              type="text"
              className="input-field"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <Mail className="input-icon" />
            <input
              type="email"
              className="input-field"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <Lock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <div className="input-group">
            <Lock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              className="input-field"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">
            <LogIn />
            Sign up
          </button>
          <a style={{ color: "white", textDecoration: "none", fontWeight: "lighter", fontSize: "13px" }} href="/">
            You have an account <span><u>Login here</u></span>
          </a>
        </form>
        <div className="divider">
          <span className="divider-text">Or continue with</span>
        </div>
        <div className="social-buttons">
          <button className="social-button">
            Google Account
          </button>
        </div>
      </div>
      {/* <img src={LoginImage} alt="Signup" className="right-image" /> */}
    </div>
  );
};

export default Signup;
