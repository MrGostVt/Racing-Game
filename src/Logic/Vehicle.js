const PRESETS = {
    basic: {
        frontWheels: 2,
        backWheels: 2,
        engine: 'front',
        mass: 1000,
        power: 150,
    }, 
    truck: {
        frontWheels: 2,
        backWheels: 4,
        engine: 'front',
        mass: 7000,
        power: 800,
    }
}

export default class Vehicle{
    #actualAngle = 180;
    #wheelRotateAngle = 0;
    #bodyRotateAngle = 0;
    #frontWheels = [];
    #backWheels = [];

    constructor(type = 'basic', setStyles = () => {}){
        
    }
    constructor(backWheels = 2, enginePos = 'front', mass = 1000, power = 150, setStyles = () => {}){

    }
}

