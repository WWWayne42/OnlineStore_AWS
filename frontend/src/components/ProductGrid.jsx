import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { layoutContainer } from '../styles/sharedStyles';
import { grid, card, cardHover, image, buttonBase } from '../styles/productGridStyles';

const ProductGrid = ({ products }) => {
  const { addToCart } = useCart(); 
  const [hoveredId, setHoveredId] = useState(null);

  const getButtonStyle = (isInStock) => ({
    ...buttonBase,
    backgroundColor: isInStock ? '#4CAF50' : '#ccc',
    cursor: isInStock ? 'pointer' : 'not-allowed',
  });

  return (
    <div style={layoutContainer}>
      <div style={grid}>
        {products.map((product) => {
          const isInStock = Number(product.inStock) > 0;
        
          return (
            <div
              key={product.id}
              style={{
                ...card,
                ...(hoveredId === product.id ? cardHover : {})
              }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={product.image}
                alt={product.name}
                style={image}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/100';
                }}
              />
              <h3>{product.name}</h3>
              <p>{product.unit} — ${Number(product.price).toFixed(2)}</p>
              <p style={{ color: isInStock ? 'green' : 'red' }}>
                {isInStock ? 'In Stock' : 'Out of Stock'}
              </p>
              <button
                onClick={() => addToCart(product)}
                disabled={!isInStock}
                style={getButtonStyle(isInStock)}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductGrid;