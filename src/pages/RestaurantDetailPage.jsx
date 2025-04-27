import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
    const foundRestaurant = restaurants.find(r => r.id === id);
    setRestaurant(foundRestaurant);
    
    const restaurantMenu = getMenu(id);
    setMenu(restaurantMenu);
    
    const uniqueCategories = [...new Set(restaurantMenu.map(item => item.category))];
    setCategories(uniqueCategories);
    
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
  
  const faqs = [
    {
      question: "What are your delivery hours?",
      answer: "We deliver from 10 AM to 11 PM daily. Last orders are accepted at 10:30 PM."
    },
    {
      question: "Do you have minimum order value?",
      answer: "Yes, minimum order value varies by restaurant but typically starts at ₹200."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept UPI, credit/debit cards, net banking, and cash on delivery."
    },
    {
      question: "Is there a delivery fee?",
      answer: "Delivery fees start at ₹30 and may vary based on distance and order value."
    }
  ];
  
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
          <p className="text-muted">{restaurant.cuisine} • {restaurant.deliveryTime} min • {restaurant.distance} km</p>
          <div className="d-flex align-items-center mb-2">
            <span className="badge bg-success me-2">{restaurant.rating}★</span>
            <span className="text-muted">Express Delivery</span>
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
      
      <div className="row">
        <div className="col-md-8">
          <h2 className="mb-4">Menu</h2>
          {filteredMenu.map((item) => (
            <MenuItem 
              key={item.id} 
              item={item} 
              restaurant={restaurant} 
            />
          ))}
        </div>
        
        <div className="col-md-4">
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

          <div className="card border-0 shadow-sm mt-4">
            <div className="card-body">
              <h4 className="mb-3">Frequently Asked Questions</h4>
              <Accordion type="single" collapsible>
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
