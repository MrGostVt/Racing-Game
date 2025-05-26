import React, { useState, useEffect, useRef } from "react";
import menuService from "../Components/MenuService";
import { Button } from "../Components/Button";
let counter = 1;

const Menu = ({callbacks = [], menuMutator = 0, }) => {
    const [menuState, setMenuState] = useState(menuMutator);
    const [onlineButton, setOnlineButton] = useState(0);
    const onEventRef = useRef(() => {});

    useEffect(() => {
        if(menuState !== menuMutator){
            setMenuState(menuMutator);
        }
    }, [menuMutator]);
    useEffect(() => {
        if(menuState === 1){
            onEventRef.current = menuService.AddEvent('startGame');
        }
        else{
            onEventRef.current = () => {};
        }
    }, [menuState])
    let modalClass = '';

    let multiplayerSwitch;
    let startButton;
    let exitButton = <Button styles={{
            backgroundColor: '#ab1616',
        }} onClick={() => {setMenuState(0); callbacks[0]();}} text="Exit"/>;
    
    switch (menuState) {
        case 1:
            multiplayerSwitch = <Button styles={{
                backgroundColor: onlineButton === 0? '#C22E4E': 'lime',
            }} onClick={() => {setOnlineButton(onlineButton === 0? 1: 0);}} text="online"/>;
            startButton = <Button styles={{
                backgroundColor: '#96ff50',
            }} onClick={() => {onEventRef.current(!!onlineButton, counter); counter = counter + 1}} text="Start"/>;
            modalClass = "ModalMenuMin"
            break;
        case 2:
            modalClass = "ModalMenuMin";
            break;
        case 3:
            modalClass = "ModalMenuMinR";
            break;
        default:
            modalClass = ""
            exitButton = null;
            break;
    }
    return(
        <div className={`${modalClass} ModalMenu`}>
            <div id="gamePrev"><p className="Space"/>DriveAsYouCan<p className="Space"/></div>
            <Button styles={{
                 backgroundColor: '#72C288',
                 display: menuState === 0? '':"none",
            }} onClick={() => {callbacks[0]()}} text="Start" />
            <Button styles={{
                 backgroundColor: '#F091EA',
                 display: menuState === 0? '':"none",
            }} onClick={() => {callbacks[1]();}} text="Join"/>
            <Button styles={{
                 backgroundColor: '#848BDC',
                 display: menuState === 0? '':"none",
            }} text="In Developing"/>
            {multiplayerSwitch}
            {startButton}
            {exitButton}
        </div>
    );
}

export default Menu;