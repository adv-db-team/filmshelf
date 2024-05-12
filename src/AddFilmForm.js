import React, { useState } from 'react';

const AddFilmForm = ({ onAddFilm, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        director: '',
        year: '',
        genre: '',
        plot: '',
        posterUrl: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddFilm({
            id: Date.now(),
            ...formData
        });
        setFormData({
            title: '',
            director: '',
            year: '',
            genre: '',
            plot: '',
            posterUrl: ''
        });
    };

    return (
        <div className="add-film-form">
            <h2>Add New Film</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                <input type="text" name="director" placeholder="Director" value={formData.director} onChange={handleChange} required />
                <input type="number" name="year" placeholder="Year" value={formData.year} onChange={handleChange} required />
                <input type="text" name="genre" placeholder="Genre" value={formData.genre} onChange={handleChange} required />
                <input type="text" name="plot" placeholder="Plot" value={formData.plot} onChange={handleChange} required />
                <input type="url" name="posterUrl" placeholder="Poster URL" value={formData.posterUrl} onChange={handleChange} required />
                <div className="form-buttons">
                    <button type="submit">Add Film</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddFilmForm;
