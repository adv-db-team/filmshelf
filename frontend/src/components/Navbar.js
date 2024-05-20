import React, { useState, useEffect, useRef } from 'react';
import '../styles/Navbar.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ onSearch }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const inputRef = useRef(null);
    const searchTypes = [
        'film-title:',
        'actor-name:',
        'starring:',
        'film-genre:',
        'film-director:'
    ];

    useEffect(() => {
        setQuery('');
        setSuggestions([]);
    }, [location.pathname]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.includes(':')) {
            setSuggestions([]);
        } else {
            setSuggestions(searchTypes.filter(type => type.includes(value)));
        }
    };

    const handleSearch = () => {
        if (query.startsWith('actor-name:')) {
            if (!location.pathname.endsWith('/actors-list')) {
                navigate('/actors-list', { state: { query } });
            } else {
                onSearch(query);
            }
        } else {
            if (!location.pathname.endsWith('/')) {
                navigate('/', { state: { query } });
            } else {
                onSearch(query);
            }
        }
        setSuggestions([]);
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion);
        setSuggestions([]);
        inputRef.current.focus();
    };

    const clearQuery = () => {
        setQuery('');
        setSuggestions([]);
        inputRef.current.focus();
        navigate(location.pathname, { state: { query: '' } })
    };

    return (
        <nav className="navbar">
            <div className="logo">My Film Shelf</div>
            <div className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                <a href="/">Movies</a>
            </div>
            <div className={`nav-link ${location.pathname === '/actors-list' ? 'active' : ''}`}>
                <a href="/actors-list">Actors</a>
            </div>
            <div className="search-bar">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search movies..."
                    value={query}
                    onChange={handleInputChange}
                />
                <button onClick={handleSearch}>Search</button>
                <button onClick={clearQuery}>Clear</button>
                {suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map((suggestion, index) => (
                            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
