import './scss/App.scss';
import {
    Routes,
    Route,
} from "react-router-dom";

import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";
import PizzaForId from "./components/PizzaForId";
import MainLayout from "./layouts/MainLayout";


function App() {


    return (
        <Routes>
            <Route path='/' element={<MainLayout/>}>
                <Route path='/' element={<Home/>}/>
                <Route path='/pizza/:id' element={<PizzaForId/>}/>
                <Route path='*' element={<NotFound/>}/>
                <Route path='/cart' element={<Cart/>}/>
            </Route>
        </Routes>
    );
}

export default App;
