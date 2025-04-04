import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Header from '../components/Header';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { email, password });
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
    <Header/>
    <div className="register-container">
  <h2>Register</h2>
  <form onSubmit={handleRegister}>
    <div className="form-group">
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    </div>
    <div className="form-group">
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    </div>
    <button type="submit" className="register-btn">Register</button>
  </form>
  <p className="login-text">
    Already have an account? <a href="/">Login Here</a>
  </p>
</div>
    </>
    

  );
}
