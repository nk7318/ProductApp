import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    return products.slice(start, start + productsPerPage);
  }, [products, currentPage]);

  const totalPages = useMemo(() => Math.ceil(products.length / productsPerPage), [products.length]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="products-container">
      <h1>Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul className="products-list">
            {currentProducts.map((product) => (
              <li key={product.id} className="product-item">
                <img src={product.thumbnail} alt={product.title} className="product-image" />
                <div className="product-details">
                  <h2>{product.title}</h2>
                  <p>{product.description}</p>
                  <p><strong>Price:</strong> ${product.price}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span> Page {currentPage} of {totalPages} </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsList;
