'use client';

import { useState } from 'react';

interface DeliverySelectorProps {
  onSelect: (delivery: string) => void;
}

export default function DeliverySelector({ onSelect }: DeliverySelectorProps) {
  const [selected, setSelected] = useState('safeboda');

  const deliveryOptions = [
    { id: 'safeboda', name: 'SafeBoda', icon: '🚲', fee: 'UGX 5,000' },
    { id: 'faras', name: 'Faras', icon: '🚗', fee: 'UGX 8,000' },
    { id: 'pickup', name: 'Pick Up', icon: '🏪', fee: 'Free' },
  ];

  const handleSelect = (id: string) => {
    setSelected(id);
    onSelect(id);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800">Choose Delivery Method</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {deliveryOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition transform hover:scale-105 ${
              selected === option.id
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-300 bg-white hover:border-orange-400'
            }`}
          >
            <div className="text-4xl mb-2">{option.icon}</div>
            <h4 className="font-bold text-lg text-gray-800">{option.name}</h4>
            <p className="text-orange-600 font-semibold">{option.fee}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
