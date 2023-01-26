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
    <div className="card m-3" style={{ maxWidth: '540px' }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={car?.photo} className="img-fluid rounded-start" alt={`${car?.brand} ${car?.model}`} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              {car?.brand}
            </h5>
            <p className="card-text">{car?.model}</p>
            <p className="card-text"><small className="text-muted">{car?.User?.username}</small></p>
            <button type="button" onClick={deleteHandler} className="btn btn-danger" disabled={user?.id !== car?.User?.id}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
