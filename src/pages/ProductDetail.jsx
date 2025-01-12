import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cartMessage, setCartMessage] = useState('');
  const [quantity, setQuantity] = useState(1); // Quantity state added
  const navigate = useNavigate();

  const getAccessToken = () => {
    return localStorage.getItem('access_token');
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${id}/`);
        setProduct(response.data);
        fetchRelatedProducts(response.data.category);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };

    const fetchRelatedProducts = async (category) => {
      try {
        const response = await API.get('/products/');
        const related = response.data.filter(
          (item) => item.category === category && item.id !== parseInt(id)
        );
        setRelatedProducts(related);
      } catch (error) {
        console.error('Failed to fetch related products:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const token = getAccessToken();

    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const orderResponse = await API.post(
        '/orders/',
        {
          product_name: product.name,
          quantity: quantity, // Using quantity from state
          price: product.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await API.post(
        '/cart/',
        { order_id: orderResponse.data.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCartMessage('Order created and product added to cart successfully!');
      navigate('/cart');
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        console.error('Failed to create order or add to cart:', error);
        setCartMessage('Failed to create order or add product to cart.');
      }
    }

    setTimeout(() => setCartMessage(''), 3000);
  };

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value)); // Update quantity on change
  };

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="breadcrumb">Home &gt; All Categories &gt; {product.name}</div>

      <div className="product-main">
        <div className="product-images w-[40]">
          <img src={product.image} alt={product.name} className="main-image w-[50%]" />
          <div className="thumbnail-images w-[300px]">
            {[product.image2, product.image3].map((img, index) => (
              <img key={`thumbnail-${index}`} src={img} alt={`Thumbnail ${index + 1}`} />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">${Number(product.price).toFixed(2)}</p>
          <p className="availability">
            Description: <span>{product.description.slice(0, 550)}...</span>
          </p>
          <div className="sizes">
            <label>Size:</label>
            <select>
              {product.sizes?.map((size, index) => (
                <option key={`size-${index}`} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="quantity">
            <label>Quantity:</label>
            <select value={quantity} onChange={handleQuantityChange}>
              {[...Array(10).keys()].map((n) => (
                <option key={n} value={n + 1}>
                  {n + 1}
                </option>
              ))}
            </select>
          </div>

          <button
            className="add-to-cart"
            disabled={product.stock === 0}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          {cartMessage && <p className="cart-message">{cartMessage}</p>}
        </div>
      </div>

      <div className="related-products">
        <h2 className="text-[25px] font-bold">Related Products</h2>
        <div className="related-products-grid grid grid-cols-4 shadow-2xl gap-5">
          {relatedProducts?.map((relatedProduct) => (
            <div
              key={`related-${relatedProduct.id}`}
              className="p-5 related-product w-full border bg-white flex flex-col items-start justify-center"
              onClick={() => navigate(`/product/${relatedProduct.id}`)}
            >
              <div className="w-full flex justify-center items-center mb-5 ">
                <img
                  className="w-full"
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                />
              </div>
              <div className="w-full text-start pl-12">
                <p>{relatedProduct.name}</p>
                <p>${Number(relatedProduct.price).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="newsletter">
        <h2>Subscribe to our Newsletter</h2>
        <form>
          <input type="email" placeholder="Your email address" required />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
}

export default ProductDetail;
