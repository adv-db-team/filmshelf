import React, { useState } from 'react';
import FilmCard from './FilmCard';
import './FilmList.css';

const FilmList = ({ films, onDeleteFilm }) => {
    return (
        <div className="film-list">
            {films.map((film) => (
                <FilmCard key={film.id} film={film} onDeleteFilm={onDeleteFilm} />
            ))}
        </div>
    );
};

export default FilmList;
