import React, { useState, useEffect, act } from "react";
import { defaultVehicles } from "../Components/VehiclePresets";
import '../CSS/CreatePage.css'

function getMaps() {
    return [
        {id: 1, name: 'First', prev: '../imgs/Test-Logo.png'},
        {id: 2, name: 'Second', prev: '../imgs/Test-Logo.png'},
        {id: 3, name: 'TEST', prev: '../imgs/Test-Logo.png'},
        {id: 4, name: 'TEST', prev: '../imgs/Test-Logo.png'},
        {id: 5, name: 'TEST', prev: '../imgs/Test-Logo.png'},
        {id: 6, name: 'TEST', prev: '../imgs/Test-Logo.png'},
        {id: 7, name: 'TEST', prev: '../imgs/Test-Logo.png'},
        {id: 8, name: 'TEST', prev: '../imgs/Test-Logo.png'},
        {id: 9, name: 'TEST', prev: '../imgs/Test-Logo.png'},  
    ];
}

let mapCallback = () => {};
const CreatePage = ({updatePage = () => {}}) => {
    const [choosedMap, setChoosedMap] = useState(-1);
    const [maps, setMaps] = useState(getMaps());
    const [currentVehicle, setCurrentVehicle] = useState(0);

    function updateChoosedMap(index, callback){
        mapCallback();
        mapCallback = callback;
        if(maps[index].id === choosedMap){
            setChoosedMap(-1);
            return false;
        }
        setChoosedMap(maps[index].id);
        return true;
    }
  
    function UpdateChoosedVehicle(action = 1){ // -1, 1
        if((currentVehicle === defaultVehicles.length-1 && action === 1) 
            || (currentVehicle === 0 && action === -1)){
            
            setCurrentVehicle(action === 1? 0: defaultVehicles.length-1);
            return;
        }

        setCurrentVehicle(currentVehicle + action);
    }

    function StartGame() {
        console.log(choosedMap)
        if(choosedMap === -1){
            console.log('Choose map first!')
            return false;
        }

        updatePage(maps[choosedMap], defaultVehicles[currentVehicle]);
    }

    return(
        <div className="CreatePage">
            <div className="MapChoose">
                Choose map
                <div id="mapChooseWrapper">
                    {maps.map((value, index) => (
                        <Map mapObject = {value} changeActivity={(callback) => {
                            const res = updateChoosedMap(index, callback)
                            return res;
                        }} key={value.id}/>
                    ))}
                </div>
            </div>

            <div className="VehicleBuild">
                Build your vehicle
                <div className="VehicleBuildPreview">
                    <div style={{
                        width: '25vh',
                        height: '35vh',
                    }}>
                        {defaultVehicles[currentVehicle]}
                    </div>
                </div>
                <div className="ButtonsWrap">
                    <div className="SmallButton" style={{marginRight: '30%'}} onClick={() => UpdateChoosedVehicle(-1)} ></div>
                    <div className="SmallButton" style={{marginLeft: '30%'}} onClick={() => UpdateChoosedVehicle(1)}></div>
                </div>
            </div>
            <div className="ReadyButton" style={{bottom: '8vh', right: '8vh'}} onClick={StartGame}>

            </div>
        </div>
    );
};

const Map = ({mapObject, changeActivity = () => {}}) => {
    const [isActive, setIsActive] = useState(false)

    return(
        <div className="MapBlock" style={{border: isActive? 'solid 2px lime': 'solid 2px black' }}
            onClick={() => {
                setIsActive(changeActivity(() => {setIsActive(false);}));
            }}>
            <div className="MapNameWrap"><p className='MapName'>{mapObject.name}</p></div> 
            <div className="MapPreview" style={{backgroundImage: `url(${mapObject.prev})`}}></div>
        </div>
    )
};


export default CreatePage;