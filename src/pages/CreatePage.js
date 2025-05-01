import React, { useState, useEffect, act } from "react";
import { defaultVehicles } from "../Components/VehiclePresets";
import '../CSS/CreatePage.css'
import { MapLoad } from "../Logic/Maps";

function getMaps() {
    const defaultTestMap = new MapLoad('TestMap','../imgs/Test-Logo.png');
    defaultTestMap.setSpawn({x: '500px', y: '50px'},
        {width: '300px', height: '200px'});
    
    return [
        {id: 1, object: defaultTestMap},
        {id: 2, object: defaultTestMap},
        {id: 3, object: defaultTestMap},
        {id: 4, object: defaultTestMap},
        {id: 5, object: defaultTestMap},
        {id: 6, object: defaultTestMap},
        {id: 7, object: defaultTestMap},
        {id: 8, object: defaultTestMap},
        {id: 9, object: defaultTestMap},  
    ];
}

let mapCallback = () => {};
const CreatePage = ({updatePage = () => {}}) => {
    const [choosedMap, setChoosedMap] = useState(-1);
    const [maps, setMaps] = useState([]);
    const [currentVehicle, setCurrentVehicle] = useState(0);

    useEffect(() => {
        setMaps(getMaps());

        return () => {};
    },[])

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

        updatePage(maps[choosedMap], currentVehicle);
    }

    let Vehicle = defaultVehicles[currentVehicle];

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

            <div className="VehicleBuild">
                Build your vehicle
                <div className="VehicleBuildPreview">
                    <div style={{
                        width: '25vh',
                        height: '35vh',
                    }}>
                        <Vehicle isActive={false}/>
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