
import React from 'react';
import { useCart } from '../contexts/CartContext';

const MenuItem = ({ item, restaurant }) => {
  const { addItem } = useCart();
  
  const handleAddToCart = () => {
    addItem(item, restaurant);
  };
  
  return (
    <div className="card mb-3 border-0 shadow-sm">
      <div className="row g-0">
        <div className="col-4 col-md-3">
          <img 
            src={item.image} 
            className="menu-item-img w-100 h-100 rounded-start" 
            alt={item.name} 
          />
        </div>
        <div className="col-8 col-md-9">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h5 className="card-title">{item.name}</h5>
              <span className="text-primary fw-bold">₹{item.price.toFixed(2)}</span>
            </div>
            <p className="card-text text-muted small">{item.description}</p>
            <button 
              onClick={handleAddToCart} 
              className="btn btn-sm btn-outline-primary"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
