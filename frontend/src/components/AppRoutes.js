import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import FilmCarousel from './FilmCarousel';
import FilmList from './FilmList';
import FloatingActionButton from './FloatingActionButton';
import ActorList from './ActorList';

const AppRoutes = ({ films, actors, moviesForCarousel, handleSearch, handleAddFilm, handleAddActor, handleDeleteFilm, handleDeleteActor, searchQuery }) => {
    const location = useLocation();
    const path = location.pathname;

    const currentSearchQuery = location.state?.query || searchQuery;

    return (
        <>
            <Navbar onSearch={handleSearch} pageName={path} />
            <Routes>
                <Route path="/" element={
                    <>
                        <FilmCarousel films={moviesForCarousel} actors={actors} onDelete={handleDeleteFilm} />
                        <FilmList searchQuery={currentSearchQuery} films={films} actors={actors} onDelete={handleDeleteFilm} />
                        <FloatingActionButton onAddFilm={handleAddFilm} onAddActor={handleAddActor} />
                    </>
                } />
                <Route path="/actors-list" element={
                    <>
                        <ActorList searchQuery={currentSearchQuery} onDelete={handleDeleteActor} />
                        <FloatingActionButton onAddFilm={handleAddFilm} onAddActor={handleAddActor} />
                    </>
                } />
            </Routes>
        </>
    );
};

export default AppRoutes;
