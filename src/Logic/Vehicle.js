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
const MAXRPM = 10;
const STEPKOEF = 2;
export default class Vehicle{
    #startPositons;
    #currentPositions;
    #actualAngle = 0;
    #wheelRotateAngle = 0;
    #bodyRotateAngle = 0;
    #frontWheels = [];
    #backWheels = [];
    setStyles = () => {};
    #gears = [0.1, 0.4, 0.6, 0.7];
    #currentGear = 0;
    #isAccelerete = false;
    #currentRpm = 0;
    #isMoving = false;
    currentDirection = 1; // 1-forward, -1 - backward
    // #simulation = false;

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

    simulate(){
        //TODO: Make simulation function, which makes stoping more smooth; 
        if(!this.#isMoving && (this.#currentRpm !== 0 || this.#currentGear !== 0)){
            const left = this.#currentPositions.x - (Math.sin(this.#bodyRotateAngle * (3.14/180)) * ((-1 * (5 
                + this.#currentRpm * this.#gears[this.#currentGear] * STEPKOEF)) * this.currentDirection));
            const top = this.#currentPositions.y + (Math.cos(this.#bodyRotateAngle  * (3.14/180)) * ((-1 * (5
                + this.#currentRpm * this.#gears[this.#currentGear] * STEPKOEF)) * this.currentDirection));
            
            this.#currentPositions = {x: left, y: top};

            if(this.#wheelRotateAngle !== 0){

                const wheelAngleKoef = this.#wheelRotateAngle / MAXANGLE * 2;
                this.#bodyRotateAngle += (this.#wheelRotateAngle > 0) ? (+1 + wheelAngleKoef) * this.currentDirection:( -1 +wheelAngleKoef) * this.currentDirection;

                if(this.#wheelRotateAngle > 0){
                    this.turnLeft(1);
                }
                else if(this.#wheelRotateAngle < 0){
                    this.turnRight(1);
                }
            }
            

            this.setStyles(this.#currentPositions.x, this.#currentPositions.y, this.#bodyRotateAngle);


            if(!this.#isAccelerete){
                this.#isAccelerete = true;
                setTimeout(() => {
                    if(this.#currentRpm > 0){
                        this.#currentRpm -= 1;
                    }
                    else if(this.#currentGear > 0 && this.#currentRpm === 0){
                        this.#currentGear -= 1;
                        this.#currentRpm = 0;
                    }
                    this.#isAccelerete = false;
                    // alert((-1 * 5 
                    //     + this.#currentRpm * this.#gears[this.#currentGear]))
                }, 150 );
            }
        }

        this.#isMoving = false;
    }

    moveForward(){
        if(!this.#isAccelerete){
            this.#isAccelerete = true;
            setTimeout(() => {
                this.#isAccelerete = false;
                // alert((-1 * 5 
                //     + this.#currentRpm * this.#gears[this.#currentGear]))
            }, 500 + (10 * this.#currentGear));
            
            if(this.#currentRpm < MAXRPM ){
                this.#currentRpm += 1;
            }
            else if(this.#currentGear < this.#gears.length - 1 && this.#currentRpm === MAXRPM){
                this.#currentGear += 1;
                this.#currentRpm = 3;
            }
        }

        const left = this.#currentPositions.x - (Math.sin(this.#bodyRotateAngle * (3.14/180)) * (-1 * (5 
            + this.#currentRpm * this.#gears[this.#currentGear] * STEPKOEF)));
        const top = this.#currentPositions.y + (Math.cos(this.#bodyRotateAngle  * (3.14/180)) * (-1 * (5
            + this.#currentRpm * this.#gears[this.#currentGear] * STEPKOEF)));
        
        if(this.#wheelRotateAngle !== 0){

            const wheelAngleKoef = this.#wheelRotateAngle / MAXANGLE * 2;
            this.#bodyRotateAngle += (this.#wheelRotateAngle > 0) ? +1 + wheelAngleKoef: -1 +wheelAngleKoef;

            if(this.#wheelRotateAngle > 0){
                this.turnLeft(1);
            }
            else if(this.#wheelRotateAngle < 0){
                this.turnRight(1);
            }
        }

        this.#currentPositions = {x: left, y: top};

        this.setStyles(this.#currentPositions.x, this.#currentPositions.y, this.#bodyRotateAngle);
        this.#isMoving = true;
        this.currentDirection = 1;
    }
    moveBackward(){

        this.#currentGear = 1;
        this.#currentRpm = 0;

        const left = this.#currentPositions.x - (Math.sin(this.#bodyRotateAngle * (3.14/180)) * 1 * 5);
        const top = this.#currentPositions.y + (Math.cos(this.#bodyRotateAngle  * (3.14/180)) * 1 * 5);

        if(this.#wheelRotateAngle !== 0){

            const wheelAngleKoef = this.#wheelRotateAngle / MAXANGLE * 2;
            this.#bodyRotateAngle += (this.#wheelRotateAngle < 0) ? +1 - wheelAngleKoef: -1 - wheelAngleKoef;

            if(this.#wheelRotateAngle > 0){
                this.turnLeft(1);
            }
            else if(this.#wheelRotateAngle < 0){
                this.turnRight(1);
            }
        }

        this.#currentPositions = {x: left, y: top};

        this.setStyles(this.#currentPositions.x, this.#currentPositions.y, this.#bodyRotateAngle);
        this.#isMoving = true;
        this.currentDirection = -1;
    }
    // constructor(backWheels = 2, enginePos = 'front', mass = 1000, power = 150, setStyles = () => {}){

    // }
}

