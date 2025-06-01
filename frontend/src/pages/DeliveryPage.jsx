import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { contentContainer, navbar, logo, titleText, cartButton, inputBase, requiredAsterisk, } from '../styles/sharedStyles';
import { form, formGroup, submitButton, } from '../styles/deliveryFormStyles';

const DeliveryPage = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    mobile: '',
    email: '',
  });

  const [isFormInvalid, setIsFormInvalid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, street, city, state, mobile, email } = formData;

    if (!firstName || !lastName || !street || !city || !state || !mobile || !email) {
      alert('Please provide all details.');
      setIsFormInvalid(true);
      return;
    }

    const errors = [];
    if (!/^\d{10}$/.test(mobile)) {
      errors.push('Please enter a valid 10-digit mobile number.');
    }
    if (!email.includes('@') || !email.endsWith('.com')) {
      errors.push('Please enter a valid email address.');
    }
    if (errors.length > 0) {
      errors.forEach((err) => alert(err));
      setIsFormInvalid(true);
      return;
    }

    setIsFormInvalid(false);

    const checkoutData = {
      items: cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
    };

    // 1. 首先检查库存
    fetch('http://localhost/grocery-api/checkStock.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(checkoutData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'ok') {
          // 2. 库存充足，创建订单
          const orderData = {
            customer: {
              firstName,
              lastName,
              street,
              city,
              state,
              mobile,
              email
            },
            items: cart.map((item) => ({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.image
            }))
          };
          
          return fetch('http://localhost/grocery-api/createOrder.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
          });
        } else {
          throw new Error(data.message);
        }
      })
      .then((res) => res.json())
      .then((orderResult) => {
        if (orderResult.status === 'success') {
          // 3. 订单创建成功，更新库存
          return fetch('http://localhost/grocery-api/updateStock.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(checkoutData),
          }).then((res) => res.json()).then(() => orderResult);
        } else {
          throw new Error(orderResult.message);
        }
      })
      .then((orderResult) => {
        // 4. 所有操作成功，跳转到确认页面
        const orderedItems = [...cart];
        clearCart();
        navigate('/confirmation', { 
          state: { 
            orderedItems,
            orderNumber: orderResult.order_number,
            orderId: orderResult.order_id,
            totalAmount: orderResult.total_amount
          } 
        });
      })
      .catch((error) => {
        alert(error.message || 'Order creation failed. Please try again.');
        console.error('Order error:', error);
      });
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
        <h2 style={titleText}>Delivery Details</h2>
        <button
          style={cartButton}
          onClick={() => navigate('/cart')}
          title="Go to Cart"
        >
          Cart
        </button>
      </header>

      <form onSubmit={handleSubmit} style={form}>
        {[
          { label: 'First Name', name: 'firstName' },
          { label: 'Last Name', name: 'lastName' },
          { label: 'Street Address', name: 'street' },
          { label: 'City/Suburb', name: 'city' },
          { label: 'Mobile Number', name: 'mobile' },
          { label: 'Email Address', name: 'email' },
        ].map((field) => (
          <div key={field.name} style={formGroup}>
            <label>
              {field.label} <span style={requiredAsterisk}>*</span> (Required)
            </label>
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              style={inputBase}
            />
          </div>
        ))}

        <div style={formGroup}>
          <label>
            State <span style={requiredAsterisk}>*</span> (Required)
          </label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            style={inputBase}
          >
            <option value="">Please select</option>
            {['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT', 'Others'].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          style={{
            ...submitButton,
            backgroundColor: isFormInvalid ? '#ccc' : submitButton.backgroundColor,
            color: isFormInvalid ? '#666' : submitButton.color,
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DeliveryPage;
