import React from 'react';
import PricingCard from './PricingCard';

const PlansSection = () => {
  const plans = [
    {
      name: 'Basic',
      price: 9.99,
      description: 'Perfect for casual viewers',
      features: [
        'HD available',
        'Watch on 1 device at a time',
        'Limited content access'
      ]
    },
    {
      name: 'Standard',
      price: 14.99,
      description: 'Great for families',
      features: [
        'Full HD available',
        'Watch on 2 devices at a time',
        'Full content access'
      ]
    },
    {
      name: 'Premium',
      price: 19.99,
      description: 'The ultimate experience',
      features: [
        'Ultra HD available',
        'Watch on 4 devices at a time',
        'Full content access',
        'Early access to new releases'
      ]
    }
  ];

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-12">Choose Your Plan</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlansSection;