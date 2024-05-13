import React, { useState, useEffect } from 'react';
import FilmCard from './FilmCard';
import AddFilmForm from './AddFilmForm';
import Header from './Header';
import './App.css';

function App() {
    const [films, setFilms] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const response = await fetch('http://localhost:3001/films');
                if (!response.ok) {
                    throw new Error('Failed to fetch films');
                }
                const data = await response.json();
                setFilms(data);
            } catch (error) {
                console.error('Error fetching films:', error);
            }
        };

        fetchFilms();
    }, []);

    const handleDeleteFilm = async (filmId) => {
        if (window.confirm('Are you sure you want to delete this film?')) {
            try {
                const response = await fetch(`http://localhost:3001/films/${filmId}`, {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    throw new Error('Failed to delete film');
                }
                setFilms(prevFilms => prevFilms.filter(film => film.id !== filmId));
            } catch (error) {
                console.error('Error deleting film:', error);
            }
        }
    };

    const handleAddFilm = async (newFilm) => {
        try {
            const response = await fetch('http://localhost:3001/films', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newFilm)
            });
            if (!response.ok) {
                throw new Error('Failed to add film');
            }
            const data = await response.json();
            setFilms(prevFilms => [...prevFilms, data]);
            setShowAddForm(false);
        } catch (error) {
            console.error('Error adding film:', error);
        }
    };

    // Filter films based on search query
    const filteredFilms = films.filter(film => {
        const normalizedSearch = searchQuery.trim().toLowerCase();
        return (
            film.title.toLowerCase().includes(normalizedSearch) ||
            film.director.toLowerCase().includes(normalizedSearch) ||
            film.year.toString().includes(normalizedSearch) ||
            film.genre.toLowerCase().includes(normalizedSearch) ||
            film.plot.toLowerCase().includes(normalizedSearch)
        );
    });

    return (
        <div className="App">
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <div className="film-grid">
                {filteredFilms.map(film => (
                    <FilmCard key={film.id} film={film} onDeleteFilm={handleDeleteFilm} />
                ))}
            </div>
            {showAddForm ? (
                <AddFilmForm onAddFilm={handleAddFilm} onCancel={() => setShowAddForm(false)} />
            ) : (
                <button className="add-button" onClick={() => setShowAddForm(true)}>+</button>
            )}
        </div>
    );
}

export default App;
