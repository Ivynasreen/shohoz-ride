import { findByLabelText } from '@testing-library/dom';
import React from 'react';
import { Redirect, useParams } from 'react-router';
import data from '../../data/data.json';

const Vehicle = (props) => {
    const {image , name, price} = props.vehicle;
    const style = {
        border : '10px solid white',
        boxShadow: '10px 10px 10px lightgrey',
        borderRadius: '10px',
        width : '40%',
        margin : '10px',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between'
    }
    return (
        <div style = {style}>
           <img style = {{width: '80px'}}src={image} alt=""/><h4>{name}</h4><h4>${price}</h4>
        </div>
    );
};

export default Vehicle;
