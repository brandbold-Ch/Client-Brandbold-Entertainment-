import React from 'react';

const PricingCard = ({ plan }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:scale-105">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white">{plan.name}</h3>
        <p className="text-purple-300 mt-2">{plan.description}</p>
      </div>
      <div className="text-center mb-6">
        <span className="text-4xl font-bold text-white">${plan.price}</span>
        <span className="text-gray-400">/month</span>
      </div>
      <ul className="mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="text-gray-300 mb-2 flex items-center">
            <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300">
        Choose Plan
      </button>
    </div>
  );
};

export default PricingCard;