
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const OrderConfirmationPage = () => {
  const { id } = useParams();
  const [estimatedTime, setEstimatedTime] = useState(0);
  
  // Calculate random delivery time between 25-45 minutes
  useEffect(() => {
    const time = Math.floor(Math.random() * (45 - 25 + 1)) + 25;
    setEstimatedTime(time);
  }, []);
  
  return (
    <div className="container py-5">
      <div className="card border-0 shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
        <div className="card-body text-center py-5">
          <div className="mb-4">
            <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>
          </div>
          
          <h1 className="mb-4">Order Confirmed!</h1>
          <p className="lead mb-4">
            Your order #{id} has been placed successfully.
          </p>
          
          <div className="card bg-light mb-4">
            <div className="card-body">
              <h5 className="mb-3">Estimated Delivery Time</h5>
              <div className="display-6 mb-2">{estimatedTime} minutes</div>
              <p className="text-muted mb-0">
                Your food is being prepared and will be on its way shortly.
              </p>
            </div>
          </div>
          
          <div className="d-flex justify-content-center">
            <Link to="/" className="btn btn-outline-primary me-3">
              Back to Home
            </Link>
            <Link to="/profile" className="btn btn-primary">
              View Order History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
