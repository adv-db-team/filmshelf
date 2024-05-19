import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => (
    <nav className="navbar">
        <div className="logo">My Film Shelf</div>
        <div className="nav-link">
            <a href="/">Movies</a>
        </div>
        <div className="nav-link">
            <a href="/actors-list">Actors</a>
        </div>
        <div className="search-bar">
            <input type="text" placeholder="Search movies..."/>
        </div>
    </nav>
);

export default Navbar;
