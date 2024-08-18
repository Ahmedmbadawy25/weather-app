import React from 'react';
import './Header.css';
import { FaSun } from "react-icons/fa";

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <FaSun className='sun' />
                <h1 className='h1'>Weather App</h1>

            </div>
        </header>
    );
};

export default Header;
