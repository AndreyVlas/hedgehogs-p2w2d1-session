import React, { useState } from 'react';
import axios from 'axios';

export default function SignUpPage() {
  const [error, setError] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const {
      email, pass, passRepeat, username,
    } = formData;
    if (!(pass && passRepeat && username)) {
      return setError({
        message: 'Password and username must be non-empty',
      });
    } if (pass !== passRepeat) {
      return setError({
        message: 'Passwords do not match',
      });
    }
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
    <div className="row">
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="carsemail" className="form-label">
            Email address
            <input type="email" name="email" className="form-control" id="carsemail" />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="carsuser" className="form-label">
            Username
            <input type="text" name="username" className="form-control" id="carsuser" />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="carspass" className="form-label">
            Password
            <input type="password" name="pass" className="form-control" id="carspass" />
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="carspass" className="form-label">
            Repeat password
            <input type="password" name="passRepeat" className="form-control" id="carspass" />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
        {error.message && <div style={{ color: 'red' }}>{error.message}</div>}
      </form>
    </div>
  );
}
