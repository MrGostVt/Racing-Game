import { useState } from 'react';
import '../CSS/Vehicles.css'

const Wheel = ({wheelInfo}) => {
    return(
        <div className='Wheel' style={wheelInfo.styles}></div>
    );
}

const Truck = ({color = 'brown'}) => {
    const [wheels, setWheels] = useState([
        {
            index: 0,
            styles: {
                left: '14%',
                top: '10%',
            },
            type: 'front',
        },
        {
            index: 1,
            styles: {
                right: '14%',
                top: '10%',
            },
            type: 'front',
        },
        {
            index: 2,
            styles: {
                left: '15%',
                top: '65%',
                width: '2.5vh',
            },
            type: 'back',
        },
        {
            index: 3,
            styles: {
                left: '15%',
                top: '80%',
                width: '2.5vh',
            },
            type: 'back',
        },
        {
            index: 4,
            styles: {
                right: '15%',
                top: '65%',
                width: '2.5vh',
            },
            type: 'back',
        },
        {
            index: 5,
            styles: {
                right: '15%',
                top: '80%',
                width: '2.5vh',
            },
            type: 'back',
        },
    ]);    

    return(
        <div className='VehicleBody'>
            {wheels.map((val, index) => (
                <Wheel wheelInfo = {val} key = {val.index}/>
            ))}
            <div className='TruckFront'>
                <div className='TruckHood' style={{backgroundColor: color}}></div>
                <div className='TruckCab' style={{backgroundColor: color}}></div>
            </div>
            <div className='TruckBack'>
                <div className='TruckBalk' id='truckBalk1'></div>
                <div className='TruckBalk' id='truckBalk2'></div>
                <div className='TruckHitch'></div>
            </div>
        </div>
    );
}

const DefaultCar = ({color = 'brown'}) => {
    const [wheels, setWheels] = useState([
        {
            index: 0,
            styles: {
                left: '14%',
                top: '10%',
            },
            type: 'front',
        },
        {
            index: 1,
            styles: {
                right: '14%',
                top: '10%',
            },
            type: 'front',
        },
        {
            index: 2,
            styles: {
                left: '14%',
                top: '65%',
                width: '2.5vh',
            },
            type: 'back',
        },
        {
            index: 3,
            styles: {
                right: '14%',
                top: '65%',
                width: '2.5vh',
            },
            type: 'back',
        },
    ]);    

    return(
        <div className='VehicleBody'>
            {wheels.map((val, index) => (
                <Wheel wheelInfo = {val} key = {val.index}/>
            ))}
            <div className='DefaultCarFront'>
                <div className='DefaultCarHood' style={{backgroundColor: color}}></div>
                <div className='DefaultCarCab' style={{backgroundColor: color}}></div>
            </div>
            <div className='DefaultCarTrunk' style={{backgroundColor: color}}>
            </div>
        </div>
    );
}

export const defaultVehicles = [<Truck />, <DefaultCar />];