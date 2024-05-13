import React from 'react';
import './Header.css';

const Header = ({ searchQuery, setSearchQuery }) => {
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="header">
            <div className="header-content">
                <h1 className="heading">My Film Shelf</h1>
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search films..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;
