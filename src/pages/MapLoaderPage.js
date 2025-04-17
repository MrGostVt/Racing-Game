import { MapLoad } from "../Logic/Maps";
import { useState } from "react";
import '../CSS/MapLoaderPage.css';

export const MapLoaderPage = ({mapObject = new MapLoad, vehicle}) => {
    const [isActive, setIsActive] = useState(false);
    
    const spawn = mapObject.object.getBuild().spawn;
    const circlePoint = mapObject.object.getBuild().circlePoint;

    return(
        <div>
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