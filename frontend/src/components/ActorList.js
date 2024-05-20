import React, { useEffect, useState } from 'react';
import '../styles/ActorList.css';
import Overlay from "./Overlay";

const ActorList = ({ onDelete }) => {
    const [actors, setActors] = useState([]);
    const [selectedActor, setSelectedActor] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/actors')
            .then(response => response.json())
            .then(data => setActors(data));
    }, []);

    return (
        <div className="actor-list">
            <h2>Actors</h2>
            <ul>
                {actors.map(actor => (
                    <li className="actor-link" key={actor.actor_id} onClick={() => setSelectedActor(actor)}>
                        <img src={actor.image_url} alt={actor.name} />
                        <div className="actor-info">
                            <h3>{actor.name}</h3>
                        </div>
                    </li>
                ))}
            </ul>
            {selectedActor && (
                <Overlay
                    item={selectedActor}
                    type="actor"
                    onClose={() => setSelectedActor(null)}
                    onDelete={onDelete}
                />
            )}
        </div>
    );
};

export default ActorList;
