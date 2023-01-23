import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CarsPage from './pages/CarsPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUpPage';
import NavBar from './ui/NavBar';

export default function App({ user, allCars }) {
  return (
    <div className="container">
      <NavBar user={user} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/cars" element={<CarsPage user={user} allCars={allCars} />} />
      </Routes>
    </div>
  );
}
