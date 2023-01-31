import axios from 'axios';
import React, { useState } from 'react';

export default function OneCarCard({ car, user, setCars }) {
  const deleteHandler = () => {
    axios.delete(`/api/car/${car.id}`)
      .then(() => setCars(
        (prev) => prev
          .filter((oneCar) => oneCar.id !== car.id),
      ))
      .catch(console.log);
  };
  const [editState, setEditState] = useState(false);
  const [editData, setEditData] = useState({
    brand: car?.brand,
    model: car?.model,
  });
  const changeHandler = (e) => setEditData(
    (prev) => ({ ...prev, [e.target.name]: e.target.value }),
  );

  const editHandler = () => {
    if (editState) {
      axios.patch(`/api/car/${car.id}`, editData)
        .then(() => {
          setEditState(false);
          setCars((prev) => prev.map((oneCar) => (oneCar.id !== car.id
            ? oneCar
            : { ...oneCar, ...editData }
          )));
        })
        .catch(console.log);
    } else {
      setEditState(true);
    }
  };

  console.log('render');

  return (
    <div className="card m-3" style={{ maxWidth: '540px' }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={car?.photo} className="img-fluid rounded-start" alt={`${car?.brand} ${car?.model}`} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            {editState
              ? (
                <>
                  <input onChange={changeHandler} type="text" name="brand" className="form-control" value={editData?.brand} />
                  <input onChange={changeHandler} type="text" name="model" className="form-control" value={editData?.model} />
                </>
              )
              : (
                <>
                  <h5 className="card-title">
                    {car?.brand}
                  </h5>
                  <p className="card-text">{car?.model}</p>
                </>
              )}

            <p className="card-text"><small className="text-muted">{car?.User?.username}</small></p>
            <button type="button" onClick={deleteHandler} className="btn btn-danger" disabled={user?.id !== car?.User?.id}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
              </svg>
            </button>
            <button onClick={editHandler} type="button" className="btn btn-info" disabled={user?.id !== car?.User?.id}>
              {editState
                ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-save" viewBox="0 0 16 16">
                    <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                  </svg>
                )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
