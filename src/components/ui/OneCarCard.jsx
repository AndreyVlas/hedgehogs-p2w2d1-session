import React from 'react';

export default function OneCarCard({ car, user }) {
  return (
    <div className="card col-4">
      <div className="card-header">
        {car?.brand}
      </div>
      <div className="card-body">
        <h5 className="card-title">{car?.model}</h5>
        <p className="card-text">{car?.User?.username}</p>
        {user?.id === car?.User?.id && <button type="button" className="btn btn-danger">Delete</button>}
      </div>
    </div>
  );
}
