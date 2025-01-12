import React from 'react';
import { useLocation } from 'react-router-dom';

function OrderDetails() {
  const location = useLocation();
  console.log(location);
  
  const { orderId, productName, quantity } = location.state || {};

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      {orderId ? (
        <div>
          <p>Order ID: {orderId}</p>
          <p>Product Name: {productName}</p>
          <p>Quantity: {quantity}</p>
        </div>
      ) : (
        <p>No order details available.</p>
      )}
    </div>
  );
}

export default OrderDetails;
