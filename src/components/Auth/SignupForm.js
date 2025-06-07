import React, { useState, useEffect } from 'react';
import { signupUser } from '../../utils/api'; // tu función API

const SignupForm = ({ onSwitchToLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [loading, setLoading] = useState(false);

  const [deviceInfo, setDeviceInfo] = useState({
    device_brand: '',
    device_model: '',
    ip_address: '',
  });

  useEffect(() => {
    const userAgent = navigator.userAgent;

    let device_brand = 'Unknown';
    let device_model = userAgent;

    if (/iPhone/.test(userAgent)) {
      device_brand = 'Apple';
      device_model = 'iPhone';
    } else if (/iPad/.test(userAgent)) {
      device_brand = 'Apple';
      device_model = 'iPad';
    } else if (/Android/.test(userAgent)) {
      device_brand = 'Android';
      const match = userAgent.match(/Android.*;\s*(.+?)\s*Build/);
      device_model = match ? match[1] : 'Android Device';
    } else if (/Windows/.test(userAgent)) {
      device_brand = 'Windows';
      device_model = 'PC';
    } else if (/Macintosh/.test(userAgent)) {
      device_brand = 'Apple';
      device_model = 'Mac';
    }

    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => {
        setDeviceInfo({
          device_brand,
          device_model,
          ip_address: data.ip,
        });
      })
      .catch(err => {
        console.error('Error al obtener IP:', err);
        setDeviceInfo({
          device_brand,
          device_model,
          ip_address: '0.0.0.0',
        });
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const signupData = {
      user: {
        first_name: firstName,
        last_name: lastName,
        birth_date: birthDate
      },
      auth: {
        email,
        username,
        password,
      },
      device: deviceInfo,
    };

    try {
      const response = await signupUser(signupData);
      alert('Cuenta creada exitosamente. Ahora inicia sesión.');
      if (onSwitchToLogin) onSwitchToLogin();
    } catch (error) {
      console.error(error);
      alert('Hubo un error al crear la cuenta. Por favor verifica los datos.');
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
        <h2 className="text-3xl font-bold text-purple-500">Create Account</h2>
        <p className="text-white mt-2">to Brandbold Entertainment</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">First Name</label>
          <input
            className="w-full px-3 py-2 bg-gray-800 text-white rounded focus:ring-2 focus:ring-purple-500"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">Last Name</label>
          <input
            className="w-full px-3 py-2 bg-gray-800 text-white rounded focus:ring-2 focus:ring-purple-500"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">Birth Date</label>
          <input
            className="w-full px-3 py-2 bg-gray-800 text-white rounded focus:ring-2 focus:ring-purple-500"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">Username</label>
          <input
            className="w-full px-3 py-2 bg-gray-800 text-white rounded focus:ring-2 focus:ring-purple-500"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">Email</label>
          <input
            className="w-full px-3 py-2 bg-gray-800 text-white rounded focus:ring-2 focus:ring-purple-500"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2">Password</label>
          <input
            className="w-full px-3 py-2 bg-gray-800 text-white rounded focus:ring-2 focus:ring-purple-500"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition mb-4 disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>

        <p className="text-center text-gray-400">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-purple-400 hover:text-purple-300 font-medium"
          >
            Sign in
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
