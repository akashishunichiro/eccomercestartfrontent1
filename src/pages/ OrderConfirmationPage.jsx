import React from "react";

const OrderConfirmationPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.header}>🎉 Thank You for Your Purchase!</h1>
        <p style={styles.message}>
          Your order has been successfully processed.
        </p>
        <p style={styles.footer}>
          You will receive a confirmation email shortly.
        </p>
        <button style={styles.button} onClick={() => window.location.href = "/"}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    textAlign: "center",
    padding: "40px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    width: "100%",
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  message: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "10px",
  },
  footer: {
    fontSize: "14px",
    color: "#777",
    marginBottom: "30px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default OrderConfirmationPage;
