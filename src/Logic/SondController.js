
class SoundController{
    #sounds = {};

    constructor(){}
    addSound(soundName, soundPath){
        this.#sounds[soundName] = {
            src: soundPath,
        }
    }
    playSound(soundName){
        const audio = new Audio(this.#sounds[soundName].src);
        audio.play();
    }
}

const soundController = new SoundController();
soundController.addSound("click",'/Sounds/bubble.wav');

export default soundController;