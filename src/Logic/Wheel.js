export default class Wheel{
    actualAngle = 0;
    maxAngle = 45;
    onAngleUpdate = () => {};

    constructor(){

    }

    setTurnHandler(callback = () => {}){
        this.onAngleUpdate = callback;
    }
    
    //Between -45, 45
    turn(angle){
        // onStyleUpdate();
        this.actualAngle = angle;
        this.onAngleUpdate(angle);
    }
    addTorque(force){
        
    }
}