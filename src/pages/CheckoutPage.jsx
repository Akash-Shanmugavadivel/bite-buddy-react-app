
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    addressDetails: '',
    paymentMethod: 'credit'
  });
  const [errors, setErrors] = useState({});
  
  // Calculate order totals
  const deliveryFee = cart.restaurant ? cart.restaurant.deliveryFee : 0;
  const tax = cart.totalAmount * 0.1; // 10% tax
  const total = cart.totalAmount + tax + deliveryFee;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when field is edited
    setErrors({
      ...errors,
      [name]: ''
    });
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // In a real app, this would send the order to an API
    console.log('Order submitted:', {
      customer: formData,
      items: cart.items,
      restaurant: cart.restaurant,
      total
    });
    
    // Generate random order ID for this demo
    const orderId = Math.floor(100000 + Math.random() * 900000);
    
    // Clear the cart
    clearCart();
    
    // Redirect to order confirmation page
    navigate(`/order-confirmation/₹{orderId}`);
  };
  
  if (cart.items.length === 0) {
    navigate('/');
    return null;
  }
  
  return (
    <div className="container py-5">
      <h1 className="mb-4">Checkout</h1>
      
      <div className="row">
        <div className="col-lg-8">
          <form onSubmit={handleSubmit}>
            <div className="card checkout-step active border-0 shadow-sm mb-4">
              <div className="card-body">
                <h4 className="mb-3">Delivery Details</h4>
                
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    className={`form-control ₹{errors.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className={`form-control ₹{errors.phone ? 'is-invalid' : ''}`}
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Delivery Address</label>
                  <input
                    type="text"
                    className={`form-control ₹{errors.address ? 'is-invalid' : ''}`}
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street address"
                  />
                  {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="addressDetails" className="form-label">Apt/Suite/Floor (optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="addressDetails"
                    name="addressDetails"
                    value={formData.addressDetails}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="card checkout-step border-0 shadow-sm mb-4">
              <div className="card-body">
                <h4 className="mb-3">Payment Method</h4>
                
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="credit"
                    value="credit"
                    checked={formData.paymentMethod === 'credit'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="credit">
                    Credit Card
                  </label>
                </div>
                
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="debit"
                    value="debit"
                    checked={formData.paymentMethod === 'debit'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="debit">
                    Debit Card
                  </label>
                </div>
                
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="cash"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="cash">
                    Cash on Delivery
                  </label>
                </div>
                
                {formData.paymentMethod !== 'cash' && (
                  <div className="mt-3 alert alert-info">
                    <p className="mb-0">
                      This is a demo application. No payment will be processed.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-end">
              <button type="submit" className="btn btn-primary btn-lg">
                Place Order
              </button>
            </div>
          </form>
        </div>
        
        <div className="col-lg-4 mt-4 mt-lg-0">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <h6>{cart.restaurant?.name}</h6>
              
              {cart.items.map(item => (
                <div key={item.id} className="d-flex justify-content-between mb-2">
                  <span>{item.quantity} × {item.name}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              
              <hr />
              
              <div className="d-flex justify-content-between mb-2">
                <span>Items Total</span>
                <span>₹{cart.totalAmount.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total</strong>
                <strong>₹{total.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
