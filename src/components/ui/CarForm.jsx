import axios from 'axios';
import React from 'react';

export default function CarForm({ setCars }) {
  const submitCarHandler = (e) => {
    e.preventDefault();
    axios.post('/api/car/', Object.fromEntries(new FormData(e.target)))
      .then((res) => setCars((prev) => [res.data, ...prev]))
      .catch(console.log);
  };
  return (
    <form onSubmit={submitCarHandler}>
      <div className="mb-3">
        <label htmlFor="carbrand" className="form-label">
          Brand
          <input type="text" name="brand" className="form-control" id="carbrand" />
        </label>
      </div>
      <div className="mb-3">
        <label htmlFor="carmodel" className="form-label">
          Model
          <input type="text" name="model" className="form-control" id="carmodel" />
        </label>
      </div>
      <button type="submit" className="btn btn-primary">Add</button>
    </form>
  );
}
