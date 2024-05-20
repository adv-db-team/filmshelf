import React, { useEffect, useState } from 'react';
import '../styles/Overlay.css';

const Overlay = ({ item, type, onClose, onDelete }) => {
    const [actorsFilms, setActorsFilms] = useState([]);
    const [filmGenres, setFilmGenres] = useState([]);

    useEffect(() => {
        if (type === 'actor') {
            fetch(`http://localhost:5000/actor/${item.actor_id}/movies`)
                .then(response => response.json())
                .then(data => setActorsFilms(data));
        } else if (type === 'film') {
            fetch(`http://localhost:5000/movie/${item.movie_id}/genres`)
                .then(response => response.json())
                .then(data => setFilmGenres(data));
        }
    }, [item, type]);

    if (!item) return null;

    const handleDelete = () => {
        onDelete(item.movie_id || item.actor_id);
        onClose();
    };

    return (
        <div className="overlay">
            <div className="overlay-content">
                <button className="close-button" onClick={onClose}>✖</button>
                <div className="overlay-body">
                    <div className="overlay-text">
                        <h2>{type === 'film' ? item.title : item.name}</h2>
                        {type === 'film' ? (
                            <>
                                <p>{item.plot}</p>
                                <p><strong>Year:</strong> {item.year}</p>
                                <p><strong>Director:</strong> {item.director}</p>
                                <div className="tags-container">
                                    <p><strong>Genres:</strong> {filmGenres.map(genre => <span key={genre} className="tag">{genre}</span>)}</p>
                                </div>
                                <p><strong>Starring:</strong> {item.actors.join(', ')}</p>
                            </>
                        ) : (
                            <>
                                <p><strong>Filmography:</strong> {actorsFilms.join(', ')}</p>
                            </>
                        )}
                        <button className="delete-button" onClick={handleDelete}>Delete</button>
                    </div>
                    <div className="overlay-image-container">
                        <img src={type === 'film' ? item.image_url : item.image_url} alt={type === 'film' ? item.title : item.name} className="overlay-image" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overlay;
