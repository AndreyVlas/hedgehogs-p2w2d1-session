import axios from 'axios';
import React, { useState } from 'react';

export default function LoginPage() {
  const [error, setError] = useState({});
  const loginHandler = (e) => {
    e.preventDefault();
    axios.post('/api/user/login', Object.fromEntries(new FormData(e.target)))
      // eslint-disable-next-line no-return-assign
      .then(() => window.location = '/cars')
      .catch((err) => setError(err));
  };
  return (
    <div className="row">
      <form onSubmit={loginHandler}>
        <div className="mb-3">
          <label htmlFor="carsemail" className="form-label">
            Email address
            <input type="email" name="email" className="form-control" id="carsemail" />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="carspass" className="form-label">
            Password
            <input type="password" name="pass" className="form-control" id="carspass" />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
        {error.message && <div style={{ color: 'red' }}>{error.message}</div>}
      </form>
    </div>
  );
}
