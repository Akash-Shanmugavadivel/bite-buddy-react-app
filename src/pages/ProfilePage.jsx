
import React, { useState } from 'react';
import { orders } from '../data/orders';
import OrderItem from '../components/OrderItem';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    setEditing(false);
  };
  
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-4 mb-4 mb-lg-0">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="text-center mb-4">
                <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '100px', height: '100px' }}>
                  <span className="display-4 text-muted">{user?.name?.charAt(0) || 'U'}</span>
                </div>
                <h4>{user?.name}</h4>
                <p className="text-muted mb-0">{user?.email}</p>
              </div>
              
              {!editing ? (
                <>
                  <div className="mb-3">
                    <h6 className="text-muted mb-1">Phone</h6>
                    <p>{user?.phone || 'Not provided'}</p>
                  </div>
                  
                  <div className="mb-3">
                    <h6 className="text-muted mb-1">Default Address</h6>
                    <p>{user?.address || 'Not provided'}</p>
                  </div>
                  
                  <button 
                    onClick={() => setEditing(true)} 
                    className="btn btn-outline-primary w-100"
                  >
                    Edit Profile
                  </button>
                </>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      readOnly
                    />
                    <small className="text-muted">Email cannot be changed</small>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">Default Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="d-flex">
                    <button type="submit" className="btn btn-primary me-2">
                      Save Changes
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setEditing(false)} 
                      className="btn btn-outline-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
        
        <div className="col-lg-8">
          <h2 className="mb-4">Order History</h2>
          
          {orders.length > 0 ? (
            orders.map(order => (
              <OrderItem key={order.id} order={order} />
            ))
          ) : (
            <div className="text-center py-5">
              <h4>No orders yet</h4>
              <p>Your order history will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
