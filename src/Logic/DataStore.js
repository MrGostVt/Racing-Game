
export const DataStore = {
    GetUserID(){
        const user = localStorage.getItem('userID');
        return user;
    },
    CheckUserID(){
        const user = localStorage.getItem('userID');
        if(!user){
            return false;
        }
        return true;
    },
    SetUserID(value){
        localStorage.setItem('userID', value);
    },
}