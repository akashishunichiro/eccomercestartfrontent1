import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import "./CartPage.css"; // Import CSS styles

const CartPage = () => {
  const [cart, setCart] = useState([]); // Store cart data
  const [error, setError] = useState(null); // Store error messages
  const [loading, setLoading] = useState(true); // Handle loading state
  const navigate = useNavigate(); // Navigation function

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
          throw new Error("You must be logged in to access the cart.");
        }

        const response = await fetch("https://starseccomerce.pythonanywhere.com/api/cart/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 401) {
          localStorage.removeItem("access_token");
          navigate("/login");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch cart data. Please try again later.");
        }

        const data = await response.json();
        setCart(data.orders || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  const handleRemoveItem = async (productId) => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`https://starseccomerce.pythonanywhere.com/api/cart/${productId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove product from cart.");
      }

      setCart(cart.filter((item) => item.id !== productId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleProceedToCheckout = () => {
    navigate("/fake-payment");
  };

  if (loading) {
    return <div className="loading">Loading your cart...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  const totalAmount = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is currently empty.</p>
          <button
            className="continue-shopping-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.id}>
                  <td>
                    {product.product_name}
                    <br />
                    <span className="cart-item-details">
                      Color: {product.color}, Size: {product.size}
                    </span>
                  </td>
                  ${Number(product.price || 0).toFixed(2)}
                  <td>{product.quantity}</td>
                  <td>${(product.price * product.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(product.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <h2>Cart Summary</h2>
            <p>
              <strong>Total:</strong> ${totalAmount.toFixed(2)}
            </p>
            <button
              className="checkout-btn"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
