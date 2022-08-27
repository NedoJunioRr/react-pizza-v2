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
import PizzaForId from "./components/PizzaForId";


export const SearchContext = React.createContext();


function App() {



    return (
        <div className="App">
            <div className="wrapper">
                    <Header />
                    <div className="content">
                        <Routes>
                            <Route path='/' element={<Home/>}/>
                            <Route path='/pizza/:id' element={<PizzaForId/>}/>
                            <Route path='*' element={<NotFound/>}/>
                            <Route path='/cart' element={<Cart/>}/>
                        </Routes>
                    </div>
            </div>
        </div>
    );
}

export default App;
