import React, { useState, useEffect } from "react";
import '../CSS/CreatePage.css'
import { getMaps } from "../Logic/Globals";
import VehicleBuilder from "../Components/VehicleBuilder";
import multiplayerConnector from "../Logic/Multiplayer";
import soundController from "../Logic/SondController";

export const MultiplayerPage = ({updatePage = () => {}, setLoading = () => {}, showTip = () => {}}) => {
    const [currentVehicle, setCurrentVehicle] = useState(0);
    const [colorID, setColorID] = useState(0);
    const [rooms, setRooms] = useState([]);

    function StartGame(id) {
        setLoading(true, true);
        multiplayerConnector.currentRoomID = id;
        updatePage(getMaps()[0], currentVehicle, colorID, true, true);
    }

    useEffect(() => {
        async function fetch(){
            setLoading(true);
            const rooms = await multiplayerConnector.getRoomList();
            setLoading(false);
            if(!!rooms){
                setRooms(rooms);
            }
            else{
                showTip("Something went wrong")
            }
        }
        fetch();
    },[])

    return(
        <div className="CreatePage">

            <div className="RoomsList">
                {rooms.map(val => {
                    return(
                        <div key={val.identifier}>{`${val.identifier} ${val.usersCount}/2 live`}
                            <div className="JoinButton" onClick={() => {soundController.playSound('click'); if(val.usersCount < 2) StartGame(val.identifier);}}></div>
                        </div>);
                })}
                

            </div>
            <VehicleBuilder sendColorID={(id) => {setColorID(id)}} sendChoosedVehicle={(id) => {setCurrentVehicle(id)}} />

            {/* <div className="ReadyButton" style={{bottom: '8vh', right: '8vh'}} onClick={StartGame}>
            </div> */}
        </div>
    );
};