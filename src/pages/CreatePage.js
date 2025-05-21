import React, { useState, useEffect } from "react";
import '../CSS/CreatePage.css'
import { getMaps } from "../Logic/Globals";
import VehicleBuilder from "../Components/VehicleBuilder";
import multiplayerConnector from "../Logic/Multiplayer";



let mapCallback = () => {};
const CreatePage = ({updatePage = () => {}}) => {
    const [choosedMap, setChoosedMap] = useState(-1);
    const [maps, setMaps] = useState([]);
    const [currentVehicle, setCurrentVehicle] = useState(0);
    const [colorID, setColorID] = useState(0);
    const [isMultiplayer, setMultiplayer] = useState(false);

    useEffect(() => {
        setMaps(getMaps());

        return () => {};
    },[]);

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
        console.log(choosedMap)
        if(choosedMap === -1){
            console.log('Choose map first!')
            return false;
        }
        updatePage(maps[choosedMap], currentVehicle, colorID, isMultiplayer);
    }

    return(
        <div className="CreatePage">
            <div className="MapChoose">
                Choose map
                <div id="mapChooseWrapper">
                    {maps.map((value, index) => (
                        <MapPrev mapObject = {value} changeActivity={(callback) => {
                            const res = updateChoosedMap(index, callback)
                            return res;
                        }} key={value.id}/>
                    ))}
                </div>
            </div>
            <VehicleBuilder sendColorID={(id) => {setColorID(id)}} sendChoosedVehicle={(id) => {setCurrentVehicle(id)}} />

            <div className="ReadyButton" style={{bottom: '8vh', right: '8vh'}} onClick={StartGame}>
            </div>
            <div className="ReadyButton" style={{bottom: '22vh', right: '8vh', backgroundColor: isMultiplayer? 'lime': '#C22E4E'}}
                onClick={() => {setMultiplayer(!isMultiplayer)}}></div>
        </div>
    );
};

const MapPrev = ({mapObject, changeActivity = () => {}}) => {
    const [isActive, setIsActive] = useState(false)

    return(
        <div className="MapBlock" style={{border: isActive? 'solid 2px lime': 'solid 2px black' }}
            onClick={() => {
                setIsActive(changeActivity(() => {setIsActive(false);}));
            }}>
            <div className="MapNameWrap"><p className='MapName'>{mapObject.object.name}</p></div> 
            <div className="MapPreview" style={{backgroundImage: `url(${mapObject.object.prev})`}}></div>
        </div>
    )
};


export default CreatePage;