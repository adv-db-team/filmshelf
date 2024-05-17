import React, { useState } from 'react';
import '../styles/FloatingActionButton.css';

const FloatingActionButton = ({ onAddFilm, onAddActor }) => {
    const [isFormVisible, setFormVisible] = useState(false);
    const [formType, setFormType] = useState('film'); // 'film' or 'actor'

    // Film form states
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [actors, setActors] = useState('');
    const [director, setDirector] = useState('');

    // Actor form states
    const [name, setName] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [filmography, setFilmography] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');

    const handleAddFilm = () => {
        onAddFilm({ title, description, actors: actors.split(','), director });
        setTitle('');
        setDescription('');
        setActors('');
        setDirector('');
        setFormVisible(false);
    };

    const handleAddActor = () => {
        onAddActor({ name, birthYear, filmography: filmography.split(','), photoUrl });
        setName('');
        setBirthYear('');
        setFilmography('');
        setPhotoUrl('');
        setFormVisible(false);
    };

    return (
        <div className={`fab-container ${isFormVisible ? 'expanded' : ''}`}>
            <div className="fab" onClick={() => setFormVisible(!isFormVisible)}>
                +
            </div>
            {isFormVisible && (
                <div className="form-container">
                    <div className="form-toggle">
                        <button onClick={() => setFormType('film')} className={formType === 'film' ? 'active' : ''}>Add Film</button>
                        <button onClick={() => setFormType('actor')} className={formType === 'actor' ? 'active' : ''}>Add Actor</button>
                    </div>
                    {formType === 'film' ? (
                        <div className="film-form">
                            <h2>Add Film</h2>
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Actors (comma-separated)"
                                value={actors}
                                onChange={e => setActors(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Director"
                                value={director}
                                onChange={e => setDirector(e.target.value)}
                            />
                            <button onClick={handleAddFilm}>Add Film</button>
                        </div>
                    ) : (
                        <div className="actor-form">
                            <h2>Add Actor</h2>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Birth Year"
                                value={birthYear}
                                onChange={e => setBirthYear(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Filmography (comma-separated)"
                                value={filmography}
                                onChange={e => setFilmography(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Photo URL"
                                value={photoUrl}
                                onChange={e => setPhotoUrl(e.target.value)}
                            />
                            <button onClick={handleAddActor}>Add Actor</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FloatingActionButton;
