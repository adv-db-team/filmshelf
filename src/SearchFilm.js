import React, { useState } from 'react';

function SearchFilm({ films }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredFilms = films.filter(film =>
        film.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search films"
                value={searchTerm}
                onChange={handleSearch}
            />
            <ul>
                {filteredFilms.map(film => (
                    <li key={film.id}>{film.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default SearchFilm;
