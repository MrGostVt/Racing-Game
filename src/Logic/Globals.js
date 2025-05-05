const buttonEvents = []

export function addButtonEvent(callback){
    buttonEvents.push(callback);

    document.addEventListener('keydown', callback);
}

// document.removeEventListener('keydown');

export function deleteAllButtonEvents(){
    document.removeEventListener('keydown');
}

export const COLORS = ['brown', 'lightgrey', 'yellow', 'greenyellow'];