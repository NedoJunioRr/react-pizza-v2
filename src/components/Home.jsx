import React, {useContext, useRef} from 'react';
import Categories from "./Categories";
import Sort, {categories} from "./Sort";
import Skeleton from "./PizzaBlock/Skeleton";
import PizzaBlock from "./PizzaBlock";
import Pagination from "./Pagination/Pagination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage, setFilter} from "../features/featureSlice";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import qs from "qs";

const Home = () => {

    const {pizzaCategoryIndex, currentPage} = useSelector((state) => state.featureSlice);
    const sortValue = useSelector((state) => state.featureSlice.sort.value)
    const dispatch = useDispatch()
    const isMounted = useRef(false);

    const {searchValue} = useContext(SearchContext)
    const [isLoading, setIsLoading] = React.useState(true)
    const [pizzas, setPizzas] = React.useState([])

    const navigate = useNavigate()
    // Если был первый рендер, то запрашиваем пиццы
    React.useEffect(() => {
        const category = pizzaCategoryIndex ? `category=${pizzaCategoryIndex}` : "";

        const checkSearchValue = searchValue ? `search=${searchValue}` : '';
        const checkOrder = sortValue.includes('-') ? 'asc' : 'desc';
        const checkSort = sortValue.replace('-', '')
        setIsLoading(true)
        axios.get(`https://62fe4adca85c52ee483464b0.mockapi.io/pizzas?${category}&sortBy=${checkSort}&order=${checkOrder}&${checkSearchValue}&page=${currentPage}&limit=4`)
            .then(res => {
                setPizzas(res.data)
                setIsLoading(false)
                isMounted.current=true
            })
    }, [pizzaCategoryIndex, searchValue, sortValue, currentPage])

    //Если изменили параметры поиска и был первый рендер то отрисовываем данные в адресную строку
    React.useEffect(() => {
        if(isMounted.current) {
            const queryString = qs.stringify({
                pizzaCategoryIndex,
                sortValue,
                currentPage
            })
            navigate(`?${queryString}`)

        }
    }, [pizzaCategoryIndex, sortValue, currentPage])
    //Если был первый рендер, то проверяем параметры URL и сохраняем в redux
    React.useEffect(() => {
        if (window.location.search) {
            const parsingItems = qs.parse((window.location.search).substring(1))
            let countNumInCategories = categories.findIndex(el => el.property === parsingItems.sortValue)
            const findNumInCategories = {number: countNumInCategories, value: sortValue}
            dispatch(setFilter({...parsingItems, findNumInCategories}))
        }
    }, [])
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
                    [...new Array(6)].map((el,i) => <Skeleton key={i}/>) :
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