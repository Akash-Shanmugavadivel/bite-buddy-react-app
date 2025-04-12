
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-3 mb-4 mb-md-0">
            <h5>Bite Buddy</h5>
            <p className="text-muted">
              The best food, delivered to your doorstep.
            </p>
          </div>
          
          <div className="col-md-3 mb-4 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-reset">Home</Link></li>
              <li><Link to="/restaurants" className="text-reset">Restaurants</Link></li>
              <li><Link to="/cart" className="text-reset">Cart</Link></li>
            </ul>
          </div>
          
          <div className="col-md-3 mb-4 mb-md-0">
            <h5>Legal</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-reset">Terms of Service</a></li>
              <li><a href="#" className="text-reset">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div className="col-md-3">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li><a href="mailto:info@bitebuddy.com" className="text-reset">info@bitebuddy.com</a></li>
              <li><a href="tel:+11234567890" className="text-reset">+1 (123) 456-7890</a></li>
            </ul>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <p className="mb-0">&copy; 2023 Bite Buddy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
