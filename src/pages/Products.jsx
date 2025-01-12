import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { FaStar, FaShoppingCart, FaUser } from 'react-icons/fa';
import './TechStore.css';

function TechStore() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState(''); // Added search query state
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get('/products/');
        setProducts(response.data);

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(response.data.map((product) => product.category_name)),
          console.log(response.data)
        ];
        setCategories(['All', ...uniqueCategories]);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on selected category and search query
  const filteredProducts = products
    .filter((product) => selectedCategory === 'All' || product.category_name === selectedCategory)
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) // Optional: filter by description as well
    );

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-bottom">
        <div className="header-container">
          <a href="/" className="logo">
            TechStore
          </a>
          <div className="header-right">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search products..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Handle search input changes
              />
            </div>
            <button className="icon-button"><a href='/cart'>
              <FaShoppingCart />
              </a>
            </button>
          </div>
        </div>
      </header>

      <main className="main-container">
        {/* Category Tabs */}
        <div className="tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={`tab-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Canon Camera</h1>
            <p className="hero-description">Best deals on photography gear</p>
            <button className="primary-button">Shop Now</button>
          </div>
          <div className="hero-image">
            <img
              src="data:image/jpeg;base64,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" // Replace with actual image
              alt="Hero"
            />
          </div>
        </section>

        {/* Popular Products */}
        <div className="mashit-container">
      <section className="popular-products">
        <h2 className="section-title">Popular Products</h2>
        <div className="product-grid grid grid-cols-4 w-full mb-[20px] max-md:grid-cols-2" >
          {filteredProducts.slice(0, 8).map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="product-details">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-price">
                  ${Number(product.price).toFixed(2)}
                </p>
                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="view-details-btn"
                >
                  View Details
                </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        </div>

        {/* Promo Banner */}
        <section className="promo-banner">
          <h2 className="banner-title">Sale up to 50% off</h2>
          <p className="banner-text">Don't miss out on our biggest deals!</p>
          <button className="outline-button">Shop Now</button>
        </section>

        {/* Features */}
        <section className="features-grid">
          {[
            { title: "Free Delivery", desc: "On orders over $50" },
            { title: "Secure Payment", desc: "100% secure payment" },
            { title: "24/7 Support", desc: "Dedicated support" },
            { title: "Money Back", desc: "30 days guarantee" },
          ].map((feature, i) => (
            <div key={i} className="feature-card">
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.desc}</p>
            </div>
          ))}
        </section>

        {/* Newsletter */}
        <section className="newsletter">
          <h2 className="newsletter-title">Subscribe Newsletter</h2>
          <p className="newsletter-description">Get the latest updates and offers</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" className="newsletter-input" />
            <button className="primary-button">Subscribe</button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">About Us</h3>
            <ul className="footer-links">
              <li>About</li>
              <li>Contact</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Customer Service</h3>
            <ul className="footer-links">
              <li>Shipping Policy</li>
              <li>Returns & Exchanges</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">My Account</h3>
            <ul className="footer-links">
              <li>Sign In</li>
              <li>View Cart</li>
              <li>Wishlist</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Connect With Us</h3>
            <ul className="footer-links">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 TechStore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default TechStore;
