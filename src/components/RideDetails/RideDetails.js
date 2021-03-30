import React from 'react';
import { useState } from 'react';
import peopleIcon from '../../images/peopleicon.png';
import { useParams } from 'react-router';
import Header from '../Header/Header';
import { useForm } from 'react-hook-form';
import fakeData3 from '../../Data/Data3.json';
import '../RideDetails/RideDetails.css';
import Map from '../../images/Map.png';

const RideDetails = () => {
    const [startingToEnding, setStartingToEnding] = useState({});
    const [toggle, setToggle] = useState(true);

    // hook
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        const location = startingToEnding;
        location.startFrom = data.startFrom;
        location.destination = data.destination;
        setStartingToEnding(location);
        setToggle(false); //setting toggler
    }

    //dynamic route
    const vehicleType = useParams().vehicleType || 'car';

    //fake-data-access
    const data = fakeData3;

    //custom-styling
    const styleImg = {
        maxWidth: '130px',
        maxHeight: '130px',
        width: 'auto',
        height: 'auto'
    };
    return (
        <div className="container">
            <Header />
            <hr></hr>
            <div className="heading primary">
            <h2>"Find Available Rides Near you to RechNow"</h2>
            </div>
            {
                (toggle) ?
                    (<div className="row">
                        <div className="col-md-6">
                            <div class="formContainer  mt-5">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div>
                                    <label>PICK FROM: <br />
                                            <select name="startFrom" ref={register}>
                                                <option value="Polton">Polton</option>
                                                <option value="Mirpur">Mirpur</option>
                                                <option value="Uttara">Uttara</option>
                                                <option value="Kazipara">Kazipara</option>
                                                <option value="Khilgaon">Khilgaon</option>
                                                <option value="Shahabag">Shahabag</option>
                                            </select>
                                        </label>
                                        <br />
                                        <label>PICK TO: <br />
                                            <select name="destination" ref={register}>
                                                <option value="Chwak Bazar">Chwak Bazar</option>
                                                <option value="MohammadPur">MohammadPur</option>
                                                <option value="Badda">Badda</option>
                                                <option value="Rampura">Rampura</option>
                                                <option value="Jatrabari">Jatrabari</option>
                                                <option value="Manik Nagar">Manik Nagar</option>
                                            </select>
                                        </label>
                                    </div>
                                     <br/>
                                    <input type="submit" value="SEARCH" />
                                </form>
                            </div>
                        </div>
                        <div className="col-md-6 mt-5">
                            <img src={Map} alt="" />
                        </div>
                    </div>
                    ) :
                    (
                        <div className="row">
                            <div className="col-md-6">
                                <div className="bg-info" style={{ padding: '40px 20px', borderRadius: '15px', color: 'white' }}>
                                    <h3>FROM: {startingToEnding.startFrom}</h3>
                                    <br />
                                    <h3>DESTINATION: {startingToEnding.destination} </h3>
                                </div>

                                {

                                    data !== null && data[vehicleType].map(vehicle => {
                                        return <>
                                            <div className="destinationContainerStyle d-flex justify-content-between mt-4">
                                                <div className="d-flex justify-content-start">
                                                    <img src={vehicle.image} className="img-thumbnail" alt="..." style={styleImg} />
                                                    <h4 className="ml-3">{vehicleType} {vehicle.capacity}</h4>
                                                    <img src={peopleIcon} className="ml-3" alt="..." style={styleImg} /></div>
                                                <h4>{vehicle.rent}</h4>
                                            </div>
                                        </>
                                    })
                                }
                            </div>
                            <div className="col-md-6 mt-5">
                                <img src={Map} alt="" />
                            </div>
                        </div>
                    )

            }

        </div>
    );
};

export default RideDetails;
