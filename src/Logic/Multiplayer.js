import { DataStore } from "./DataStore";
import { ENV } from "./Environment";
import { io } from "socket.io-client";

const ENDPOINTS = {
    generateID: '/generate-id',
    createRoom: '/create-room',
    joinRoom: '/join-room',
    getRooms: '/get-rooms',
};

class MultiplayerConnector{
    id = null;
    rooms = [];
    currentRoom = null;
    currentRoomID = null;
    isSocketActive = false;
    socket = null;

    eventListeners = {
        playerJoinedListen: {
            point: 'player-joined',
            onPoint: [],
        },
        updatePositionsListen: {
            point: 'update-positions',
            onPoint: [],
        },
        wrongBodyListen: {
            point: 'wrong-body',
            onPoint: [],
        },
        badRequestListen: {
            point: 'bad-request',
            onPoint: [],
        }
    };
    eventTriggers = {
        joinRoom: {
            point: 'join-room',
        },
        move: {
            point: 'move',
        },
    }

    constructor(){
        this.init();
    }

    async init(){
        //TODO: Make getUserID condition in all get requests;
        await this.getUserID();
    }
    async AddEvenetHandler(event, callback){
        console.log(event, "Trying");
        if(!!this.eventListeners[event]){
            console.log(event, "Success")
            this.eventListeners[event].onPoint.push(callback);
            return true;
        }
        return false;
    }
    async RemoveEvent(event, callback){
        if(!this.eventListeners[event]){
            for(let i = 0; i < this.eventListeners[event].onPoint.length; i++){
                if(this.eventListeners[event].onPoint[i] == callback){
                    this.eventListeners[event].onPoint.splice(i,1);
                    return true;
                }
            }
        }
        return false;

    }
    async Socket(){
        if(this.isSocketActive){
            this.socket.disconnect();

            this.isSocketActive = false;
        }
        else{
            this.socket = io(ENV.API, {reconnection: false});
    
            this.socket.on("connect", () => {
                console.log("Connected to server:", this.socket.id);
                //TODO: onEvent[event](socket);
                // Пример: присоединяемся к комнате
                // this.socket.emit(this.eventTriggers.joinRoom, this.currentRoom, this.id); // roomID = 123, userID = 1
            });
            
            this.socket.on(this.eventListeners.playerJoinedListen.point, (data) => {
                this.currentRoom.users = data;

                this.eventListeners.playerJoinedListen.onPoint.forEach(callback => callback(this.socket, data));
                console.log("Someone joined:", data);
            });
            
            this.socket.on(this.eventListeners.updatePositionsListen.point, (data) => {
                this.eventListeners.updatePositionsListen.onPoint.forEach(callback => callback(this.socket, data));
                console.log("Position update:", data);
            });

            this.socket.on(this.eventListeners.badRequestListen.point, (socketID) => {
                this.eventListeners.badRequestListen.onPoint.forEach(callback => callback(this.socket));
                console.log("Bad request for socket:", socketID);
            });

            this.isSocketActive = true;

            return (ev, vehicleInfo = {}) => {
                if(this.isSocketActive){
                    console.log("TRIGGERED!")
                    switch(ev){
                        case 0: this.socket.emit(this.eventTriggers.joinRoom.point, this.currentRoomID, this.id); break;
                        case 1: this.socket.emit(this.eventTriggers.move.point, this.currentRoomID, this.id, vehicleInfo); break;
                    }
                }
            }
        }
    }

    async getUserID(){
        // alert(DataStore.CheckUserID())
        if(!DataStore.CheckUserID()){
            const id = await this.#makeRequest((ENDPOINTS.generateID), 'GET');
            if(!id){return false;}
            this.id = id.userID;
            DataStore.SetUserID(this.id);
        }
        this.id = DataStore.GetUserID();
        return true;
    }
    async getRoomList(){
        const rooms = await this.#makeRequest((ENDPOINTS.getRooms), 'GET');
        if(!rooms){
            return null;
        }
        
        this.rooms = rooms;
        return rooms;
    }
    async joinRoom(roomID, vehicle){
        if(!this.id){
            return null;
        }
        const room = await this.#makeRequest((ENDPOINTS.joinRoom), 'POST', {
            roomID,
            userID: this.id,
            vehicle,
        });

        if(!room){
            return null;
        }

        this.currentRoomID = room.identifier;
        this.currentRoom = room;
        return room;
    }
    async createRoom(vehicle){
        if(!this.id){
            return null;
        }
        const room = (await this.#makeRequest((ENDPOINTS.createRoom), 'POST',{
            userID: this.id,
            vehicle,
        }));
        if(!room){
            return null;
        }

        this.currentRoomID = room.identifier;
        this.currentRoom = room;
        return room;
    }

    async #makeRequest(endpoint, type = 'GET', body){
        const Headers = {
            'Content-Type': 'application/json',
        }

        let request = {
            method: type,
            headers: Headers,
        };
        
        if(type === 'POST'){
            request.body = JSON.stringify(body);
        }

        console.log(request);

        try{
            const result = await fetch((ENV.API + endpoint), request);
            if(result.status >= 400){
                return null;
            }
            return (await result.json()).payload
        }
        catch(err){
            console.error(err);
            return null;
        }
    }
}

const multiplayerConnector = new MultiplayerConnector();

export default multiplayerConnector;
