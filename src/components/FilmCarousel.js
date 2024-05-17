import React, { useEffect, useState } from 'react';
import '../styles/FilmCarousel.css';
import Overlay from "./Overlay";

const FilmCarousel = ({ films, actors, onDelete }) => {
    const [currentFilmIndex, setCurrentFilmIndex] = useState(0);
    const [selectedFilm, setSelectedFilm] = useState(null);

    const actorsDictionary = actors.reduce((acc, actor) => {
        acc[actor.id] = actor.name;
        return acc;
    }, {});
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentFilmIndex((prevIndex) => (prevIndex + 1) % films.length);
        }, 10000);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [films.length]);

    const handlePrev = () => {
        setCurrentFilmIndex((prevIndex) => (prevIndex - 1 + films.length) % films.length);
    };

    const handleNext = () => {
        setCurrentFilmIndex((prevIndex) => (prevIndex + 1) % films.length);
    };

    if (films.length === 0) {
        return null;
    }


    return (
        <div className="film-carousel">
            {films.map((film, index) => (
                <div
                    key={film.id}
                    className="carousel-item"
                    style={{
                        transform: `translateX(${(index - currentFilmIndex) * 100}%)`,
                        backgroundImage: `url(${film.horizontalPosterUrl})`
                    }}
                >
                    <div className="carousel-text">
                        <div className="carousel-title">{film.title}</div>
                        <div className="carousel-description">{film.plot}</div>
                        <div className="carousel-credits">
                            <span><strong>Starring:</strong> {film.actors.map(actor_id => actorsDictionary[actor_id]).join(', ')}</span>
                            <span><strong>Director:</strong> {film.director}</span>
                        </div>
                        <div className="carousel-buttons">
                            <button className="carousel-button">Add to Favourites</button>
                            <button className="carousel-button secondary" onClick={() => setSelectedFilm(film)}>Read More</button>
                        </div>
                    </div>
                </div>
            ))}

            <button className="carousel-control left" onClick={handlePrev}>❮</button>
            <button className="carousel-control right" onClick={handleNext}>❯</button>

            <div className="carousel-progress">
                {films.map((_, index) => (
                    <div
                        key={index}
                        className={`circle ${index === currentFilmIndex ? 'active' : ''}`}
                    />
                ))}
            </div>

            {selectedFilm && (
                <Overlay
                    item={selectedFilm}
                    type="film"
                    onClose={() => setSelectedFilm(null)}
                    onDelete={onDelete}
                    actors={actors}
                />
            )}
        </div>
    );
};

export default FilmCarousel;
