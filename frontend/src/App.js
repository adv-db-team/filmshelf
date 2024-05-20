import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './components/AppRoutes';
import './styles/App.css';

const App = () => {
    const [films, setFilms] = useState([]);
    const [actors, setActors] = useState([]);
    const [moviesForCarousel, setMoviesForCarousel] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    useEffect(() => {
        fetch('http://localhost:5000/movies_with_actors')
            .then(response => response.json())
            .then(data => {
                setFilms(data);
            })
            .catch(error => console.error('There was a problem with the fetch operation:', error));

        fetch('http://localhost:5000/actors')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setActors(data))
            .catch(error => console.error('There was a problem with the fetch operation:', error));

        fetch('http://localhost:5000/movies_with_horizontal_posters')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setMoviesForCarousel(data))
            .catch(error => console.error('There was a problem with the fetch operation:', error));
    }, []);

    const handleAddFilm = (film) => {
        fetch('http://localhost:5000/movie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(film)
        })
            .then(response => response.json())
            .then(newFilm => {
                setFilms([...films, newFilm]);
            });
    };

    const handleAddActor = (actor) => {
        fetch('http://localhost:5000/actor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(actor)
        })
            .then(response => response.json())
            .then(newActor => {
                setActors([...actors, newActor]);
            });
    };

    const handleDeleteFilm = (filmId) => {
        fetch(`http://localhost:5000/movie/${filmId}`, {
            method: 'DELETE'
        }).then(() => {
            setFilms(films.filter(film => film.id !== filmId));
        });
    };

    const handleDeleteActor = (actorId) => {
        fetch(`http://localhost:5000/actor/${actorId}`, {
            method: 'DELETE'
        }).then(() => {
            setActors(actors.filter(actor => actor.id !== actorId));
        });
    };

    return (
        <Router>
            <div className="App">
                <AppRoutes
                    films={films}
                    actors={actors}
                    moviesForCarousel={moviesForCarousel}
                    handleSearch={handleSearch}
                    handleAddFilm={handleAddFilm}
                    handleAddActor={handleAddActor}
                    handleDeleteFilm={handleDeleteFilm}
                    handleDeleteActor={handleDeleteActor}
                    searchQuery={searchQuery}
                />
            </div>
        </Router>
    );
};

export default App;
