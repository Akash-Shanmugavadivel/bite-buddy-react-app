
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if there's a redirect parameter
  const params = new URLSearchParams(location.search);
  const redirectPath = params.get('redirect') || '/';
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }
    
    // Call the login function from AuthContext
    const success = login(email, password);
    
    if (success) {
      // Redirect after successful login
      navigate(redirectPath === 'checkout' ? '/checkout' : `/${redirectPath}`);
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };
  
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h1 className="text-center mb-4">Log In</h1>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Log In
                  </button>
                </div>
              </form>
              
              <div className="text-center mt-4">
                <p className="mb-0">
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
                <p className="mb-0">
                 Forgot password? <Link to="/forgotpassword">Forgot Password</Link>
                </p>
              </div>
              
              <div className="text-center mt-3">
                <p className="text-muted small mb-0">
                  Demo: Enter any email and password to login
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
