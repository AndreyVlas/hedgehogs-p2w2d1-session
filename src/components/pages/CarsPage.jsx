import React, { useState } from 'react';
import CarForm from '../ui/CarForm';
import OneCarCard from '../ui/OneCarCard';

export default function CarsPage({ allCars, user }) {
  const [cars, setCars] = useState(allCars || []);
  return (
    <div className="row">
      <div className="col-3">
        <CarForm setCars={setCars} />
      </div>
      <div className="col-9">
        <div className="row">
          {cars?.map((car) => <OneCarCard setCars={setCars} user={user} car={car} key={car?.id} />)}
        </div>
      </div>
    </div>
  );
}
