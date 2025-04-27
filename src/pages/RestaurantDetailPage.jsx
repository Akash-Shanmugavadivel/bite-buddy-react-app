
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MenuItem from '../components/MenuItem';
import CategoryBadge from '../components/CategoryBadge';
import { restaurants } from '../data/restaurants';
import { getMenu } from '../data/menus';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  
  useEffect(() => {
    // Find the restaurant by ID
    const foundRestaurant = restaurants.find(r => r.id === id);
    setRestaurant(foundRestaurant);
    
    // Get menu for this restaurant
    const restaurantMenu = getMenu(id);
    setMenu(restaurantMenu);
    
    // Extract unique categories from menu
    const uniqueCategories = [...new Set(restaurantMenu.map(item => item.category))];
    setCategories(uniqueCategories);
    
    // Set first category as default selected
    if (uniqueCategories.length > 0) {
      setSelectedCategory(uniqueCategories[0]);
    }
  }, [id]);
  
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  
  const filteredMenu = selectedCategory
    ? menu.filter(item => item.category === selectedCategory)
    : menu;
  
  if (!restaurant) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-md-8">
          <h1>{restaurant.name}</h1>
          <p className="text-muted">{restaurant.cuisine} • {restaurant.deliveryTime} min • {restaurant.distance} mi</p>
          <div className="d-flex align-items-center mb-2">
            <span className="badge bg-success me-2">{restaurant.rating}★</span>
            <span className="text-muted">Fast Delivery</span>
          </div>
          <p>{restaurant.description}</p>
        </div>
        <div className="col-md-4">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="img-fluid rounded shadow"
          />
        </div>
      </div>
      
      <div className="d-flex flex-wrap mb-4">
        {categories.map((category) => (
          <CategoryBadge
            key={category}
            category={category}
            onClick={handleCategoryClick}
            isSelected={selectedCategory === category}
          />
        ))}
      </div>
      
      <h2 className="mb-4">Menu</h2>
      <div className="row">
        <div className="col-md-8">
          {filteredMenu.map((item) => (
            <MenuItem 
              key={item.id} 
              item={item} 
              restaurant={restaurant} 
            />
          ))}
        </div>
        
        <div className="col-md-4 d-none d-md-block">
          <div className="card border-0 shadow-sm sticky-top" style={{ top: '20px' }}>
            <div className="card-body">
              <h4 className="card-title">Restaurant Info</h4>
              <hr />
              <p><strong>Address:</strong> {restaurant.address}</p>
              <p><strong>Delivery Fee:</strong> ₹{restaurant.deliveryFee.toFixed(2)}</p>
              <p><strong>Minimum Order:</strong> ₹{restaurant.minOrder.toFixed(2)}</p>
              <p><strong>Delivery Time:</strong> {restaurant.deliveryTime} min</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
