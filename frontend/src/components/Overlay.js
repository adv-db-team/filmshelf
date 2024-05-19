import React from 'react';
import '../styles/Overlay.css';

const Overlay = ({ item, type, onClose, onDelete, films, actors }) => {
    if (!item) return null;

    const actorsDictionary = actors ? actors.reduce((acc, actor) => {
        acc[actor.actor_id] = actor.name;
        return acc;
    }, {}) : {};

    const filmsDictionary = films ? films.reduce((acc, film) => {
        acc[film.movie_id] = film.title;
        return acc;
    }, {}) : {};

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
                                    <p><strong>Genres:</strong> {item.genre.map(genre => <span key={genre} className="tag">{genre}</span>)}</p>
                                </div>
                                <p><strong>Starring:</strong> {item.actors.map(actor_id => actorsDictionary[actor_id]).join(', ')}</p>
                            </>
                        ) : (
                            <>
                                <p><strong>Birth Year:</strong> {item.birthYear}</p>
                                <p><strong>Filmography:</strong> {item.filmography.map(film_id => filmsDictionary[film_id]).join(', ')}</p>
                            </>
                        )}
                        <button className="delete-button" onClick={handleDelete}>Delete</button>
                    </div>
                    <div className="overlay-image-container">
                        <img src={type === 'film' ? item.posterUrl : item.photoUrl} alt={type === 'film' ? item.title : item.name} className="overlay-image" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overlay;
