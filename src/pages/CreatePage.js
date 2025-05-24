import React, { useState, useEffect, useRef } from "react";
import '../CSS/CreatePage.css'
import { getMaps } from "../Logic/Globals";
import VehicleBuilder from "../Components/VehicleBuilder";
import multiplayerConnector from "../Logic/Multiplayer";
import menuService from "../Components/MenuService";
import soundController from "../Logic/SondController";



let mapCallback = () => {};
const CreatePage = ({updatePage = () => {}, showTip = () => {}}) => {
    const [choosedMap, setChoosedMap] = useState(-1);
    const [maps, setMaps] = useState([]);
    const [currentVehicle, setCurrentVehicle] = useState(0);
    const [colorID, setColorID] = useState(0);
    const [isMultiplayer, setMultiplayer] = useState(false);

    const [eventHandler, setEventHandler] = useState(0);
    function handle(isMultiplayer, counter){
        setMultiplayer(isMultiplayer);
        setEventHandler(counter);
    }   
    useEffect(() => {
        setMaps(getMaps());
        const id = menuService.Subscribe('startGame', ([isMultiplayer, counter]) => { handle(isMultiplayer, counter);})
        return () => menuService.RemoveSubscribe('startGame', id);
    },[]);
    useEffect(() => {
        console.log("Trying", eventHandler);
        if(eventHandler != 0){
            StartGame();
        }
    }, [eventHandler])

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

    function StartGame() {
        if(choosedMap === -1){
            console.log('Choose map first!')
            showTip('Choose map first!');
            return false;
        }
        updatePage(maps[choosedMap], 
            currentVehicle, colorID, 
            isMultiplayer);
    }

    return(
        <div className="CreatePage">
            <VehicleBuilder sendColorID={(id) => {setColorID(id)}} sendChoosedVehicle={(id) => {setCurrentVehicle(id)}} />
            <div className="MapChoose">
                <div id="mapChooseWrapper">
                    {maps.map((value, index) => (
                        <MapPrev mapObject = {value} changeActivity={(callback) => {
                            const res = updateChoosedMap(index, callback)
                            return res;
                        }} key={value.id}/>
                    ))}
                </div>
            </div>
            
{/* 
            <div className="ReadyButton" style={{bottom: '8vh', right: '8vh'}} onClick={StartGame}>
            </div>
            <div className="ReadyButton" style={{bottom: '22vh', right: '8vh', backgroundColor: isMultiplayer? 'lime': '#C22E4E'}}
                onClick={() => {setMultiplayer(!isMultiplayer)}}></div> */}
        </div>
    );
};

const MapPrev = ({mapObject, changeActivity = () => {}}) => {
    const [isActive, setIsActive] = useState(false)

    return(
        <div className="MapBlock" style={{border: isActive? 'solid 2px lime': 'solid 2px black' }}
            onClick={() => {
                soundController.playSound('click');
                setIsActive(changeActivity(() => {setIsActive(false);}));
            }}>
            <div className="MapNameWrap"><p className='MapName'>{mapObject.object.name}</p></div> 
            <div className="MapPreview" style={{backgroundImage: `url(${mapObject.object.prev})`}}></div>
        </div>
    )
};


export default CreatePage;