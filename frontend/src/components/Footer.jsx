import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Coffee, Mail, Info } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-primary-100 text-gray-600">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 text-primary-600 text-xl font-bold mb-4">
              <Home className="w-5 h-5" />
              <span>AI Room Design Generator</span>
            </Link>
            <p className="text-gray-500 mb-4">
              Transform your living spaces without renovation using our free AI-powered room design generator. Upload a photo and see your room with new styles and designs in seconds.
            </p>
          </div>
          
          <div>
            <h3 className="text-gray-800 text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-primary-600 transition-colors flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-500 hover:text-primary-600 transition-colors flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-500 hover:text-primary-600 transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-800 text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-500 mb-2">
              Have questions or feedback about our free AI Room Design Generator?
            </p>
            <Link to="/contact" className="text-primary-600 hover:text-primary-700 transition-colors">
              Send us a message
            </Link>
          </div>
        </div>
        
        <div className="border-t border-primary-100 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} AI Room Design Generator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

