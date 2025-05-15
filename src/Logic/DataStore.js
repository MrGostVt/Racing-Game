
export const DataStore = {
    async GetUserID(){
        const user = localStorage.getItem('userID');
        return user;
    },
    async CheckUserID(){
        const user = localStorage.getItem('userID');
        if(!!user){
            return false;
        }
        return true;
    },
    async SetUserID(value){
        localStorage.setItem('userID', value);
    },
}