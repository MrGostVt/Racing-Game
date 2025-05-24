import soundController from "../Logic/SondController";

export const Button = ({styles = {}, onClick = () => {}, text = ""}) => {

    return(
        <div className="Button" style={{
           ...styles
       }} onClick={() => {soundController.playSound('click'); onClick();}}>{text}</div>
    );
}