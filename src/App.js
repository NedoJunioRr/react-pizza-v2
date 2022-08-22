import React from "react";
import './scss/App.scss';
import Header from "./components/Header";
import {
    Routes,
    Route,
} from "react-router-dom";

import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";

function App() {
    const [searchValue,setSearchValue] = React.useState('')
    return (
        <div className="App">
            <div className="wrapper">
                <Header searchValue = {searchValue} setSearchValue={setSearchValue}/>
                <div className="content">
                    <Routes>
                        <Route path='/' element={<Home searchValue={searchValue}/>}/>
                        <Route path='*' element={<NotFound/>}/>
                        <Route path='/cart' element={<Cart/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
