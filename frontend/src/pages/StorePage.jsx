import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import CategoryBar from '../components/CategoryBar';
import categories from '../data/categories';
import { layoutContainer } from '../styles/sharedStyles';

const Main = () => {
  const [products, setProducts] = useState([]);
  const { mainCategory, subCategory } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const querySearch = queryParams.get('q');

  useEffect(() => {
    let url = 'http://localhost/grocery-api/getProducts.php';

    if (!querySearch) {
      if (mainCategory && subCategory) {
        url += `?category=${encodeURIComponent(mainCategory)}&sub=${encodeURIComponent(subCategory)}`;
      } else if (mainCategory) {
        url += `?category=${encodeURIComponent(mainCategory)}`;
      }
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Failure to load data', err));
  }, [mainCategory, subCategory, querySearch]);

  const handleSearch = (term) => {
    navigate(`/homepage?q=${encodeURIComponent(term)}`);
  };

  const handleCategoryClick = (main) => {
    navigate(`/category/${main}`);
  };

  const handleSubcategoryClick = (main, sub) => {
    navigate(`/category/${main}/${sub}`);
  };

  const filteredProducts = querySearch
    ? products.filter((product) =>
        product.name.toLowerCase().includes(querySearch.toLowerCase())
      )
    : products;

  return (
    <div style={{ ...layoutContainer, paddingTop: '90px' }}>
      <CategoryBar
        categories={categories}
        onSearch={handleSearch}
        onCategoryClick={handleCategoryClick}
        onSubcategoryClick={handleSubcategoryClick}
        currentMain={mainCategory}
        currentSub={subCategory}
      />
      <ProductGrid products={filteredProducts} onAddToCart={() => {}} />
    </div>
  );
};

export default Main;