import React, { useState, useEffect } from 'react';
import '../styles/FloatingActionButton.css';

const predefinedGenres = [
    'Action', 'Adventure', 'Animation', 'Biography', 'Comedy',
    'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'Film-Noir',
    'History', 'Horror', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi',
    'Sport', 'Thriller', 'War', 'Western'
];

const FloatingActionButton = ({ onAddFilm, onAddActor }) => {
    const [isFormVisible, setFormVisible] = useState(false);
    const [formType, setFormType] = useState('film'); // 'film' or 'actor'
    const [existingFilms, setExistingFilms] = useState([]);
    const [existingActors, setExistingActors] = useState([]);

    // Film form states
    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [year, setYear] = useState('');
    const [description, setDescription] = useState('');
    const [actorsInput, setActorsInput] = useState('');
    const [actors, setActors] = useState([]);
    const [genreInput, setGenreInput] = useState('');
    const [genres, setGenres] = useState([]);
    const [poster, setPosterUrl] = useState('');
    const [horizontalPoster, setHorizontalPosterUrl] = useState('');

    // Actor form states
    const [name, setName] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [filmsInput, setFilmsInput] = useState('');
    const [filmography, setFilmography] = useState([]);
    const [photoUrl, setPhotoUrl] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/movies')
            .then(response => response.json())
            .then(data => setExistingFilms(data.map(film => film.title)));

        fetch('http://localhost:5000/actors')
            .then(response => response.json())
            .then(data => setExistingActors(data.map(actor => actor.name)));
    }, []);

    const handleAddFilm = () => {
        onAddFilm({ title, description, actors, director, genres, year, poster, horizontalPoster });
        resetFilmForm();
        setFormVisible(false);
    };

    const handleAddActor = () => {
        onAddActor({ name, birthYear, filmography: filmography.split(','), photoUrl });
        resetActorForm();
        setFormVisible(false);
    };

    const resetFilmForm = () => {
        setTitle('');
        setDirector('');
        setYear('');
        setGenres([]);
        setActors([]);
        setDescription('');
        setPosterUrl('');
        setHorizontalPosterUrl('');
    };

    const resetActorForm = () => {
        setName('');
        setBirthYear('');
        setFilmography([]);
        setPhotoUrl('');
    };

    const handleAddGenre = (e) => {
        const genre = e.target.value;
        if (genre && !genres.includes(genre)) {
            setGenres([...genres, genre]);
            setGenreInput('');
        }
    };

    const handleRemoveGenre = (genreToRemove) => {
        setGenres(genres.filter(genre => genre !== genreToRemove));
    };

    const handleAddActorTag = (e) => {
        const actor = e.target.value;
        if (actor && !actors.includes(actor)) {
            setActors([...actors, actor]);
            setActorsInput('');
        }
    };

    const handleRemoveActor = (actorToRemove) => {
        setActors(actors.filter(actor => actor !== actorToRemove));
    };

    const handleAddFilmTag = (e) => {
        const film = e.target.value;
        if (film && !filmography.includes(film)) {
            setFilmography([...filmography, film]);
            setFilmsInput('');
        }
    };

    const handleRemoveFilm = (filmToRemove) => {
        setFilmography(filmography.filter(film => film !== filmToRemove));
    };

    const isFilmFormValid = () => {
        return title && director && year && description && actors.length > 0 && genres.length > 0 && poster;
    };

    const isActorFormValid = () => {
        return name && birthYear && filmography && photoUrl;
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
                            <input
                                type="text"
                                placeholder="Director"
                                value={director}
                                onChange={e => setDirector(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Year"
                                value={year}
                                onChange={e => setYear(e.target.value)}
                            />
                            <div className="dropdown">
                                <select onChange={handleAddGenre} value={genreInput}>
                                    <option value="" disabled>Select genre</option>
                                    {predefinedGenres.map(genre => (
                                        <option key={genre} value={genre}>{genre}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="tags-container">
                                {genres.map(genre => (
                                    <span key={genre} className="tag" onClick={() => handleRemoveGenre(genre)}>
                                        {genre} ✖
                                    </span>
                                ))}
                            </div>
                            <div className="dropdown">
                                <select onChange={handleAddActorTag} value={actorsInput}>
                                    <option value="" disabled>Select actor</option>
                                    {existingActors.map(actor => (
                                        <option key={actor} value={actor}>{actor}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="tags-container">
                                {actors.map(actor => (
                                    <span key={actor} className="tag" onClick={() => handleRemoveActor(actor)}>
                                        {actor} ✖
                                    </span>
                                ))}
                            </div>
                            <input
                                type="text"
                                placeholder="Poster URL"
                                value={poster}
                                onChange={e => setPosterUrl(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Horizontal poster URL (optional)"
                                value={horizontalPoster}
                                onChange={e => setHorizontalPosterUrl(e.target.value)}
                            />
                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                            <button onClick={handleAddFilm} disabled={!isFilmFormValid()}>Add Film</button>
                            <button onClick={resetFilmForm} className="clear-button">Clear</button>
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
                            <div className="dropdown">
                                <select onChange={handleAddFilmTag} value={filmsInput}>
                                    <option value="" disabled>Select film</option>
                                    {existingFilms.map(film => (
                                        <option key={film} value={film}>{film}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="tags-container">
                                {filmography.map(film => (
                                    <span key={film} className="tag" onClick={() => handleRemoveFilm(film)}>
                                        {film} ✖
                                    </span>
                                ))}
                            </div>
                            <input
                                type="text"
                                placeholder="Photo URL"
                                value={photoUrl}
                                onChange={e => setPhotoUrl(e.target.value)}
                            />
                            <button onClick={handleAddActor} disabled={!isActorFormValid()}>Add Actor</button>
                            <button onClick={resetActorForm} className="clear-button">Clear</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FloatingActionButton;
