import React, {useContext} from 'react';
import Categories from "./Categories";
import Sort from "./Sort";
import Skeleton from "./PizzaBlock/Skeleton";
import PizzaBlock from "./PizzaBlock";
import Pagination from "./Pagination/Pagination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId,setCurrentPage} from "../features/featureSlice";
import axios from "axios";

const Home = () => {

    const {pizzaCategoryIndex,currentPage} = useSelector((state) => state.featureSlice);
    const sortValue = useSelector((state) => state.featureSlice.sort.value)
    const dispatch = useDispatch()

    const {searchValue} = useContext(SearchContext)
    const [isLoading, setIsLoading] = React.useState(true)
    const [pizzas, setPizzas] = React.useState([])
    const category = pizzaCategoryIndex ? `category=${pizzaCategoryIndex}` : "";

    const checkSearchValue = searchValue ? `search=${searchValue}` : '';
    const checkOrder = sortValue.includes('-') ? 'asc' : 'desc';
    const checkSort = sortValue.replace('-', '')


    React.useEffect(() => {
        setIsLoading(true)
        axios.get(`https://62fe4adca85c52ee483464b0.mockapi.io/pizzas?${category}&sortBy=${checkSort}&order=${checkOrder}&${checkSearchValue}&page=${currentPage}&limit=4`)

            .then(res => {
                setPizzas(res.data)
                setIsLoading(false)
            })
    }, [pizzaCategoryIndex, searchValue, sortValue, currentPage])
    return (
        <div className="container">
            <div className="content__top">
                <Categories pizzaCategoryIndex={pizzaCategoryIndex}
                            changeCategory={(index) => dispatch(setCategoryId(index))}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ?
                    [...new Array(6)].map(el => <Skeleton/>) :
                    pizzas.map(obj => {
                        return <PizzaBlock key={obj.id} {...obj}/>
                    })
                }
            </div>
            <Pagination onChange={(number) => dispatch(setCurrentPage(number))}/>
        </div>
    );
};

export default Home;