import React, { useState } from 'react';
import API from '../api';

function PromoCode() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const applyPromoCode = async () => {
    try {
      const response = await API.post('/promocode/', { code });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Invalid promo code');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Apply Promo Code</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter promo code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={applyPromoCode}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Apply
        </button>
      </div>
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {message}
        </div>
      )}
    </div>
  );
}

export default PromoCode;
