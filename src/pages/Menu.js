import React, { useState, useEffect } from "react";

const Menu = ({callbacks = []}) => {

    return(
        <div className="LeftSideMenu">
            <div className="UserPreview">
                <div className="Icon"></div>
                <div style={{
                    fontSize: '32px',
                    marginLeft: '5%',
                }}>User</div>
            </div>
            <div className="Button" style={{
                backgroundColor: '#72C288',
            }} onClick={() => callbacks[0]()}></div>
            <div className="Button" style={{
                backgroundColor: '#F091EA',
            }} onClick={() => callbacks[1]()}></div>
            <div className="Button" style={{
                backgroundColor: '#848BDC',
            }} onClick={() => callbacks[2]()}></div>
        </div>
    );
}

export default Menu;