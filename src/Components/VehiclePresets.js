import { useState, useRef, useEffect } from 'react';
import '../CSS/Vehicles.css'
import Vehicle from '../Logic/Vehicle';
import Wheel from '../Logic/Wheel';
import { addButtonEvent, getVehicleInfo } from '../Logic/Globals';
import multiplayerConnector from '../Logic/Multiplayer';

const WheelComponent = ({wheelInfo}) => {
    const [angle, setAngle] = useState(0);
    const [currSpeed, setCurrSpeed] = useState(0);
    
    useEffect(() => {
        function handleAngleUpdate(angle){
           setAngle(angle);
        }
        function setSpeed(speed){
            console.log(speed + " CurrSpeed");
            setCurrSpeed(speed);
        }

        wheelInfo.class.setTurnHandler(handleAngleUpdate);
        wheelInfo.class.setSpeedIncreaseHandler(setSpeed);
    },[])

    return(//TODO: Update speed counter (10 - (gear * 10) ) && handle stop;
        <div className='Wheel' style={{
            transform: `rotate(${angle}deg)`,
            animation: `WheelForward ${currSpeed * 10}s infinite linear`,
            ...wheelInfo.styles,
        }}></div>
    );
}

const Truck = ({color = 'brown', spawnPositions = {x: 0, y: 0, rotation: 90}, trigger,
    isActive = false, isOtVeh = false, identifier = 0, isMultiplayer = false, mapController = undefined}) => {
    const [wheels, setWheels] = useState([
        {
            index: 0,
            styles: {
                left: '14%',
                top: '10%',
            },
            type: 'front',
            class: new Wheel(),
        },
        {
            index: 1,
            styles: {
                right: '14%',
                top: '10%',
            },
            type: 'front',
            class: new Wheel(),
        },
        {
            index: 2,
            styles: {
                left: '15%',
                top: '65%',
                width: '2.5vh',
            },
            type: 'back',
            class: new Wheel(),
        },
        {
            index: 3,
            styles: {
                left: '15%',
                top: '80%',
                width: '2.5vh',
            },
            type: 'back',
            class: new Wheel(),
        },
        {
            index: 4,
            styles: {
                right: '15%',
                top: '65%',
                width: '2.5vh',
            },
            type: 'back',
            class: new Wheel(),
        },
        {
            index: 5,
            styles: {
                right: '15%',
                top: '80%',
                width: '2.5vh',
            },
            type: 'back',
            class: new Wheel(),
        },
    ]);    
    const [activity, setActivity] = useState(isActive);
    const [dynamicStyles, setDynamicStyles] = useState({
        left: spawnPositions.x,
        top: spawnPositions.y,
        transform: `rotate(${spawnPositions.rotation}deg)`,
    });

    const setVehicleStyles = (x, y, rotation) => {
        if(identifier == 0 && isMultiplayer){
            const vehicle = getVehicleInfo();
            vehicle.left = x;
            vehicle.top = y;
            vehicle.angle = rotation;
            trigger.current(1, vehicle);
        }
        
        setDynamicStyles({
            left: `${x}px`,
            top: `${y}px`,
            transform: `rotate(${rotation}deg)`,
        })
    }

    useEffect(() => {
        let onDestroy = () => {}
        if(!isOtVeh){
            const controller = new Vehicle('truck', wheels, spawnPositions, mapController, !isOtVeh, setVehicleStyles);

            function deleteInterval(){
                clearInterval(cycle);
            }

            const callbacks = {
                forward: {
                    isActive: false,
                    func: () => {
                        controller.moveForward();
                    },
                },
                backward: {
                    isActive: false,
                    func: () => {
                        controller.moveBackward();
                    },
                },
                left: {
                    isActive: false,
                    func: () => {
                        controller.turnLeft();
                    },
                },
                right: {
                    isActive: false,
                    func: () => {
                        controller.turnRight();
                    }
                }
            }

            let cycle = isActive? setInterval(() => {
                for(let callback in callbacks){
                    if(callbacks[callback].isActive){
                        callbacks[callback].func();
                    };
                }
                
                controller.simulate();
            }, 60): null;

            const handleKeyDown = (event) => {
                // console.log('Key down:', event.key);
                switch(event.code){
                    case 'KeyA': callbacks.left.isActive = true; break;

                    case 'KeyD': callbacks.right.isActive = true; break;


                    case 'KeyW': callbacks.forward.isActive = true; break;

                    case 'KeyS': callbacks.backward.isActive = true; break;
                }
            };
        
            const handleKeyUp = (event) => {
                // console.log('Key up:', event.key);
                switch(event.code){
                    case 'KeyA': callbacks.left.isActive = false; break;
                    case 'KeyD': callbacks.right.isActive = false; break; //Колесо может стопится из-за того что очищается не тот калбек.
                    case 'KeyW': callbacks.forward.isActive = false; break;
                    case 'KeyS': callbacks.backward.isActive = false; break;
                }
            };

            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('keyup', handleKeyUp);

            onDestroy =  () => {
                document.removeEventListener('keydown', handleKeyDown); 
                document.removeEventListener('keyup' ,handleKeyUp);
                deleteInterval();
            }
        }
        else{
            function updatePositions(socket, data){
                for (const car of data.users) {
                    if(car.userID == identifier){
                        setVehicleStyles(car.userVehicleInfo.left, car.userVehicleInfo.top, car.userVehicleInfo.rotateAngle);
                        break;
                    }
                }
            }
            multiplayerConnector.AddEvenetHandler("updatePositionsListen", updatePositions);
            onDestroy = () => {
                multiplayerConnector.RemoveEvent("updatePositionsListen", updatePositions);
            }
        }
        return () => {onDestroy()}
    }, []);

    return(
        <div className='VehicleBody' id={`${!isOtVeh?"baseVehicle":""}`} style={{...isActive? dynamicStyles: null}} >
            {wheels.map((val, index) => (
                <WheelComponent wheelInfo = {val} key = {val.index}/>
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

const DefaultCar = ({color = 'brown', spawnPositions = {x: 0, y: 0, rotation: 90}, trigger,
    isActive = false, isOtVeh = false, identifier = 0, isMultiplayer = false, mapController = undefined}) => {
    const [wheels, setWheels] = useState([
        {
            index: 0,
            styles: {
                left: '14%',
                top: '18%',
            },
            type: 'front',
            class: new Wheel(),
        },
        {
            index: 1,
            styles: {
                right: '14%',
                top: '18%',
            },
            type: 'front',
            class: new Wheel(),
        },
        {
            index: 2,
            styles: {
                left: '14%',
                top: '73%',
                width: '2.5vh',
            },
            type: 'back',
            class: new Wheel(),
        },
        {
            index: 3,
            styles: {
                right: '14%',
                top: '73%',
                width: '2.5vh',
            },
            type: 'back',
            class: new Wheel(),
        },
    ]);    
    const [activity, setActivity] = useState(isActive);
    const [dynamicStyles, setDynamicStyles] = useState({
        left: spawnPositions.x,
        top: spawnPositions.y,
        transform: `rotate(${spawnPositions.rotation}deg)`,
    });

    const setVehicleStyles = (x, y, rotation) => {
        if(identifier == 0 && isMultiplayer){
            const vehicle = getVehicleInfo();
            vehicle.left = x;
            vehicle.top = y;
            vehicle.angle = rotation;
            trigger.current(1, vehicle);
        }
        
        setDynamicStyles({
            left: `${x}px`,
            top: `${y}px`,
            transform: `rotate(${rotation}deg)`,
        })
    }

    useEffect(() => {
        let onDestroy = () => {}
        if(!isOtVeh){
            const controller = new Vehicle('default', wheels, spawnPositions, mapController, !isOtVeh, setVehicleStyles);

            function deleteInterval(){
                clearInterval(cycle);
            }

            const callbacks = {
                forward: {
                    isActive: false,
                    func: () => {
                        controller.moveForward();
                    },
                },
                backward: {
                    isActive: false,
                    func: () => {
                        controller.moveBackward();
                    },
                },
                left: {
                    isActive: false,
                    func: () => {
                        controller.turnLeft();
                    },
                },
                right: {
                    isActive: false,
                    func: () => {
                        controller.turnRight();
                    }
                }
            }

            let cycle = isActive? setInterval(() => {
                for(let callback in callbacks){
                    if(callbacks[callback].isActive){
                        callbacks[callback].func();
                    };
                }
                
                controller.simulate();
            }, 60): null;

            const handleKeyDown = (event) => {
                // console.log('Key down:', event.key);
                switch(event.code){
                    case 'KeyA': callbacks.left.isActive = true; break;

                    case 'KeyD': callbacks.right.isActive = true; break;


                    case 'KeyW': callbacks.forward.isActive = true; break;

                    case 'KeyS': callbacks.backward.isActive = true; break;
                }
            };
        
            const handleKeyUp = (event) => {
                // console.log('Key up:', event.key);
                switch(event.code){
                    case 'KeyA': callbacks.left.isActive = false; break;
                    case 'KeyD': callbacks.right.isActive = false; break; //Колесо может стопится из-за того что очищается не тот калбек.
                    case 'KeyW': callbacks.forward.isActive = false; break;
                    case 'KeyS': callbacks.backward.isActive = false; break;
                }
            };

            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('keyup', handleKeyUp);

            onDestroy =  () => {
                document.removeEventListener('keydown', handleKeyDown); 
                document.removeEventListener('keyup' ,handleKeyUp);
                deleteInterval();
            }
        }
        else{
            function updatePositions(socket, data){
                for (const car of data.users) {
                    if(car.userID == identifier){
                        setVehicleStyles(car.userVehicleInfo.left, car.userVehicleInfo.top, car.userVehicleInfo.rotateAngle);
                        break;
                    }
                }
            }
            multiplayerConnector.AddEvenetHandler("updatePositionsListen", updatePositions);
            onDestroy = () => {
                multiplayerConnector.RemoveEvent("updatePositionsListen", updatePositions);
            }
        }
        return () => {onDestroy()}
    }, []);

    return(
        <div className='VehicleBody' id={`${!isOtVeh?"baseVehicle":""}`} style={{...isActive? dynamicStyles: null}}>
            {wheels.map((val, index) => (
                <WheelComponent wheelInfo = {val} key = {val.index}/>
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

export const defaultVehicles = [Truck, DefaultCar];