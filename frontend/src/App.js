import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import FilmCarousel from './components/FilmCarousel';
import FilmList from './components/FilmList';
import './styles/App.css';
import FloatingActionButton from "./components/FloatingActionButton";
import ActorList from "./components/ActorList";

const App = () => {
  const [films, setFilms] = useState([]);
  const [actors, setActors] = useState([]);
  const [moviesForCarousel, setMoviesForCarousel] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/movies_with_actors')
        .then(response => {
          return response.json();
        })
        .then(data => {
          setFilms(data)
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
      setFilms(films.filter(film => film.movie_id !== filmId));
    });
  };

  const handleDeleteActor = (actorId) => {
    fetch(`http://localhost:5000/actor/${actorId}`, {
      method: 'DELETE'
    }).then(() => {
      setActors(actors.filter(actor => actor.actor_id !== actorId));
    });
  };

  return (
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={
              <>
                <FilmCarousel films={moviesForCarousel} actors={actors} onDelete={handleDeleteFilm} />
                <FilmList films={films} actors={actors} onDelete={handleDeleteFilm} />
                <FloatingActionButton onAddFilm={handleAddFilm} onAddActor={handleAddActor} />
              </>
            } />
            <Route path="/actors-list" element={
              <>
                <ActorList actors={actors} films={films} onDelete={handleDeleteActor} />
                <FloatingActionButton onAddFilm={handleAddFilm} onAddActor={handleAddActor} />
              </>
            } />
          </Routes>
        </div>
      </Router>
  );
};

export default App;
