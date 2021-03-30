import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import '../Rides/Rides.css';
const Rides = (props) => {
    const [rideDetails, setRideDetails] = useContext(UserContext);
    const { rideName, image, vehicleType } = props.ride;
    return (
        
        <div className="col-md-3 col-sm-12 m-top">
            <Link className="d-inline=block" to={`/vehicle/${vehicleType}`}>
            <div class="card d-inline-block">
                <img src={image} class="card-img-top img-fluid img-siz" alt="..."></img>
                <div class="card-body">
                    <h5 class="card-title text-center">{rideName}</h5>
                </div>
            </div>           
           </Link> 
        </div>
    );
};

export default Rides;