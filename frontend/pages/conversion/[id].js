import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '../../components/Header';

export default function ConversionDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [conversion, setConversion] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchConversion = async () => {
        try {
          const token = localStorage.getItem('token');
          const res = await axios.get(`http://localhost:5000/api/conversions/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setConversion(res.data.conversion);
        } catch (error) {
          alert('Error fetching conversion');
        }
      };
      fetchConversion();
    }
  }, [id]);

  if (!conversion) return <p>Loading...</p>;

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
    <h2>{conversion.originalFileName}</h2>

    <div className="preview-section">
      <h3>XML Content</h3>
      <textarea
        value={conversion.xmlContent}
        readOnly
        rows="12"
        className="xml-textarea"
      ></textarea>
    </div>

    <div className="preview-section">
      <h3>Original PDF</h3>
      <p><strong>PDF Path:</strong> {conversion.pdfPath}</p>
      <p className="sub-text">You can download it via your dashboard if needed.</p>
    </div>
  </div>
</div>
    </>
    

  );
}
