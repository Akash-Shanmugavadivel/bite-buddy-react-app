
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const CartPage = () => {
  const { cart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };
  
  const deliveryFee = cart.restaurant ? cart.restaurant.deliveryFee : 0;
  const tax = cart.totalAmount * 0.1;
  const totalWithTaxAndDelivery = cart.totalAmount + tax + deliveryFee;
  
  if (cart.items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="py-5">
          <h2>Your cart is empty</h2>
          <p className="mb-4">Add some delicious items from our restaurants</p>
          <Link to="/restaurants" className="btn btn-primary">
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-5">
      <h1 className="mb-4">Your Cart</h1>
      
      <div className="row">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">From: {cart.restaurant?.name}</h5>
            </div>
            <div className="card-body">
              {cart.items.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
              
              <div className="text-end mt-3">
                <button 
                  onClick={clearCart} 
                  className="btn btn-outline-danger"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Items Total</span>
                <span>          {cart.totalAmount.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax</span>
                <span>Tax (5% GST)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total</strong>
                <strong>₹{totalWithTaxAndDelivery.toFixed(2)}</strong>
              </div>
              
              <button 
                onClick={handleCheckout} 
                className="btn btn-primary w-100"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
