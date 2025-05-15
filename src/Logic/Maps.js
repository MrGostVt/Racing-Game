const DEFAULTWIDTH = 300;
const DEFAULTHEIGHT = 150;

const DEFAULTCIRCLESIZE = 100;

export class MapLoad{
    isSpawnPlaced = false;

    name = '';
    prev = '';
    #isFinite = false;
    #circuits = 1;
    #timer = '5m';
    #build = {
        spawn: {
            left: '',
            top: '',
            width: '',
            height: '',
        },
        circlePoint: {
            left: '',
            top: '',
            width: '',
            height: '',
        },
        other: [],
    };
    #isCirclePlaced = false;


    constructor(name, prev){
        this.name = name;
        this.prev = prev;
    }

    updateName(name){
        this.name = name;
    }

    updatePrev(prev){
        this.prev = prev;
    }

    setSpawn(positions = {x: 0, y:0}, size = {width: DEFAULTWIDTH, height: DEFAULTHEIGHT}){
        this.#build.spawn = {left: `${positions.x}`, top: `${positions.y}`};
        this.#build.spawn.height = size.height;
        this.#build.spawn.width = size.width;
        
        this.setDefaultCirclePosition();
        this.isSpawnPlaced = true;
    }

    setDefaultCirclePosition(){
        const positions = {x: this.#build.spawn.left, y: this.#build.spawn.top};
        const size = {width: this.#build.spawn.width, height: this.#build.spawn.height};

        const intPositions = {x: parseInt(positions.x), y: parseInt(positions.y)};
        const intSize = {width: parseInt(size.width), height: parseInt(size.width)};

        const sizeUnit = size.width.split(intSize.width)[1];
        const positionsUnit = positions.x.split(intPositions.x)[1] 
        
        this.#build.circlePoint.height = size.width >= size.height? size.height : DEFAULTCIRCLESIZE ;
        this.#build.circlePoint.width = size.width >= size.height? DEFAULTCIRCLESIZE : size.width;
        this.#build.circlePoint.left = size.width >= size.height? `${intPositions.x - intSize.width + 
            (size.width >= size.height ? (intSize.width - DEFAULTCIRCLESIZE): 0)}${sizeUnit}`: positions.x;
        this.#build.circlePoint.top = size.width >= size.height? positions.y: `${intSize.height - intPositions.y + DEFAULTCIRCLESIZE }${positionsUnit}`;
    }

    setCirclePosition(positions, size){
        
        this.#build.circlePoint.height = size.height;
        this.#build.circlePoint.width = size.width;
        this.#build.circlePoint.left = positions.x;
        this.#build.circlePoint.top = positions.y;
        
        this.#isCirclePlaced = true;
    }
    addCheckpoints(){

    }
    updateCheckpoints(id){

    }
    
    addMapComponent(name = '', styling = {}, type = 'default'){
        //types - default: block, accelerator: accelerate car, slower: slowing down car;
    }

    getInfo(){
        return {
            timer: this.#timer,
            circuits: this.#circuits,
            isFinite: this.#isFinite,
        };
    }
    getBuild(){
        return this.#build;
    }
}
