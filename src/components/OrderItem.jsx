
import React from 'react';
import { Link } from 'react-router-dom';

const OrderItem = ({ order }) => {
  const getStatusClass = (status) => {
    switch(status) {
      case 'Delivered':
        return 'status-delivered';
      case 'Processing':
        return 'status-processing';
      case 'Cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };
  
  return (
    <div className="card mb-4 border-0 shadow-sm">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <div>
          <h6 className="mb-0">Order #{order.id}</h6>
          <small className="text-muted">{order.date}</small>
        </div>
        <span className={`order-status ${getStatusClass(order.status)}`}>
          {order.status}
        </span>
      </div>
      <div className="card-body">
        <h5 className="card-title">{order.restaurant.name}</h5>
        <div className="mb-3">
          {order.items.map((item) => (
            <div key={item.id} className="d-flex justify-content-between py-1 border-bottom">
              <span>{item.quantity} × {item.name}</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-between font-weight-bold">
          <strong>Total</strong>
          <strong>{order.total.toFixed(2)}</strong>
        </div>
        <p className="mt-2 mb-0 text-muted small">
          Delivered to: {order.deliveryAddress}
        </p>
      </div>
      <div className="card-footer bg-white border-top-0">
        <Link 
          to={`/restaurant/${order.restaurant.id}`} 
          className="btn btn-sm btn-outline-primary"
        >
          Order Again
        </Link>
      </div>
    </div>
  );
};

export default OrderItem;
