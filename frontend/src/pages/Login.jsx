
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/Login.css"; 

export default function Login() {
  const { setIsLogin, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      let res = await axios.post("https://saasnotes.onrender.com/auth/login", {
        email,
        password,
      });
      if (!res.data.token) return alert("Token not present");

      localStorage.setItem("token", res.data.token);
      let user = res.data.user;
      setUser(user);
      setIsLogin(true);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="login-container">
    
      <div className="welcome-section">
        <h1>Welcome Back </h1>
        <p>
          We’re excited to have you here.  
          Sign in to access your notes, manage your team, and stay productive.
        </p>
      </div>

     
      <div className="form-section">
        <h2>Sign In</h2>
        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        <p className="footer-text">
          By signing in, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
