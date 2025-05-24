class MenuService{
    #events = {};
    constructor(){
    }
    AddEvent(event){
        if(typeof this.#events[event] == 'undefined'){
            this.#events[event] = [];
        }
        
        const callback = (...data) => {
            this.HandleEvent(event, data);
        }

        return callback;
    }
    RemoveSubscribe(event, id){
        if(!!this.#events[event][id]){
            this.#events[event].splice(id, 1);
            return true;
        }
        else return false;
    }
    HandleEvent(event, data){
        if(typeof this.#events[event] == 'undefined'){return;}
        this.#events[event].forEach((callback) => {callback(data)});
    }
    Subscribe(event, callback){
        if(typeof this.#events[event] == 'undefined'){
            this.#events[event] = [];
        }
        this.#events[event].push(callback);
        return this.#events[event].length-1;
    }
}

const menuService = new MenuService();

export default menuService;