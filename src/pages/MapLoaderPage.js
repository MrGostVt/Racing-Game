import { MapLoad } from "../Logic/Maps";
import { useState } from "react";
import '../CSS/MapLoaderPage.css';
import { defaultVehicles } from "../Components/VehiclePresets";

export const MapLoaderPage = ({mapObject = new MapLoad, vehicleID}) => {
    const [isActive, setIsActive] = useState(false);
    
    const spawn = mapObject.object.getBuild().spawn;
    const circlePoint = mapObject.object.getBuild().circlePoint;


    const Vehicle = defaultVehicles[vehicleID]

    // console.log(vehicle);
    //TODO: map class which responsibility is a rounds count and stats writing
    return(
        <div>
            <Vehicle isActive={true} spawnPositions={{x: 225, y: 52}}/>
            <Spawn spawnObject={spawn} />
            <Circle circleObject={circlePoint} />
        </div>
    )
};

const Spawn = ({spawnObject}) => {

    
    return(
        <div className="SpawnObject" style={{...spawnObject}}>
        </div>
    );
}

const Circle = ({circleObject}) => {
    return(
        <div className="CircleObject" style={{...circleObject}}>
        </div>
    );
}