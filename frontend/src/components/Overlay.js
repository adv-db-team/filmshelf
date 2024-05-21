import React, { useEffect, useState } from 'react';
import '../styles/Overlay.css';

const Overlay = ({ item, type, onClose, onDelete }) => {
    const [actorsFilms, setActorsFilms] = useState([]);
    const [filmGenres, setFilmGenres] = useState([]);

    useEffect(() => {
        if (type === 'actor') {
            fetch(`http://localhost:5000/actor/${item.id}/movies`)
                .then(response => response.json())
                .then(data => setActorsFilms(data));
        } else if (type === 'film') {
            fetch(`http://localhost:5000/movie/${item.id}/genres`)
                .then(response => response.json())
                .then(data => setFilmGenres(data));
        }
    }, [item, type]);

    if (!item) return null;

    const handleDelete = () => {
        onDelete(item.id);
        onClose();
    };

    const handleGenreClick = (genre) => {
        fetch(`http://localhost:5000/search?query=${genre}&type=genre`)
            .then(response => response.json())
            .then(data => {
                console.log(data); // You can update the state or handle the data as needed
            });
    };

    const handleActorDirectorClick = (name) => {
        fetch(`http://localhost:5000/search?query=${name}&type=actor`)
            .then(response => response.json())
            .then(data => {
                console.log(data); // You can update the state or handle the data as needed
            });
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
                                <p>{item.description}</p>
                                <p><strong>Year:</strong> {item.year}</p>
                                <p><strong>Director:</strong> <span className="tag" onClick={() => handleActorDirectorClick(item.director)}>{item.director}</span></p>
                                <div className="tags-container">
                                    <p><strong>Genres:</strong> {filmGenres.map(genre => <span key={genre} className="tag" onClick={() => handleGenreClick(genre)}>{genre}</span>)}</p>
                                </div>
                                <p><strong>Starring:</strong> {item.actors.map(actor => <span key={actor} className="tag" onClick={() => handleActorDirectorClick(actor)}>{actor}</span>)}</p>
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
