import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StorePage from './pages/StorePage';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import DeliveryPage from './pages/DeliveryPage';
import ConfirmationPage from './pages/ConfirmationPage';
import OrdersPage from './pages/OrdersPage';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/homepage" element={<StorePage />} />
          <Route path="/category/:mainCategory" element={<StorePage />} />
          <Route path="/category/:mainCategory/:subCategory" element={<StorePage />} />
          <Route path="*" element={<StorePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}