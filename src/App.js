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


export const SearchContext = React.createContext();


function App() {


    const [searchValue, setSearchValue] = React.useState('')
    return (
        <div className="App">
            <div className="wrapper">
                <SearchContext.Provider value={{searchValue,setSearchValue}}>
                    <Header />
                    <div className="content">
                        <Routes>
                            <Route path='/' element={<Home searchValue={searchValue}/>}/>
                            <Route path='*' element={<NotFound/>}/>
                            <Route path='/cart' element={<Cart/>}/>
                        </Routes>
                    </div>
                </SearchContext.Provider>
            </div>
        </div>
    );
}

export default App;
