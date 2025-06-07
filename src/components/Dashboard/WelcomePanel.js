import React from 'react';

const WelcomePanel = ({ onShowLogin, onShowSignup }) => {
  return (
    <div className="bg-gradient-to-r from-purple-900 to-gray-900 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Logo grande y centrado */}
        <div className="flex justify-center mb-6">
          <img 
            src="/image/brand-stream.png"
            alt="Brand Logo" 
            className="h-32 w-auto sm:h-40 md:h-52"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Welcome to Brandbold Entertainment
        </h1>
        <p className="text-lg md:text-xl text-purple-200 mb-8">
          Your premium destination for unlimited movies, TV shows, and exclusive content.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Tarjetas informativas aquí */}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={onShowLogin}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300"
          >
            Sign In
          </button>
          <button
            onClick={onShowSignup}
            className="bg-transparent hover:bg-purple-800 text-purple-400 font-bold py-3 px-6 rounded-full text-lg border-2 border-purple-500 transition duration-300"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePanel;
