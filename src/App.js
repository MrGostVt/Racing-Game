import React, { useState, useEffect } from "react";
import "./App.css";

import Menu from "./pages/Menu";
import CreatePage from "./pages/CreatePage";
import TestPage from "./pages/TestPage";
import { MapLoaderPage } from "./pages/MapLoaderPage";

let SavedInstance = {
    vehicleObject: {},
    mapObject: {},
}

function App() {
    const [activePage, setPage] = useState(0);

    let page = null;
    switch(activePage){
        case 1: page = <CreatePage updatePage = {updatePageToMap} />; break;
        case 0: page = null; break;
        case 2: page = <MapLoaderPage mapObject={SavedInstance.mapObject} 
                vehicle={SavedInstance.vehicleObject} />; break;
        default: page = <TestPage />; break;
    }

    function updatePage(page = (activePage === 0? 1: 0)){
        console.log(page);
        setPage(page);
    }
    function updatePageToMap(mapObject, vehicle){
        SavedInstance.mapObject = mapObject;
        SavedInstance.vehicleObject = vehicle;

        setPage(2);
    }

    return (
        <>
          <Menu callbacks={[() => updatePage(), () => updatePage(), () =>  {updatePage(SavedInstance.mapObject.object == null? 11: 2)}]}/>
          {page}
        </>
    );
}

export default App;
