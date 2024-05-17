import React, { useState } from 'react';
import '../styles/AddFilm.css';

const AddFilm = ({ onAddFilm }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [actors, setActors] = useState('');

    const handleAddFilm = () => {
        onAddFilm({ title, description, actors: actors.split(',') });
        setTitle('');
        setDescription('');
        setActors('');
    };

    return (
        <div className="add-film">
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
            <button onClick={handleAddFilm}>Add Film</button>
        </div>
    );
};

export default AddFilm;
