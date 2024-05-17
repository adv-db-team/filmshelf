// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import FilmCarousel from './components/FilmCarousel';
import FilmList from './components/FilmList';
import AddFilm from './components/AddFilm';
import './styles/App.css';
import FloatingActionButton from "./components/FloatingActionButton";
import ActorList from "./components/ActorList";

const App = () => {
  const [films, setFilms] = useState([]);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/films')
        .then(response => response.json())
        .then(data => setFilms(data));

    fetch('http://localhost:3001/actors')
        .then(response => response.json())
        .then(data => setActors(data));
  }, []);

  const handleAddFilm = (film) => {
    setFilms([...films, film]);
  };
  const handleAddActor = (actor) => {
    setActors([...actors, actor]);
  };
  const handleDeleteFilm = (filmId) => {
    // Delete film from your database
    fetch(`/api/films/${filmId}`, {
      method: 'DELETE'
    }).then(() => {
      setFilms(films.filter(film => film.id !== filmId));
    });
  };

  const handleDeleteActor = (actorId) => {
    // Delete actor from your database
    fetch(`/api/actors/${actorId}`, {
      method: 'DELETE'
    }).then(() => {
      setActors(actors.filter(actor => actor.id !== actorId));
    });
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
    return array;
  }

  return (
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={
              <>
                <FilmCarousel films={shuffle(films).slice(0, 5)} actors={actors} onDelete={handleDeleteFilm} />
                <FilmList films={films} actors={actors} onDelete={handleDeleteFilm}/>
                <FloatingActionButton onAddFilm={handleAddFilm} />
              </>
            } />
            <Route path="/actors-list" element={
              <>
                <ActorList actors={actors} films={films} onDelete={handleDeleteActor} />
                <FloatingActionButton onAddActor={handleAddActor} />
              </>
            } />
            <Route path="/add-film" element={<AddFilm onAddFilm={handleAddFilm} />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;
