import { MapLoad } from "./Maps";
export const COLORS = ['brown', 'lightgrey', 'yellow', 'greenyellow'];

export const getMaps = () => {
    const defaultTestMap = new MapLoad('TestMap','../imgs/Test-Logo.png');
    defaultTestMap.setSpawn({x: '250px', y: '0px'},
        {width: '200px', height: '300px'});
    defaultTestMap.addMapComponent("barrier","barrier",{x:'450px', y:"0px"}, {width: "50px", height: "500px"});
    defaultTestMap.addMapComponent("barrier","barrier",{x:'200px', y:"0px"}, {width: "50px", height: "500px"});
    defaultTestMap.addMapComponent("barrier","barrier",{x:'0px', y:"700px"}, {width: "1000px", height: "50px"});
    defaultTestMap.addMapComponent("barrier","barrier",{x:'800px', y:"570px"}, {width: "50px", height: "150px"});
    defaultTestMap.addMapComponent("barrier","barrier",{x:'500px', y:"350px"}, {width: "200px", height: "50px"});
    defaultTestMap.addMapComponent("barrier","barrier",{x:'700px', y:"0px"}, {width: "50px", height: "150px"});
    defaultTestMap.addMapComponent("barrier","barrier",{x:'1000px', y:"0px"}, {width: "50px", height: "1000px"});


    defaultTestMap.addCheckpoint("checkpoint",{x:'500px', y:"0px"},{width: "200px", height: "150px"},{},0,true);
    defaultTestMap.addCheckpoint("checkpoint",{x:'0px', y:"0px"},{width: "200px", height: "150px"},{},1,true);

    defaultTestMap.addMapComponent("road", "other", {x: '0px', y: '0px'}, {width: '1000px', height: '100%'},
        {position: 'absolute'}, 'RoadTexture');
    
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

let savedVehicle = {};

export const setVehicleInfo = (vehicle) =>{
    savedVehicle = {...vehicle};
}
export const getVehicleInfo = (vehicle) => {
    return savedVehicle;
}