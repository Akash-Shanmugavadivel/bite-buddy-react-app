
import React from 'react';
import { useCart } from '../contexts/CartContext';

const CartItem = ({ item }) => {
  const { addItem, removeItem, cart } = useCart();
  
  const handleIncrease = () => {
    addItem(item, cart.restaurant);
  };
  
  const handleDecrease = () => {
    removeItem(item.id);
  };
  
  return (
    <div className="card mb-3 border-0 shadow-sm">
      <div className="row g-0 align-items-center">
        <div className="col-3 col-md-2">
          <img 
            src={item.image} 
            className="cart-item-img" 
            alt={item.name} 
          />
        </div>
        <div className="col-6 col-md-7">
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text text-primary mb-0">${item.price.toFixed(2)}</p>
          </div>
        </div>
        <div className="col-3 col-md-3">
          <div className="d-flex align-items-center">
            <button 
              className="btn btn-sm btn-outline-secondary" 
              onClick={handleDecrease}
            >
              -
            </button>
            <span className="mx-2">{item.quantity}</span>
            <button 
              className="btn btn-sm btn-outline-primary" 
              onClick={handleIncrease}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
