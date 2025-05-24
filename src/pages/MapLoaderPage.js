import { MapLoad } from "../Logic/Maps";
import { useEffect, useState, useRef } from "react";
import '../CSS/MapLoaderPage.css';
import { defaultVehicles } from "../Components/VehiclePresets";
import { COLORS, setVehicleInfo } from "../Logic/Globals";
import multiplayerConnector from "../Logic/Multiplayer";

export const MapLoaderPage = ({mapObject = new MapLoad, vehicleObject, isMultiplayer, isJoin = false, 
    setLoading = () => {}, setTip = () => {}}) => {
    const [multiplayer, setMultiplayer] = useState(isMultiplayer);
    const [otherPlayers, setOtherPlayers] = useState([]);

    const evTriggerRef = useRef((a, b) => {});
    
    console.log(mapObject);
    const spawn = mapObject.object.getBuild().spawn;
    const vehPosition = {x: parseInt(spawn.left.split('px')[0]), y: parseInt(spawn.top.split('px')[0]), rotation: 90};
    const circlePoint = mapObject.object.getBuild().circlePoint;

    useEffect(() => {
        function UpdateOtPlayers(socket, data){
            // console.log("otPlayers");
            // console.log(data);
            setOtherPlayers(data.users);
        }

        async function fetch() {
            const vehicle = {
                id: vehicleObject.id,
                color: vehicleObject.colorID,
                left: vehPosition.x,
                top: vehPosition.y,
                angle: vehPosition.rotation,
                wheelAngle: 0,
            };
            setVehicleInfo(vehicle);
            console.log(vehicle)
            
            setLoading(true);
            let room;
            if(!isJoin){
                room = await multiplayerConnector.createRoom(vehicle);
            }
            else{
                room = await multiplayerConnector.joinRoom(multiplayerConnector.currentRoomID, vehicle);
            }
            setLoading(false);
            
            if(!room){
                setTip("Something went wrong, offline")
                setMultiplayer(false);
            }
            else{
                const trigger = await multiplayerConnector.Socket();
                evTriggerRef.current = (a, b) => trigger(a, b); // обновление ref
                evTriggerRef.current(0);
                let res = await multiplayerConnector.AddEvenetHandler("playerJoinedListen", UpdateOtPlayers);
            }
        }
        if(multiplayer){
            fetch();
        }
        return () => {
            if(multiplayer){
                multiplayerConnector.Socket();
                multiplayerConnector.RemoveEvent("playerJoinedListen", UpdateOtPlayers);
            }
        }
    }, []);

    const Vehicle = defaultVehicles[vehicleObject.id];

    // console.log(vehicle);
    //TODO: map class which responsibility is a rounds count and stats writing
    return(
        <div>
            <Vehicle color={COLORS[vehicleObject.colorID]} isActive={true} spawnPositions={vehPosition} 
            isMultiplayer = {true} trigger={evTriggerRef}/>
            {
                otherPlayers.map((val) => {
                    const Vehicle = defaultVehicles[val.userVehicleInfo.vehicleID];
                    return <Vehicle color={COLORS[val.userVehicleInfo.color]} isActive={true} 
                        spawnPositions={{x: val.userVehicleInfo.left, y:val.userVehicleInfo.top, 
                        rotation: val.userVehicleInfo.rotateAngle}} isOtVeh={true} key={val.userID} identifier={val.userID} isMultiplayer={true}/>
                })
            }
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