import { DataStore } from "./DataStore";
import { ENV } from "./Environment";
import { io } from "socket.io-client";

const ENDPOINTS = {
    generateID: '/generate-id',
    createRoom: '/create-room',
    joinRoom: '/join-room',
    getRooms: '/get-rooms',
};
const EVENTS = {
    joinRoom: 'join-room',
    move: 'move',
    playerJoinedListen: 'player-joined',
    updatePositionsListen: 'update-positions',
    wrongBodyListen: 'wrong-body',
    badRequestListen: 'bad-request'
}

class MultiplayerConnector{
    id = null;
    rooms = [];
    currentRoom = null;
    currentRoomID = null;
    isSocketActive = false;
    socket = null;

    constructor(){
        
    }

    async Socket(roomID, userID){
        if(this.isSocketActive){
            this.socket.disconnect();

            this.isSocketActive = false;
        }
        else{
            this.socket = io(ENV.API);
    
            socket.on("connect", () => {
                console.log("Connected to server:", socket.id);
            
                // Пример: присоединяемся к комнате
                socket.emit("join-room", this.currentRoom, this.id); // roomID = 123, userID = 1
            });
            
            socket.on("player-joined", (data) => {
                console.log("Someone joined:", data);
            });
            
            socket.on("update-positions", (data) => {
                console.log("Position update:", data);
            });

            socket.on("bad-request", (socketID) => {
                console.log("Bad request for socket:", socketID);
            });

            this.isSocketActive = true;
        }
    }

    async getUserID(){
        if(!DataStore.CheckUserID()){
            const id = await this.#makeRequest((ENV.API + ENDPOINTS.generateID), 'GET');
            if(!!id){return false;}
            this.id = id;
            DataStore.SetUserID(id);
        }
        this.id = DataStore.GetUserID();
        return true;
    }
    async getRoomList(){
        const rooms = await this.#makeRequest((ENV.API + ENDPOINTS.getRooms), 'GET');
        if(!!rooms){
            return [];
        }
        
        this.rooms = rooms;
        return rooms;
    }
    async joinRoom(roomID, vehicle){
        const room = await this.#makeRequest((ENV.API + ENDPOINTS.joinRoom), 'POST', {
            roomID,
            userID: this.id,
            ...vehicle,
        });

        if(!!room){
            return null;
        }

        this.currentRoomID = room.identifier;
        this.currentRoom = room;
        return room;
    }
    async createRoom(vehicle){
        const room = (await this.#makeRequest((ENV.API + ENDPOINTS.createRoom), 'POST',{
            userID: this.id,
            ...vehicle,
        }));

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

        const result = await fetch((API + endpoint), request);
        if(result.status >= 400){
            return null;
        }

        return (await result.json()).payload;
    }
}