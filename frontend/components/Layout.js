// frontend/components/Layout.js
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">PDF-to-XML Converter</h1>
      </header>
      <div className="flex flex-1">
        <nav className="w-64 bg-gray-100 p-4 border-r">
          <ul>
            <li className="mb-2">
              <Link href="/dashboard">
                <a className="hover:text-blue-600">Dashboard</a>
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/upload">
                <a className="hover:text-blue-600">Upload PDF</a>
              </Link>
            </li>
            {/* Add additional menu items as needed */}
          </ul>
        </nav>
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
      <footer className="bg-gray-800 text-white text-center p-4">
        © {new Date().getFullYear()} PDF-to-XML Converter
      </footer>
    </div>
  );
}
