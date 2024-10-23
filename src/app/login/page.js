"use client"; // Ensure the component is a client component for Next.js 13+

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password });
        localStorage.setItem('token', res.data.token); // Store JWT in localStorage
        setError('');
        router.push('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="forgot-password">
          <a href="/register">New User ? Register here </a>
        </p>
      </div>

      {/* Basic Styles for Login Form */}
      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f0f2f5;
        }
        .login-box {
          background: #fff;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          width: 400px;
        }
        .login-box h2 {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .input-group {
          margin-bottom: 1rem;
        }
        .input-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 14px;
          color: #333;
        }
        .input-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .login-btn {
          width: 100%;
          padding: 10px;
          background-color: #0070f3;
          border: none;
          border-radius: 4px;
          color: #fff;
          cursor: pointer;
          font-size: 16px;
        }
        .login-btn:hover {
          background-color: #005bb5;
        }
        .forgot-password {
          text-align: center;
          margin-top: 1rem;
        }
        .forgot-password a {
          color: #0070f3;
          text-decoration: none;
        }
        .forgot-password a:hover {
          text-decoration: underline;
        }
        .error {
          color: red;
          font-size: 14px;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
}
