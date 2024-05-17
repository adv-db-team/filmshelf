import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/FilmList.css';

const FilmList = ({ films }) => (
    <div className="film-list">
        <h2>Movies</h2>
        <ul>
            {films.map(film => (
                <li key={film.id}>
                    <Link to={`/films/${film.id}`} className="film-link">
                        <img src={film.posterUrl} alt={film.title} />
                        <div className="film-info">
                            <h3>{film.title}</h3>
                            <p>{film.plot}</p>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

export default FilmList;
