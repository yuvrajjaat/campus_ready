import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Header from '../components/Header';

export default function Dashboard() {
  const [conversions, setConversions] = useState([]);

  useEffect(() => {
    const fetchConversions = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/conversions', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setConversions(res.data.conversions);
      } catch (error) {
        alert('Error fetching conversions');
      }
    };
    fetchConversions();
  }, []);

  return (
    <>
    <Header/>
    <div className="dashboard-container">
  {/* Sidebar Navigation */}
  <div className="sidebar">
    <h3>Menu</h3>
    <ul>
      <li><Link href="/dashboard" legacyBehavior><a>Dashboard</a></Link></li>
      <li><Link href="/upload" legacyBehavior><a>Upload PDF</a></Link></li>
    </ul>
  </div>

  {/* Main Content */}
  <div className="main-content">
    <h2>Your Conversions</h2>
    {conversions.length === 0 ? (
      <p>No conversions yet.</p>
    ) : (
      <ul className="conversion-list">
        {conversions.map(conv => (
          <li key={conv._id}>
            <Link href={`/conversion/${conv._id}`} legacyBehavior>
              <a>{conv.originalFileName} - {new Date(conv.createdAt).toLocaleString()}</a>
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
</div>
</>

  );
}
