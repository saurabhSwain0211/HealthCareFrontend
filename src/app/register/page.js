"use client"; 

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    setSuccess('');

    // Simple front-end validation
    if (!name || !email || !password || age <= 0) {
      setError('All fields are required and age must be a positive number.');
      return;
    }

    try {
      // Make POST request to backend API
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        name,
        email,
        password,
        age,
      });

      setSuccess('Registration successful! Redirecting to login...');
      setError('');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.msg || 'Error during registration.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              placeholder="Enter your full name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          {/* Email Input */}
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
          {/* Password Input */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter a secure password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          {/* Age Input */}
          <div className="input-group">
            <label htmlFor="age">Age</label>
            <input 
              type="number" 
              id="age" 
              placeholder="Enter your age" 
              value={age} 
              onChange={(e) => setAge(Number(e.target.value))} 
              required 
            />
          </div>

          {/* Display success or error messages */}
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          {/* Submit Button */}
          <button type="submit" className="register-btn">Register</button>
        </form>
        <p className="already-member">
          Already a member? <a href="/login">Login here</a>
        </p>
      </div>

      <style jsx>{`
        .register-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f0f2f5;
        }
        .register-box {
          background: #fff;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          width: 400px;
        }
        .register-box h2 {
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
        .register-btn {
          width: 100%;
          padding: 10px;
          background-color: #0070f3;
          border: none;
          border-radius: 4px;
          color: #fff;
          cursor: pointer;
          font-size: 16px;
        }
        .register-btn:hover {
          background-color: #005bb5;
        }
        .already-member {
          text-align: center;
          margin-top: 1rem;
        }
        .already-member a {
          color: #0070f3;
          text-decoration: none;
        }
        .already-member a:hover {
          text-decoration: underline;
        }
        .error {
          color: red;
          font-size: 14px;
          margin-bottom: 1rem;
        }
        .success {
          color: green;
          font-size: 14px;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
}
