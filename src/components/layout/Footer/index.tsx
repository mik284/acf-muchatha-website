"use client";

import Link from 'next/link';
import { 
  FaFacebook, 
  FaYoutube, 
  FaInstagram, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock 
} from 'react-icons/fa';

interface NavLink {
  name: string;
  href: string;
}

interface ContactInfo {
  icon: React.ReactNode;
  text: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const quickLinks: NavLink[] = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Sermons', href: '/sermons' },
    { name: 'Events', href: '/events' },
    { name: 'Ministries', href: '/ministries' },
  ];

  const contactInfo: ContactInfo[] = [
    { 
      icon: <FaMapMarkerAlt className="text-primary-600" />, 
      text: 'Muchatha, Nairobi, Kenya' 
    },
    { 
      icon: <FaPhone className="text-primary-600" />, 
      text: '+254 7XX XXX XXX' 
    },
    { 
      icon: <FaEnvelope className="text-primary-600" />, 
      text: 'info@afcmuchatha.org' 
    },
    { 
      icon: <FaClock className="text-primary-600" />, 
      text: 'Sundays: 9:00 AM - 12:00 PM' 
    },
  ];

  const socialLinks: SocialLink[] = [
    { 
      icon: <FaFacebook size={20} />, 
      href: '#' 
    },
    { 
      icon: <FaYoutube size={20} />, 
      href: '#' 
    },
    { 
      icon: <FaInstagram size={20} />, 
      href: '#' 
    },
  ];

  return (
    <footer className="bg-neutral-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-neutral-400 mb-4">
              Ambassadors For Christ Fellowship is a vibrant community of believers in Muchatha, Nairobi, 
              committed to spreading the Gospel and making disciples.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="mt-1">{item.icon}</span>
                  <span className="text-neutral-400">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-neutral-800 hover:bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-md focus:outline-none text-gray-900 w-full"
                />
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-r-md transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-800 pt-6 text-center text-neutral-500">
          <p>© {currentYear} Ambassadors For Christ Fellowship - Muchatha. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
