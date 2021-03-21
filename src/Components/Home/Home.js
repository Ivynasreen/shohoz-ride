import React, { useEffect, useState } from 'react';
import './Home.css';
import data from '../../data/data.json';
import Ride from '../Ride/Ride';


const Home = () => {
    const [rides , setRides] = useState([]);
        const style = {
            display: 'flex',
            margin: '40px',
            justifyContent: 'space-between'
        }
        useEffect(() => {
            setRides(data);
        })
   
    return (
           <div style={style}>
            {
               rides.map(ride => <Ride ride  = {ride}></Ride>)
            }
        </div> 
       
    );
};

export default Home;