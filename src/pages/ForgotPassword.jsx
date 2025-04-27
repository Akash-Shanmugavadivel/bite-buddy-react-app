import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate validation/API call
    if (!email) {
      setError('Please enter a valid email address.');
      setMessage('');
    } else {
      setMessage('A password reset link has been sent to your email.');
      setError('');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h1 className="text-center mb-4">Forgot Password</h1>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {message && (
                <div className="alert alert-success" role="alert">
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
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

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Send Reset Link
                  </button>
                </div>
              </form>

              <div className="text-center mt-4">
                <p className="mb-0">
                  Remembered your password? <Link to="/login">Log In</Link>
                </p>
              </div>

              <div className="text-center mt-3">
                <p className="text-muted small mb-0">
                  Demo: Just enter any email to see a success message
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
