import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import PromoCode from "./pages/PromoCode";
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderDetails from './pages/OrderDetails';
import ProductDetail from './pages/ProductDetail';
import FakePaymentPage from "./pages/FakePaymentPage";
import OrderConfirmationPage from "./pages/ OrderConfirmationPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />}  />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/promo" element={<PromoCode />} />
        <Route path="/fake-payment" element={<FakePaymentPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
