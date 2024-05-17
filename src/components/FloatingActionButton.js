import React, { useState } from 'react';
import '../styles/FloatingActionButton.css';

const FloatingActionButton = ({ onAddFilm }) => {
    const [isFormVisible, setFormVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [actors, setActors] = useState('');
    const [director, setDirector] = useState('');

    const handleAddFilm = () => {
        onAddFilm({ title, description, actors: actors.split(','), director });
        setTitle('');
        setDescription('');
        setActors('');
        setDirector('');
        setFormVisible(false);
    };

    return (
        <div className={`fab-container ${isFormVisible ? 'expanded' : ''}`}>
            <div className="fab" onClick={() => setFormVisible(!isFormVisible)}>
                +
            </div>
            {isFormVisible && (
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
            )}
        </div>
    );
};

export default FloatingActionButton;
