import React from 'react';
import { Link } from 'react-router-dom';
import header from '../../photos/background.jpg';
import './Header.css';

const Header = () => {
    return (
        <div style={{ backgroundImage: `url(${header})` }} className="header"> 
            <img className="logo" src="https://www.shohoz.com/v2/assets/img/shohoz.svg" alt=""/> 
            <nav className="nav">
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link  to="/destination/bike">Destination</Link>
                    </li>
                    <li>
                        <Link className="login" to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;