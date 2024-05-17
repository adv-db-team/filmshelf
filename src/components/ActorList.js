import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ActorList.css';

const ActorList = ({ actors }) => (
    <div className="actor-list">
        <h2>Actors</h2>
        <ul>
            {actors.map(actor => (
                <li key={actor.id}>
                    <Link to={`/actors/${actor.id}`} className="actor-link">
                        <img src={actor.photoUrl} alt={actor.name} />
                        <div className="actor-info">
                            <h3>{actor.name}</h3>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

export default ActorList;
