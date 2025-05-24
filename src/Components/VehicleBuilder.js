import { defaultVehicles } from "../Components/VehiclePresets";
import { COLORS } from "../Logic/Globals";
import React, { useState, useEffect } from "react";
import soundController from "../Logic/SondController";

const VehicleBuilder = ({sendColorID = () => {}, sendChoosedVehicle = () => {}}) => {
    const [currentVehicle, setCurrentVehicle] = useState(0);
    const [colorID, setColorID] = useState(0);
    
    let Vehicle = defaultVehicles[currentVehicle];

    function UpdateChoosedVehicle(action = 1){ // -1, 1
        if((currentVehicle === defaultVehicles.length-1 && action === 1) 
            || (currentVehicle === 0 && action === -1)){
            
            setCurrentVehicle(action === 1? 0: defaultVehicles.length-1);
            return;
        }

        sendChoosedVehicle(currentVehicle + action);
        setCurrentVehicle(currentVehicle + action);
    }
    
    function updateColorID(){
        if(colorID < COLORS.length){
            sendColorID(colorID+1);
            setColorID(colorID+1);
        }
        else{
            sendColorID(0);
            setColorID(0);
        }
    }

    return(
        <div className="VehicleBuild">
            <div className="VehicleBuildPreview" onClick={() => {soundController.playSound('click'); updateColorID();}}>
                <div style={{
                    width: '25vh',
                    height: '38vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Vehicle color={COLORS[colorID]} isActive={false}/>
                </div>
            </div>
            <div className="ButtonsWrap">
                <div className="SmallButton" style={{marginRight: '15vh'}} onClick={() => {soundController.playSound('click'); UpdateChoosedVehicle(-1);}} >{"<"}</div>
                <div className="SmallButton" style={{marginLeft: '15vh'}} onClick={() => {soundController.playSound('click'); UpdateChoosedVehicle(1);}}>{">"}</div>
            </div>
        </div>
    );
}

export default VehicleBuilder;