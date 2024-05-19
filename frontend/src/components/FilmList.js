import React, { useEffect, useState } from 'react';
import '../styles/FilmList.css';
import Overlay from "./Overlay";

const FilmList = ({ onDelete }) => {
    const [films, setFilms] = useState([]);
    const [actors, setActors] = useState([]);
    const [selectedFilm, setSelectedFilm] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/movies')
            .then(response => response.json())
            .then(data => setFilms(data));

        fetch('http://localhost:5000/actors')
            .then(response => response.json())
            .then(data => setActors(data));
    }, []);

    return (
        <div className="film-list">
            <h2>Movies</h2>
            <ul>
                {films.map(film => (
                    <li className="film-link" key={film.movie_id} onClick={() => setSelectedFilm(film)}>
                        <img src={film.posterUrl} alt={film.title} />
                        <div className="film-info">
                            <h3>{film.title}</h3>
                            <p>{film.plot}</p>
                        </div>
                    </li>
                ))}
            </ul>
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

export default FilmList;