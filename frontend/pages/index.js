import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Header from '../components/Header';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
    <Header/>
    <div className="login-container">
  <h2>Login</h2>
  <form onSubmit={handleLogin}>
    <div className="form-group">
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    </div>
    <div className="form-group">
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    </div>
    <button type="submit" className="login-btn">Login</button>
  </form>
  <p className="register-text">
    Don't have an account? <a href="/register">Register Here</a>
  </p>
</div>

    </>
    
  );
}
