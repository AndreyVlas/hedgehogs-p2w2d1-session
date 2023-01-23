import React, { useState } from 'react';
import axios from 'axios';

export default function SignUpPage() {
  const [error, setError] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    axios.post('/api/user/signup', formData)
      .then(() => {
        window.location = '/';
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="mb-3">
        <label htmlFor="carsemail" className="form-label">
          Email address
          <input type="email" name="email" className="form-control" id="carsemail" />
        </label>
        <label htmlFor="carsuser" className="form-label">
          Username
          <input type="text" name="username" className="form-control" id="carsuser" />
        </label>
        <label htmlFor="carspass" className="form-label">
          Password
          <input type="password" name="pass" className="form-control" id="carspass" />
        </label>
      </div>

      <button type="submit" className="btn btn-primary">Sign Up</button>
      {error.message && <div style={{ color: 'red' }}>{error.message}</div>}
    </form>
  );
}
