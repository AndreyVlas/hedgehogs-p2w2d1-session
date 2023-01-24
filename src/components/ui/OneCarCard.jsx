import axios from 'axios';
import React from 'react';

export default function OneCarCard({ car, user, setCars }) {
  const deleteHandler = () => {
    axios.delete(`/api/car/${car.id}`)
      .then(() => setCars(
        (prev) => prev
          .filter((oneCar) => oneCar.id !== car.id),
      ))
      .catch(console.log);
  };

  return (
    <div className="card col-3">
      <div className="card-header">
        {car?.brand}
      </div>
      <div className="card-body">
        <h5 className="card-title">{car?.model}</h5>
        <p className="card-text">{car?.User?.username}</p>
        <button type="button" onClick={deleteHandler} className="btn btn-danger" disabled={user?.id !== car?.User?.id}>Delete</button>
      </div>
    </div>
  );
}
