import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { navbar, logo, cartButton } from '../styles/sharedStyles';
import { menuBar, menuItem, menuText, dropdown, dropdownItem, actions, searchBox, searchButton, } from '../styles/categoryBarStyles';

const CategoryBar = ({
  categories,
  onSearch,
  onCategoryClick,
  onSubcategoryClick,
  currentMain,
  currentSub,
}) => {
  const [activeMainCategory, setActiveMainCategory] = useState(null);
  const [hoveredSubCategory, setHoveredSubCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const menuRef = useRef();
  const hideTimeout = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMainCategory(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <header style={navbar}>
      <div onClick={() => navigate('/homepage')} style={{ cursor: 'pointer' }}>
        <img src="/logo.png" alt="Logo" style={logo} />
      </div>

      <nav style={menuBar} ref={menuRef}>
        {Object.entries(categories).map(([main, subs]) => (
          <div
            key={main}
            style={menuItem}
            onMouseEnter={() => {
              clearTimeout(hideTimeout.current);
              setActiveMainCategory(main);
            }}
            onMouseLeave={() => {
              hideTimeout.current = setTimeout(() => {
                setActiveMainCategory(null);
              }, 300);
            }}
          >
            <span
              style={{
                ...menuText,
                color: activeMainCategory === main || currentMain === main ? 'orange' : '#333',
                fontWeight: currentMain === main ? 'bold' : 'normal',
              }}
              onClick={() => onCategoryClick(main)}
            >
              {main}
            </span>

            {activeMainCategory === main && (
              <div
                style={dropdown}
                onMouseEnter={() => clearTimeout(hideTimeout.current)}
                onMouseLeave={() => {
                  hideTimeout.current = setTimeout(() => {
                    setActiveMainCategory(null);
                  }, 300);
                }}
              >
                {subs.map((sub) => (
                  <div
                    key={sub}
                    style={{
                      ...dropdownItem,
                      color: hoveredSubCategory === sub || currentSub === sub ? 'orange' : '#333',
                      fontWeight: hoveredSubCategory === sub || currentSub === sub ? 'bold' : 'normal',
                    }}
                    onMouseEnter={() => setHoveredSubCategory(sub)}
                    onMouseLeave={() => setHoveredSubCategory(null)}
                    onClick={() => onSubcategoryClick(main, sub)}
                  >
                    {sub}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div style={actions}>
        <input
          type="text"
          placeholder="Search products..."
          style={searchBox}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} style={searchButton}>
          Search
        </button>
        <button
          style={{...cartButton, marginRight: '10px'}}
          onClick={() => navigate('/orders')}
          title="My Orders"
        >
          Orders
        </button>
        <button
          style={cartButton}
          onClick={() => navigate('/cart')}
          title="Go to Cart"
        >
          Cart
        </button>
      </div>
    </header>
  );
};

export default CategoryBar;