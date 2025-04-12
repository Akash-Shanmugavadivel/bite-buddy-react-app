
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard';
import CategoryBadge from '../components/CategoryBadge';
import { restaurants as allRestaurants, foodCategories } from '../data/restaurants';

const RestaurantListPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchQuery = queryParams.get('q') || '';
  const initialCategoryFilter = queryParams.get('category') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryFilter);
  const [restaurants, setRestaurants] = useState(allRestaurants);
  
  useEffect(() => {
    // Filter restaurants based on search query and/or category
    let filteredRestaurants = [...allRestaurants];
    
    if (searchQuery) {
      filteredRestaurants = filteredRestaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filteredRestaurants = filteredRestaurants.filter(restaurant =>
        restaurant.cuisine.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    setRestaurants(filteredRestaurants);
  }, [searchQuery, selectedCategory]);
  
  const handleCategoryClick = (category) => {
    if (typeof category === 'object') {
      setSelectedCategory(selectedCategory === category.name ? '' : category.name);
    } else {
      setSelectedCategory(selectedCategory === category ? '' : category);
    }
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  return (
    <div className="container py-5">
      <h1 className="mb-4">Restaurants</h1>
      
      <div className="mb-4">
        <input
          type="text"
          className="form-control search-input mb-3"
          placeholder="Search restaurants or cuisines"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        
        <div className="d-flex flex-wrap">
          <span className="me-2 mt-1">Filter by cuisine:</span>
          {foodCategories.map((category) => (
            <CategoryBadge
              key={category.id}
              category={category}
              onClick={handleCategoryClick}
              isSelected={selectedCategory === category.name}
            />
          ))}
        </div>
      </div>
      
      {restaurants.length > 0 ? (
        <div className="row g-4">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="col-md-6 col-lg-3">
              <RestaurantCard restaurant={restaurant} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <h3>No restaurants found</h3>
          <p>Try changing your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantListPage;
