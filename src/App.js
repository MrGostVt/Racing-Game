import React, { useState, useEffect, useRef } from "react";
import "./App.css";

import Menu from "./pages/Menu";
import CreatePage from "./pages/CreatePage";
import TestPage from "./pages/TestPage";
import { MapLoaderPage } from "./pages/MapLoaderPage";
import { MultiplayerPage } from "./pages/MultiplayerPage";

let SavedInstance = {
    vehicleObject: {id: 0, colorID: 0},
    mapObject: {},
    isMultiplayer: false,
    isJoin: false,
}
let tipText = "";
let timeout;

function App() {
    const [activePage, setPage] = useState(0);
    const [menuMutator, setMenuMutator] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [tip, setTip] = useState(false);

    let page = null;
    let loadingPrev = null;
    let tipPrev = null;
    switch(activePage){
        case 1: page = <CreatePage updatePage = {updatePageToMap} showTip = {showTip} />; break;
        case 0: page = null; break;
        case 3: page = <MapLoaderPage mapObject={SavedInstance.mapObject} setTip={showTip}
            vehicleObject={SavedInstance.vehicleObject} isMultiplayer={SavedInstance.isMultiplayer} setLoading={setLoading} 
            isJoin={SavedInstance.isJoin} />; break;
        case 2: page = <MultiplayerPage updatePage = {updatePageToMap} showTip = {showTip} setLoading={setLoading}/>; break;
        default: page = <TestPage />; break;
    }
    if(isLoading){
        loadingPrev = <div className="LoadingPreview">
                        <div className="LoadingContainer">
                            <div className="LoadPrev"></div>
                            <div className="LoadPrev"></div>
                            <div className="LoadPrev"></div>
                        </div>
                    </div>;
    }
    if(tip){
        tipPrev = <div className="TipPrev">{tipText}</div>
    }

    function updatePage(page = (activePage === 0? 1: 0)){
        console.log(page);
        const currentPage = page === activePage? 0: page;
        
        setPage(currentPage);
        setMenuMutator(page)
    }

    function updatePageToMap(mapObject, vehicle, colorID, isMultiplayer = false, isJoin = false){
        console.log("mapObject")
        console.log(mapObject);
        SavedInstance.mapObject = mapObject;
        SavedInstance.vehicleObject.id = vehicle;
        SavedInstance.vehicleObject.colorID = colorID;
        SavedInstance.isMultiplayer = isMultiplayer;
        SavedInstance.isJoin = isJoin;

        setPage(3); 
        setMenuMutator(1);
    }

    function setLoading(isLoading, isAuto = false){
        setIsLoading(isLoading);

        if(isAuto){
            setTimeout(() => {
                setLoading(false, false);
            }, 3000);
        }
    }
    function showTip(text){
        let time = 0;
        if(tip){
            time = 100;
            setTip(false);
            clearTimeout(timeout);
        }
        
        setTimeout(() => {
            tipText = text
            setTip(true);
            
            timeout = setTimeout(() => {
                setTip(false);
                tipText = ""
            }, 2000);
        }, time)
    }


    return (
        <>
          <div className="Background"></div>
          <Menu menuMutator={menuMutator}
            callbacks={[() => updatePage(), () => updatePage(2), () =>  {updatePage(SavedInstance.mapObject.object == null? 0: 3)}]}/>
          {page}
          {loadingPrev}
          {tipPrev}
        </>
    );
}

export default App;
