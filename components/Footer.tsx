import React from "react";
import { Zap, Users, BarChart3, MessageSquare, Clock } from "lucide-react";
const Footer = () => {
  return (
    <div>
      <footer className="mt-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
        </div>

        <div className="relative z-10">
          {/* Main Footer Content */}
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                    WhatsApp Pro
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Professional WhatsApp messaging solutions for businesses of
                    all sizes. Scale your customer engagement with our reliable
                    API services.
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4">
                  <a
                    className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-110"
                    href="#"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </a>
                  <a
                    className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-110"
                    href="#"
                  >
                    <Users className="w-5 h-5" />
                  </a>
                  <a
                    className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-110"
                    href="#"
                  >
                    <BarChart3 className="w-5 h-5" />
                  </a>
                  <a
                    className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-110"
                    href="#"
                  >
                    <Zap className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-xl font-semibold mb-6 text-white">
                  Services
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                      href="#"
                    >
                      WhatsApp API Setup
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                      href="#"
                    >
                      Bulk Messaging
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                      href="#"
                    >
                      Campaign Management
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                      href="#"
                    >
                      Analytics & Reports
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                      href="#"
                    >
                      24/7 Support
                    </a>
                  </li>
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-xl font-semibold mb-6 text-white">
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  <li>
	                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                      href="#"
                    >
                      Pricing Plans
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                      href="#"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                      href="#"
                    >
                      API Reference
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                      href="#"
                    >
                      Case Studies
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                      href="#"
                    >
                      Blog
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact & Addresses */}
              <div>
                <h4 className="text-xl font-semibold mb-6 text-white">
                  Contact Us
                </h4>
                <div className="space-y-4">
                  {/* Head Office */}
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <h5 className="font-semibold text-blue-400 mb-2">
                      🏢 Head Office
                    </h5>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Level 12, Tech Tower
                      <br />
                      Silicon Valley, CA 94025
                      <br />
                      United States
                    </p>
                  </div>

                  {/* Regional Office */}
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <h5 className="font-semibold text-green-400 mb-2">
                      🌍 Regional Office
                    </h5>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Business Bay, Floor 15
                      <br />
                      Dubai, UAE 00000
                      <br />
                      Middle East & Africa
                    </p>
                  </div>

                  {/* Support Center */}
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <h5 className="font-semibold text-purple-400 mb-2">
                      🎧 Support Center
                    </h5>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Tech Hub, 3rd Floor
                      <br />
                      Bangalore, KA 560001
                      <br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Bar */}
          <div className="border-t border-white/10 bg-black/20">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <div className="bg-blue-500/20 p-2 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">WhatsApp Support</p>
                    <p className="text-white font-semibold">
                      +1 (555) 123-WHATS
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <div className="bg-green-500/20 p-2 rounded-lg">
                    <Zap className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Email Support</p>
                    <p className="text-white font-semibold">
                      support@whatsapp-pro.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <div className="bg-purple-500/20 p-2 rounded-lg">
                    <Clock className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Available 24/7</p>
                    <p className="text-white font-semibold">Instant Setup</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-center md:text-left">
                  <p className="text-gray-400 text-sm">
                    © 2025 WhatsApp Pro. All rights reserved. |
                    <span className="text-blue-400 hover:text-blue-300 cursor-pointer">
                      {" "}
                      Privacy Policy
                    </span>{" "}
                    |
                    <span className="text-blue-400 hover:text-blue-300 cursor-pointer">
                      {" "}
                      Terms of Service
                    </span>
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 text-sm font-medium">
                      All Systems Operational
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
