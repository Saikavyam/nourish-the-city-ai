
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center">
              <div className="h-8 w-8 mr-2 rounded-md bg-zerowaste flex items-center justify-center">
                <span className="text-white font-bold text-xl">Z</span>
              </div>
              <span className="text-xl font-bold text-zerowaste-600">ZeroWaste</span>
            </Link>
            <p className="mt-4 text-gray-600">
              Minimizing food waste through technology and community action.
            </p>
            <div className="flex mt-6 space-x-4">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-zerowaste-500 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-zerowaste-500 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-zerowaste-500 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="mailto:info@zerowaste.org" 
                className="text-gray-400 hover:text-zerowaste-500 transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-zerowaste-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/map" className="text-gray-600 hover:text-zerowaste-500 transition-colors">
                  Map View
                </Link>
              </li>
              <li>
                <Link to="/donation/new" className="text-gray-600 hover:text-zerowaste-500 transition-colors">
                  Donate Food
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-gray-600 hover:text-zerowaste-500 transition-colors">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-zerowaste-500 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-zerowaste-500 transition-colors">
                  Food Safety Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-zerowaste-500 transition-colors">
                  For Businesses
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-zerowaste-500 transition-colors">
                  For NGOs
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Contact Us</h3>
            <address className="text-gray-600 not-italic">
              <p>123 Green Street</p>
              <p>Sustainable City, 10001</p>
              <p className="mt-3">Phone: +1 (555) 123-4567</p>
              <p>Email: info@zerowaste.org</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} ZeroWaste. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-zerowaste-500 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-zerowaste-500 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-zerowaste-500 text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
