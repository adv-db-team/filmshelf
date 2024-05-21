import React, { useEffect, useState } from 'react';
import '../styles/FilmList.css';
import Overlay from "./Overlay";

const FilmList = ({ onDelete, searchQuery }) => {
    const [films, setFilms] = useState([]);
    const [selectedFilm, setSelectedFilm] = useState(null);

    useEffect(() => {
        const fetchFilms = () => {
            let url = 'http://localhost:5000/movies_with_actors';
            if (searchQuery) {
                url = `http://localhost:5000/search?query=${searchQuery}`;
            }
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setFilms(data);
                    } else {
                        console.error('Data is not an array:', data);
                        setFilms([]);
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setFilms([]);
                });
        };

        fetchFilms();
    }, [searchQuery]);

    return (
        <div className="film-list">
            <h2>Movies</h2>
            <ul>
                {films.map(film => (
                    <li className="film-link" key={film.id} onClick={() => setSelectedFilm(film)}>
                        <img src={film.image_url} alt={film.title} />
                        <div className="film-info">
                            <h3>{film.title}</h3>
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
                />
            )}
        </div>
    );
};

export default FilmList;
