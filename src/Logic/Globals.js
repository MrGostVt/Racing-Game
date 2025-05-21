import { MapLoad } from "./Maps";
export const COLORS = ['brown', 'lightgrey', 'yellow', 'greenyellow'];

export const getMaps = () => {
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

let savedVehicle = {};

export const setVehicleInfo = (vehicle) =>{
    savedVehicle = {...vehicle};
}
export const getVehicleInfo = (vehicle) => {
    return savedVehicle;
}