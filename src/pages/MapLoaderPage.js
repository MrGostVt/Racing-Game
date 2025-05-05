import { MapLoad } from "../Logic/Maps";
import { useState } from "react";
import '../CSS/MapLoaderPage.css';
import { defaultVehicles } from "../Components/VehiclePresets";
import { COLORS } from "../Logic/Globals";

export const MapLoaderPage = ({mapObject = new MapLoad, vehicleObject}) => {
    const [isActive, setIsActive] = useState(false);
    
    const spawn = mapObject.object.getBuild().spawn;
    const circlePoint = mapObject.object.getBuild().circlePoint;


    const Vehicle = defaultVehicles[vehicleObject.id]

    // console.log(vehicle);
    //TODO: map class which responsibility is a rounds count and stats writing
    return(
        <div>
            <Vehicle color={COLORS[vehicleObject.colorID]} isActive={true} spawnPositions={{x: 225, y: 52}}/>
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