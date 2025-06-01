import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { layoutContainer, redButton, greenButton, inputBase, titleText, logo, cartButton, navbar, } from '../styles/sharedStyles';
import { cartContent, cartItem, image, footer, } from '../styles/cartStyles';

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    updateQuantity,
  } = useCart();
  const navigate = useNavigate();

  const [quantities, setQuantities] = useState(
    cart.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {})
  );
  const handleQuantityUpdate = (id) => {
    const currentItem = cart.find((i) => i.id === id);
    const newQuantity = parseInt(quantities[id]);
    if (!isNaN(newQuantity) && newQuantity > 0 && currentItem) {
      const change = newQuantity - currentItem.quantity;
      updateQuantity(id, change);
    }
  };
  
  const handlePlaceOrder = () => {
    navigate('/delivery');
  };

  const total = cart.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  return (
    <div style={layoutContainer}>
      <header style={navbar}>
        <img
          src="/logo.png"
          alt="Logo"
          style={logo}
          onClick={() => navigate('/homepage')}
        />
        <h2 style={titleText}>Shopping Cart Info</h2>
        <button
          style={cartButton}
          onClick={() => navigate('/cart')}
          title="Go to Cart"
        >
          Cart
        </button>
      </header>

      <div style={cartContent}>
        {cart.map((item) => (
          <div key={item.id} style={cartItem}>
            <img src={item.image} alt={item.name} style={image} />
            <div style={{
              display: 'grid',
              gridTemplateColumns: '150px 80px 80px',
              alignItems: 'center',
              gap: '16px',
              minWidth: '360px',
            }}>
              <strong>{item.name}</strong>
              <span>${Number(item.price).toFixed(2)}</span>
              <span>Qty: {item.quantity}</span>
            </div>
            <input
              type="number"
              min="1"
              value={quantities[item.id]}
              onChange={(e) =>
                setQuantities({ ...quantities, [item.id]: e.target.value })
              }
              style={{ ...inputBase, width: '60px', marginRight: '8px' }}
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => handleQuantityUpdate(item.id)}
                style={greenButton}
              >
                Update
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                style={redButton}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={footer}>
        <h3>Total: ${total.toFixed(2)}</h3>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={clearCart} style={redButton}>
            Clear Cart
          </button>
          <button
            onClick={handlePlaceOrder}
            style={{
              ...greenButton,
              backgroundColor: cart.length === 0 ? '#ccc' : 'green',
              cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
            }}
            disabled={cart.length === 0}
          >
            Place an Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;