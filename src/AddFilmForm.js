import React, { useState } from 'react';
import './AddFilmForm.css';

const AddFilmForm = ({ onAddFilm, onCancel }) => {
    const [newFilmData, setNewFilmData] = useState({
        title: '',
        director: '',
        year: '',
        genre: '',
        plot: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFilmData({ ...newFilmData, [name]: value });
    };

    const handleAddFilm = () => {
        onAddFilm(newFilmData);
        setNewFilmData({
            title: '',
            director: '',
            year: '',
            genre: '',
            plot: ''
        });
    };

    return (
        <div className="add-film-card add-film-form">
            <div className="overlay">
                <div className="overlay-content">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={newFilmData.title}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="director"
                        placeholder="Director"
                        value={newFilmData.director}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="year"
                        placeholder="Year"
                        value={newFilmData.year}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="genre"
                        placeholder="Genre"
                        value={newFilmData.genre}
                        onChange={handleInputChange}
                    />
                    <textarea
                        name="plot"
                        placeholder="Plot"
                        value={newFilmData.plot}
                        onChange={handleInputChange}
                    />
                    <div className="form-buttons">
                        <button className="confirm-button" onClick={handleAddFilm}>
                            Add Film
                        </button>
                        <button className="cancel-button" onClick={onCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddFilmForm;
