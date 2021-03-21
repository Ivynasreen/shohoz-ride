import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Ride.css';

const Ride = (props) => {
    const{image , name } = props.ride;

    const imageStyle = {
        width : '200px',
        height : '200px'
    }
    return (
        <div className = "rides">
            <img style = {imageStyle}  src={image} alt=""/>
            <h3 style = {{textAlign: 'center'}}> {name} </h3> 
            <Link className = "button" to = {`/destination/${name}`}>Book</Link>
        </div>
    );
};

export default Ride;