import React from 'react';

const Navbar = ({ onLogout, setCurrentView }) => {
  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-3">
<img src="/image/brand-stream.png" alt="Company Logo" className="h-20 w-auto -mt-2"/>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-4">
          <button
            onClick={() => setCurrentView('home')}
            className="text-white font-medium px-4 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition duration-200"
          >
            Home
          </button>
          <button
            onClick={() => setCurrentView('movies')}
            className="text-white font-medium px-4 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition duration-200"
          >
            Movies
          </button>
          <button
            onClick={() => setCurrentView('plans')}
            className="text-white font-medium px-4 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition duration-200"
          >
            Plans
          </button>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={onLogout}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition duration-200"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
