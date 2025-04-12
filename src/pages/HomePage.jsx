
import React from 'react';
import { Link } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard';
import { restaurants, foodCategories } from '../data/restaurants';

const HomePage = () => {
  // Get featured restaurants (top 4 by rating)
  const featuredRestaurants = [...restaurants]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);
  
  return (
    <>
      <section className="banner">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">Delicious Food Delivered</h1>
          <p className="lead">Find your favorite meals from top restaurants near you</p>
          <Link to="/restaurants" className="btn btn-primary btn-lg">
            Explore Restaurants
          </Link>
        </div>
      </section>
      
      <section className="py-5">
        <div className="container">
          <h2 className="mb-4">Food Categories</h2>
          <div className="row g-4">
            {foodCategories.map((category) => (
              <div key={category.id} className="col-4 col-md-2">
                <Link 
                  to={`/restaurants?category=${category.name}`} 
                  className="text-decoration-none"
                >
                  <div className="category-item">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="category-img"
                    />
                    <p className="mt-2">{category.name}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Top Rated Restaurants</h2>
            <Link to="/restaurants" className="btn btn-outline-primary">
              View All
            </Link>
          </div>
          <div className="row g-4">
            {featuredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="col-md-6 col-lg-3">
                <RestaurantCard restaurant={restaurant} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2>How It Works</h2>
              <div className="d-flex align-items-center mb-3">
                <div className="step-number">1</div>
                <div>Choose a restaurant</div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="step-number">2</div>
                <div>Select your favorite meals</div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="step-number">3</div>
                <div>Checkout and pay</div>
              </div>
              <div className="d-flex align-items-center">
                <div className="step-number">4</div>
                <div>Food delivered to your door</div>
              </div>
            </div>
            <div className="col-md-6 mt-4 mt-md-0">
              <img 
                src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Food delivery" 
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
