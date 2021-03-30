import React from 'react';
import fakeData from '../../Data/Data.json';
import Rides from '../Rides/Rides';
import { useState } from 'react';
import { useEffect } from 'react';
import './Home.css';
const Home = () => {
    const [rides, setRides] = useState([]);
    useEffect(() => {
        setRides(fakeData);
    }, [])
    return (
        <div className="container home">
            <div className="row d-flex align-items-center">
                {
                    rides.map(ride => <Rides ride={ride}></Rides>)
                }
            </div>
        </div>
    );
};

export default Home;