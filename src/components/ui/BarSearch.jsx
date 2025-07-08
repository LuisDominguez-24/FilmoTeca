import React from 'react';
import "../../Styles/BarSearch.css";
import IconSearch from '../../assets/icons/iconSearch.png';

export const BarSearch = ({ value, onChange, placeholder = "Buscar..." }) => {
    return (
        <div className="bar-search-container">
            <div className="bar-search-input-wrapper">
                <img
                    src={IconSearch}
                    alt="Buscar Pelicula, Serie en Filmoteca..."
                    className="bar-search-icon"
                />
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="bar-search-input"
                />
            </div>
        </div>
    );
};