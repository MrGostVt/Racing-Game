import React, { useState, useEffect } from "react";
import "./App.css";

import Menu from "./pages/Menu";
import CreatePage from "./pages/CreatePage";
import TestPage from "./pages/TestPage";
import { MapLoaderPage } from "./pages/MapLoaderPage";
import { CreateMultiplayerPage } from "./pages/CreateMultiplayerPage";

let SavedInstance = {
    vehicleObject: {id: 0, colorID: 0},
    mapObject: {},
    isMultiplayer: false,
    isJoin: false,
}


function App() {
    const [activePage, setPage] = useState(0);
    const [menuMutator, setMenuMutator] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    let page = null;
    let loadingPrev = null;
    switch(activePage){
        case 1: page = <CreatePage updatePage = {updatePageToMap} />; break;
        case 0: page = null; break;
        case 2: page = <MapLoaderPage mapObject={SavedInstance.mapObject} 
            vehicleObject={SavedInstance.vehicleObject} isMultiplayer={SavedInstance.isMultiplayer} setLoading={setLoading} 
            isJoin={SavedInstance.isJoin}/>; break;
        case 3: page = <CreateMultiplayerPage updatePage = {updatePageToMap} setLoading={setLoading} />; break;
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

    function updatePage(page = (activePage === 0? 1: 0)){
        console.log(page);
        const currentPage = page === activePage? 0: page;
        
        setPage(currentPage);
        if(currentPage !== 2){
            setMenuMutator(0);
        }
    }
    function updatePageToMap(mapObject, vehicle, colorID, isMultiplayer = false, isJoin = false){
        SavedInstance.mapObject = mapObject;
        SavedInstance.vehicleObject.id = vehicle;
        SavedInstance.vehicleObject.colorID = colorID;
        SavedInstance.isMultiplayer = isMultiplayer;
        SavedInstance.isJoin = isJoin;

        setPage(2); 
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

    return (
        <>
          <Menu menuMutator={menuMutator}
            callbacks={[() => updatePage(), () => updatePage(3), () =>  {updatePage(SavedInstance.mapObject.object == null? 11: 2)}]}/>
          {page}
          {loadingPrev}
        </>
    );
}

export default App;
