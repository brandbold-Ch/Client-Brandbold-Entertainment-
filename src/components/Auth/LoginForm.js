import React, { useState } from 'react';
import { loginUser } from '../../utils/api'; // Asegúrate de que esta función esté bien implementada

const LoginForm = ({ onLogin, onSwitchToSignup, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginUser({ username, password });

      // Puedes guardar el token o usuario según lo que devuelva el backend
      console.log('Inicio de sesión exitoso:', response);

      alert('Inicio de sesión exitoso');
      if (onLogin) onLogin(response); // Llama callback si existe
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Email o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
      <button 
        onClick={onBack}
        className="flex items-center text-purple-400 hover:text-purple-300 mb-4 transition"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Welcome
      </button>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-purple-500">Sign In</h2>
        <p className="text-white mt-2">to Brandbold Entertainment</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-3 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            id="username"
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-3 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none transition duration-300 mb-4 disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        <p className="text-center text-gray-400">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-purple-400 hover:text-purple-300 font-medium"
          >
            Create one
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
