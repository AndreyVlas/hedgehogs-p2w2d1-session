import axios from 'axios';
import React from 'react';

export default function NavBar({ user }) {
  const logoutHandler = () => {
    axios('/api/user/logout')
      .then(() => {
        window.location = '/';
      })
      .catch(console.log);
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        {user?.id ? (
          <a className="navbar-brand" href="/">
            Hello,
            {' '}
            {user.username}
          </a>
        ) : (
          <a className="navbar-brand" href="/">
            Guest
          </a>
        )}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link active" href="/">Home</a>
            <a className="nav-link active" href="/callapi">CORS</a>
            {!user?.id && (
              <>
                <a className="nav-link" href="/login">Login</a>
                <a className="nav-link" href="/signup">Signup</a>
              </>
            )}
            {user?.id && <a className="nav-link" href="/cars">Cars</a>}
          </div>
        </div>
        {user?.id && <button onClick={logoutHandler} type="button" className="btn btn-dark">Logout</button>}
      </div>
    </nav>
  );
}
