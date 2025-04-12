
import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  // Helper to display price level as $ symbols
  const renderPriceLevel = (level) => {
    return '$'.repeat(level);
  };
  
  return (
    <div className="card food-card h-100 border-0 shadow-sm">
      <Link to={`/restaurant/${restaurant.id}`} className="text-decoration-none">
        <img 
          src={restaurant.image} 
          className="card-img-top restaurant-logo" 
          alt={restaurant.name} 
        />
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="card-title mb-1">{restaurant.name}</h5>
            <span className="badge bg-success">{restaurant.rating}★</span>
          </div>
          <p className="card-text text-muted mb-1">{restaurant.cuisine}</p>
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              {restaurant.deliveryTime} min • {restaurant.distance} mi
            </small>
            <small className="text-muted">
              {renderPriceLevel(restaurant.priceLevel)}
            </small>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
