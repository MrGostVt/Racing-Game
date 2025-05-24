export default class Wheel{
    actualAngle = 0;
    maxAngle = 45;
    onAngleUpdate = () => {};
    onSpeedUpdate = () => {};

    constructor(){

    }

    setTurnHandler(callback = () => {}){
        this.onAngleUpdate = callback;
    }
    setSpeedIncreaseHandler(callback = () => {}){
        this.onSpeedUpdate = callback;
    }
    
    //Between -45, 45
    turn(angle){
        // onStyleUpdate();
        this.actualAngle = angle;
        this.onAngleUpdate(angle);
    }
    addSpeed(speed){
        this.onSpeedUpdate(speed)
    }
}