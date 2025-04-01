import React, { useState, useEffect } from "react";
import "./App.css";

import Menu from "./pages/Menu";
import CreatePage from "./pages/CreatePage";



function App() {
    const [activePage, setPage] = useState(0);

    let page = null;
    switch(activePage){
        case 1: page = <CreatePage />; break;
    }

    function updatePage(){
        console.log('200')
        setPage(activePage === 0? 1: 0)
    }

    return (
        <>
          <Menu callbacks={[() => updatePage(), () => updatePage(), () => updatePage()]}/>
          {page}
        </>
    );
}

export default App;
