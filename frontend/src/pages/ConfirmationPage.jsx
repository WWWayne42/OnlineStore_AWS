import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { contentContainer, navbar, logo, titleText, cartButton, } from '../styles/sharedStyles';
import { confirmationContent, headingText, paragraphText, confirmButton, } from '../styles/confirmationStyles';
import { cartItem, image } from '../styles/cartStyles';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderedItems = location.state?.orderedItems || [];
  const orderNumber = location.state?.orderNumber;
  const orderId = location.state?.orderId;
  const totalAmount = location.state?.totalAmount;

  return (
    <div style={contentContainer}>
      <header style={navbar}>
        <img
          src="/logo.png"
          alt="Logo"
          style={logo}
          onClick={() => navigate('/homepage')}
        />
        <h2 style={titleText}>Shopping Confirmation</h2>
        <button
          style={cartButton}
          onClick={() => navigate('/cart')}
          title="Go to Cart"
        >
          Cart
        </button>
      </header>

      <div style={confirmationContent}>
        <h1 style={headingText}>Order Placed Successfully!</h1>
        
        {/* 显示订单ID和相关信息 */}
        {orderNumber && (
          <div style={{ 
            backgroundColor: '#e8f5e8', 
            padding: '20px', 
            borderRadius: '10px', 
            margin: '20px 0',
            border: '2px solid #4CAF50',
            textAlign: 'center'
          }}>
            <h2 style={{ 
              color: '#2E7D32', 
              margin: '0 0 10px 0', 
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              Your Order ID: {orderNumber}
            </h2>
            <p style={{ 
              margin: '5px 0', 
              color: '#555',
              fontSize: '16px'
            }}>
              Please save this Order ID for future reference and tracking.
            </p>
            {totalAmount && (
              <p style={{ 
                margin: '10px 0 0 0', 
                color: '#2E7D32',
                fontSize: '18px',
                fontWeight: 'bold'
              }}>
                Total Amount: ${Number(totalAmount).toFixed(2)}
              </p>
            )}
          </div>
        )}
        
        <p style={paragraphText}>Your order has been placed successfully.</p>
        <p style={paragraphText}>A confirmation email was sent to you. Please check later.</p>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', margin: '30px 0' }}>
          <button onClick={() => navigate('/homepage')} style={confirmButton}>
            Return to Homepage
          </button>
          <button 
            onClick={() => navigate('/orders')} 
            style={{
              ...confirmButton,
              backgroundColor: '#2196F3',
              color: 'white'
            }}
          >
            View My Orders
          </button>
        </div>

        {orderedItems.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <h2 style={{ ...headingText, fontSize: '20px' }}>Purchased Items</h2>
            {orderedItems.map((item) => (
              <div key={item.id} style={cartItem}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={image}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/80';
                  }}
                />
                <p style={{ flex: 1, fontWeight: 'bold', marginLeft: '16px' }}>{item.name}</p>
                <p style={{ marginRight: '16px' }}>${Number(item.price).toFixed(2)}</p>
                <p style={{ minWidth: '60px' }}>Qty: {item.quantity}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmationPage;