import React from 'react';
import FilmCard from './FilmCard';

const FilmList = ({ films, onDeleteFilm }) => {
    return (
        <div className="film-list">
            {films.map(film => (
                <FilmCard key={film._id} film={film} onDeleteFilm={onDeleteFilm} />
            ))}
        </div>
    );
};

export default FilmList;
