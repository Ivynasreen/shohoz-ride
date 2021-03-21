import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData/data.json';
import { useParams } from 'react-router-dom';
import Vehicle from '../Vehicle/Vehicle';

const Destination = () => {
    const {name} = useParams();
    const [vehicles , setVehicles] = useState([]);
    const [location , setLocation] = useState ([]);
    const selectedVehicle = vehicles.filter(vh => vh.name === name)
    console.log(selectedVehicle);
    useEffect (() => {
        setVehicles(fakeData);
        setLocation(fakeData);
    })
    const [search , setSearch] = useState(false)
    const handleSearch = (e) => {
        setSearch(true);
        e.preventDefault();
    }
     
    const handleChange = () => {
        
    }
    return (
        <div>
            {
                !search  && (<div><h4>Pick from</h4>
                    <input onClick = {handleChange} type="search" placeholder = "From" id=""/>
                    <h4>Pick to</h4>
                    <input type="search" placeholder = "To" id=""/>
                    <br />
                    <button onClick = {handleSearch} class = "btn btn-danger">Search</button>
                    <br/></div>)  
            }
            {
                search &&  selectedVehicle.map(vehicle => <Vehicle vehicle = {vehicle}></Vehicle>)
            }
        </div>
    )
};
export default Destination;