import React, { useState, useEffect } from "react";
import "./App.css";

import Menu from "./pages/Menu";
import CreatePage from "./pages/CreatePage";
import TestPage from "./pages/TestPage";



function App() {
    const [activePage, setPage] = useState(0);

    let page = null;
    switch(activePage){
        case 1: page = <CreatePage updatePage = {updatePage} />; break;
        case 0: page = null; break;
        default: page = <TestPage />; break;
    }

    function updatePage(page = (activePage === 0? 1: 0)){
        console.log(page);
        setPage(page);
    }

    return (
        <>
          <Menu callbacks={[() => updatePage(), () => updatePage(), () =>  {updatePage(2)}]}/>
          {page}
        </>
    );
}

export default App;
