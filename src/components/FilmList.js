import React, {useState} from 'react';
import '../styles/FilmList.css';
import Overlay from "./Overlay";

const FilmList = ({ films, actors, onDelete }) => {
    const [selectedFilm, setSelectedFilm] = useState(null);

    return <div className="film-list">
        <h2>Movies</h2>
        <ul>
            {films.map(film => (
                <li className="film-link" key={film.id} onClick={() => setSelectedFilm(film)}>
                    <img src={film.posterUrl} alt={film.title}/>
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
};

export default FilmList;
