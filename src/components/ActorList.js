import React, {useState} from 'react';
import '../styles/ActorList.css';
import Overlay from "./Overlay";

const ActorList = ({actors, films, onDelete}) => {
    const [selectedActor, setSelectedActor] = useState(null);

    return <div className="actor-list">
        <h2>Actors</h2>
        <ul>
            {actors.map(actor => (
                <li className="actor-link" key={actor.id} onClick={() => setSelectedActor(actor)}>
                    <img src={actor.photoUrl} alt={actor.name}/>
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
                films={films}
            />
        )}
    </div>
};

export default ActorList;
