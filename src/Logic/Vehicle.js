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

const MAXANGLE = 45;
export default class Vehicle{
    #startPositons;
    #currentPositions;
    #actualAngle = 0;
    #wheelRotateAngle = 0;
    #bodyRotateAngle = 0;
    #frontWheels = [];
    #backWheels = [];
    setStyles = () => {};

    constructor(type = 'basic', wheels = [], startPositons, setStyles = () => {}){
        for(let wheel of wheels){
            if(wheel.type === 'front'){
                this.#frontWheels.push(wheel);
            }
            else{
                this.#backWheels.push(wheel);
            }
        }

        this.#startPositons = startPositons;
        this.#currentPositions = startPositons;
        this.setStyles = setStyles;
        console.log('Start positions');
        console.log(this.#currentPositions);
    }

    turnLeft(step = 4){
        //Вычислять скорость поворота от массы и кол-ва колёс
        if(this.#wheelRotateAngle > -MAXANGLE){
            this.#wheelRotateAngle -= step;

            for(let wheel of this.#frontWheels){
                wheel.class.turn(this.#wheelRotateAngle);
            }
        }   
    }
    turnRight(step = 4){

        if(this.#wheelRotateAngle < MAXANGLE){
            this.#wheelRotateAngle += step;

            for(let wheel of this.#frontWheels){
                wheel.class.turn(this.#wheelRotateAngle);
            }
        }
    }


    moveForward(){
        const left = this.#currentPositions.x - (Math.sin(this.#bodyRotateAngle * (3.14/180)) * -1 * 5);
        const top = this.#currentPositions.y + (Math.cos(this.#bodyRotateAngle  * (3.14/180)) * -1 * 5);

        if(this.#wheelRotateAngle !== 0){

            this.#bodyRotateAngle += (this.#wheelRotateAngle > 0) ? +1: -1 ;

            if(this.#wheelRotateAngle > 0){
                this.turnLeft(1);
            }
            else if(this.#wheelRotateAngle < 0){
                this.turnRight(1);
            }
        }

        this.#currentPositions = {x: left, y: top};

        this.setStyles(this.#currentPositions.x, this.#currentPositions.y, this.#bodyRotateAngle);
    }
    moveBackward(){
        const left = this.#currentPositions.x - (Math.sin(this.#bodyRotateAngle * (3.14/180)) * 1 * 5);
        const top = this.#currentPositions.y + (Math.cos(this.#bodyRotateAngle  * (3.14/180)) * 1 * 5);

        if(this.#wheelRotateAngle !== 0){

            this.#bodyRotateAngle += (this.#wheelRotateAngle < 0) ? +1: -1 ;

            if(this.#wheelRotateAngle > 0){
                this.turnLeft(1);
            }
            else if(this.#wheelRotateAngle < 0){
                this.turnRight(1);
            }
        }

        this.#currentPositions = {x: left, y: top};

        this.setStyles(this.#currentPositions.x, this.#currentPositions.y, this.#bodyRotateAngle);
    }
    // constructor(backWheels = 2, enginePos = 'front', mass = 1000, power = 150, setStyles = () => {}){

    // }
}

