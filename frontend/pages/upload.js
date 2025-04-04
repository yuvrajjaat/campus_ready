import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '../components/Header';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [xmlPreview, setXmlPreview] = useState('');
  const [pdfPreview, setPdfPreview] = useState('');
  const router = useRouter();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a PDF file.');
    const formData = new FormData();
    formData.append('pdf', file);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/conversions/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      // Set previews after conversion
      setXmlPreview(res.data.conversion.xmlContent);
      // For PDF preview, create a URL from the file
      setPdfPreview(URL.createObjectURL(file));
    } catch (error) {
      alert('Error during conversion');
    }
  };

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
    <h2>Upload PDF and Convert to XML</h2>
    <form onSubmit={handleUpload} className="upload-form">
      <input type="file" accept="application/pdf" onChange={handleFileChange} required />
      <button type="submit" className="upload-btn">Convert</button>
    </form>

    {pdfPreview && (
      <div className="preview-section">
        <h3>PDF Preview</h3>
        <iframe src={pdfPreview} width="100%" height="400px"></iframe>
      </div>
    )}

    {xmlPreview && (
      <div className="preview-section">
        <h3>XML Preview</h3>
        <textarea value={xmlPreview} readOnly rows="10" className="xml-textarea"></textarea>
        <div className="button-group">
          <button
            onClick={() => {
              navigator.clipboard.writeText(xmlPreview);
              alert('XML copied to clipboard');
            }}
            className="copy-btn"
          >
            Copy XML
          </button>
          <a
            href={`data:text/xml;charset=utf-8,${encodeURIComponent(xmlPreview)}`}
            download="converted.xml"
          >
            <button className="download-btn">Download XML</button>
          </a>
        </div>
      </div>
    )}
  </div>
</div>
</>
  );
}
