import React, { useState, useEffect } from "react";
import '../CSS/CreatePage.css'
import { getMaps } from "../Logic/Globals";
import VehicleBuilder from "../Components/VehicleBuilder";

export const CreateMultiplayerPage = ({updatePage = () => {}, setLoading = () => {}}) => {
    const [currentVehicle, setCurrentVehicle] = useState(0);
    const [colorID, setColorID] = useState(0);

    function StartGame() {
        setLoading(true, true);
        // updatePage(getMaps()[0], currentVehicle, colorID);
    }

    return(
        <div className="CreatePage">
            <VehicleBuilder sendColorID={(id) => {setColorID(id)}} sendChoosedVehicle={(id) => {setCurrentVehicle(id)}} />

            <div className="ReadyButton" style={{bottom: '8vh', right: '8vh'}} onClick={StartGame}>
            </div>
        </div>
    );
};