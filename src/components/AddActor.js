import React, { useState } from 'react';
import '../styles/AddActor.css';

const AddActor = ({ onAddActor }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [actors, setActors] = useState('');

    const handleAddActor = () => {
        onAddActor({ title, description, actors: actors.split(',') });
        setTitle('');
        setDescription('');
        setActors('');
    };

    return (
        <div className="add-actor">
            <h2>Add Actor</h2>
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
            <button onClick={handleAddActor}>Add Actor</button>
        </div>
    );
};

export default AddActor;
