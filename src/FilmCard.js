import React, { useState } from 'react';
import './FilmCard.css';

const FilmCard = ({ film, onDeleteFilm }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleDelete = () => {
        onDeleteFilm(film.id);
    };

    return (
        <div
            className="film-card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img src={film.posterUrl} alt={film.title} className="film-poster" />
            {isHovered && (
                <div className="overlay">
                    <div className="overlay-content">
                        <h3>{film.title}</h3>
                        <p><strong>Director:</strong> {film.director}</p>
                        <p><strong>Year:</strong> {film.year}</p>
                        <p><strong>Genre:</strong> {film.genre}</p>
                        <p><strong>Plot:</strong> {film.plot}</p>
                        <button className="delete-btn" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilmCard;
