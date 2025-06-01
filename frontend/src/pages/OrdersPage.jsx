import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contentContainer, navbar, logo, titleText, inputBase, greenButton } from '../styles/sharedStyles';

const OrdersPage = () => {
  const navigate = useNavigate();
  const [searchOrderId, setSearchOrderId] = useState('');
  const [orderResult, setOrderResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchOrderId.trim()) {
      setError('请输入订单号');
      return;
    }

    setLoading(true);
    setError('');
    setOrderResult(null);

    try {
      const response = await fetch(`http://localhost/grocery-api/getOrderById.php?order_number=${encodeURIComponent(searchOrderId)}`);
      const data = await response.json();

      if (data.status === 'success') {
        setOrderResult(data.order);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('搜索订单时发生错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={contentContainer}>
      <header style={navbar}>
        <img
          src="/logo.png"
          alt="Logo"
          style={logo}
          onClick={() => navigate('/homepage')}
        />
        <h2 style={titleText}>My Previous Orders</h2>
        <div style={{ width: '60px' }}></div> {/* 占位符，保持布局平衡 */}
      </header>

      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        {/* 搜索框 */}
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginBottom: '30px',
          alignItems: 'center'
        }}>
          <input
            type="text"
            placeholder="Enter your Order ID (e.g., ORD20241225001)"
            value={searchOrderId}
            onChange={(e) => setSearchOrderId(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              ...inputBase,
              flex: 1,
              padding: '12px',
              fontSize: '16px'
            }}
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            style={{
              ...greenButton,
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: loading ? '#ccc' : greenButton.backgroundColor
            }}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {/* 错误信息 */}
        {error && (
          <div style={{
            backgroundColor: '#ffebee',
            color: '#c62828',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #ffcdd2'
          }}>
            {error}
          </div>
        )}

        {/* 订单结果 */}
        {orderResult && (
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            <h3 style={{ 
              marginTop: '0', 
              marginBottom: '20px',
              color: '#2E7D32'
            }}>
              Order Details - {orderResult.order_number}
            </h3>
            
            <div style={{ marginBottom: '20px' }}>
              <p><strong>Customer:</strong> {orderResult.customer_name}</p>
              <p><strong>Email:</strong> {orderResult.customer_email}</p>
              <p><strong>Phone:</strong> {orderResult.customer_phone}</p>
              <p><strong>Address:</strong> {orderResult.delivery_address}</p>
              <p><strong>Order Date:</strong> {new Date(orderResult.created_at).toLocaleString()}</p>
              <p><strong>Total Amount:</strong> ${Number(orderResult.total_amount).toFixed(2)}</p>
            </div>

            <h4 style={{ marginBottom: '15px' }}>Order Items:</h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              {orderResult.order_items.map((item, index) => (
                <div key={index} style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr',
                  gap: '20px',
                  padding: '15px',
                  backgroundColor: '#ffffff',
                  borderRadius: '5px',
                  border: '1px solid #e0e0e0',
                  alignItems: 'center'
                }}>
                  <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                  <div>${Number(item.price).toFixed(2)}</div>
                  <div>Qty: {item.quantity}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage; 