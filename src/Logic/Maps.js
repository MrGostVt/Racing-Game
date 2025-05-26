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
    spawnDirection = 90;
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

    setSpawn(positions = {x: 0, y:0}, size = {width: DEFAULTWIDTH, height: DEFAULTHEIGHT}, spawnDirection = 0){
        this.#build.spawn = {left: `${positions.x}`, top: `${positions.y}`};
        this.#build.spawn.height = size.height;
        this.#build.spawn.width = size.width;
        this.spawnDirection = spawnDirection === 0? size.width >= size.height? 90 : 180: spawnDirection;
        
        // this.setDefaultCirclePosition();
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
    addCheckpoint(name = '', positions, sizes, styling = {}, checkpointID = 0, isRequired = true){
        const component = {
            placement:{
                left: '',
                top: '',
                width: '',
                height: '',
            },
            info:{
                name,
                type: "checkpoint",
                styling,
                id: this.#build.other.length,
                checkpointID,
                isRequired,
                isTaken: false,
                onTake: () => {},
                onError: () => {}
            }
        };

        component.placement.left = positions.x;
        component.placement.top = positions.y;
        component.placement.width = sizes.width;
        component.placement.height = sizes.height;

        this.#build.other.push(component);
    }
    setCallbacksForCheck(id, onTake, onError){
        for (const component of this.#build.other) {
            if(component.info.type == "checkpoint"){
                if(component.info.id === id){
                    component.info.onTake = onTake;
                    component.info.onError = onError;    
                }
            }
        }
    }
    
    addMapComponent(name = '', type = 'default', positions, sizes, styling = {}, secondClass = ""){
        const component = {
            placement:{
                left: '',
                top: '',
                width: '',
                height: '',
            },
            info:{
                name,
                type,
                styling,
                id: this.#build.other.length,
                secondClass
            }
        };

        component.placement.left = positions.x;
        component.placement.top = positions.y;
        component.placement.width = sizes.width;
        component.placement.height = sizes.height;

        this.#build.other.push(component);
        //types - default: block, accelerator: accelerate car, slower: slowing down car;
    }
    
    transformPXtoInt(object){
        const newObject = {};

        for(let key in object){
            newObject[key] = parseInt(object[key].split('px')[0]);
        }
        return newObject;
    }

    isOnObject(vehicle, component){
        if(vehicle.y >= component.top && vehicle.y <= component.top+ component.height){
            if(vehicle.x >= component.left && vehicle.x <= component.width + component.left){
                return true;
            }
        }
        return false;
    }

    canMove(positions){
        for(let component of this.#build.other){
            if(component.info.type == "barrier"){
                const barrier = this.transformPXtoInt(component.placement);
                const isCollide = this.isOnObject(positions, barrier);
                if(isCollide){
                    return false;
                }
            }
        }
        return true;
    }
    CheckPoint(positions){
        const checkpoints = [];
        for(let component of this.#build.other){
            if(component.info.type == "checkpoint"){
                checkpoints.push(component);
                const checkpoint = this.transformPXtoInt(component.placement);
                const isCollide = this.isOnObject(positions, checkpoint)
                if(isCollide){
                    for(let point of checkpoints){
                        if(point.info.id === component.info.id){
                            if(!point.info.isTaken){
                                point.info.isTaken = true;
                                point.info.onTake();
                            }
                            return true;
                        }
                        if(point.info.isTaken === false && point.info.isRequired){
                            point.info.onError("Take other checkpoint first");
                            return false;
                        }
                    }
                }
            }
        }
        return false;
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
