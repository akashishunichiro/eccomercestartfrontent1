import React, { useEffect, useState } from "react";
import API from "../api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const token = localStorage.getItem("access_token");
        const response = await API.post(
          "/orders/",
          { product_id: productId, quantity: 1 },  // Change 'product' to 'product_id'
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrderStatus("Order placed successfully. Proceed to checkout.");
      } catch (error) {
        console.error("Failed to place order", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Your Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Product: {order.product.name} | Status: {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;
