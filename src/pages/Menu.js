import React, { useState, useEffect } from "react";

const Menu = ({callbacks = [], menuMutator = 0}) => {
    const [menuState, setMenuState] = useState(menuMutator);

    useEffect(() => {
        if(menuState !== menuMutator){
            setMenuState(menuMutator);
        }
    }, [menuMutator]);

    let lSideMenuClass = '';
    let userPreviewStyles = null;
    let isNavigationActive = false;
    let exitButton = <div className="Button" style={{
            backgroundColor: 'red',
            marginTop: '50vh',
            width: menuState === 1? '70%': '',
            left: menuState === 1? '7.5%': '',
        }} onClick={() => {setMenuState(0); callbacks[0]();}}></div>;
    
    switch (menuState) {
        case 1:
            lSideMenuClass = "LeftSideMenuMin";
            userPreviewStyles = {
                position: 'relative',
                width: '70%',
                borderRadius: '50px',
                left: '7.5%'
            };
            break;
        case 2: 
            lSideMenuClass = "";
            break;
        default:
            isNavigationActive = true;
            lSideMenuClass = '';
            exitButton = null;
            break;
    }

    return(
        <div className={`LeftSideMenu ${lSideMenuClass}`} onMouseEnter={() => {
            if(menuState === 1){
                setMenuState(2);
            }
        }} onMouseLeave={() => {
            if(menuState === 2){
                setMenuState(1)
            }
        }}>
            <div className="UserPreview" style={{...userPreviewStyles}}>
                <div className="Icon" style={{
                    marginLeft: '5%',
                }}></div>
                <div style={{
                    fontSize: '32px',
                    marginLeft: '5%',
                    display: userPreviewStyles === null? '': 'none',
                    userSelect: 'none',
                }}>User</div>
            </div>
            <div className="Button" style={{
                backgroundColor: '#72C288',
                display: isNavigationActive? '':"none",
            }} onClick={() => {setMenuState(0); callbacks[0]();}}></div>
            <div className="Button" style={{
                backgroundColor: '#F091EA',
                display: isNavigationActive? '':"none",
            }} onClick={() => {setMenuState(0); callbacks[1]();}}></div>
            <div className="Button" style={{
                backgroundColor: '#848BDC',
                display: isNavigationActive? '':"none",
            }} onClick={() => {setMenuState(1); callbacks[2]();}}></div>
            {exitButton}
        </div>
    );
}

export default Menu;