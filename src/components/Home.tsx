import React, { useRef} from 'react';
import Categories from "./Categories";
import Sort, {categories} from "./Sort";
import Skeleton from "./PizzaBlock/Skeleton";
import PizzaBlock from "./PizzaBlock";
import Pagination from "./Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage, setFilter} from "../features/featureSlice";
import {useNavigate} from 'react-router-dom';
import qs from "qs";
import {fetchPizzas, pizzaState} from "../features/pizzaSlice";


const Home = () => {

    const {pizzaCategoryIndex, currentPage,searchValue} = useSelector((state) => state.featureSlice);
    const {status,pizzas} = useSelector(pizzaState)
    const sortValue = useSelector((state) => state.featureSlice.sort.value)
    const dispatch = useDispatch()
    const isMounted = useRef(false);
    const navigate = useNavigate()

    const getPizzas = async () => {

        const category = pizzaCategoryIndex ? `category=${pizzaCategoryIndex}` : "";
        const checkSearchValue = searchValue ? `search=${searchValue}` : '';
        const checkOrder = sortValue.includes('-') ? 'asc' : 'desc';
        const checkSort = sortValue.replace('-', '')

        dispatch(
            fetchPizzas({
                category,
                checkSearchValue,
                checkOrder,
                checkSort,
                currentPage,
            }))
        isMounted.current = true
    }
    React.useEffect(() => {
        getPizzas()
    }, [pizzaCategoryIndex, searchValue, sortValue, currentPage])


    //Если изменили параметры поиска и был первый рендер то отрисовываем данные в адресную строку
    React.useEffect(() => {
        if (isMounted.current) {
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
            const sort = {number: countNumInCategories, value: sortValue}
            dispatch(setFilter({...parsingItems, sort}))
        }
    }, [])


    const skeletons = [...new Array(6)].map((el, i) => <Skeleton key={i}/>);
    const pizzasArr = pizzas.map(obj => {
        return <PizzaBlock  {...obj}/>
    });

    return (
        <div className="container">
            <div className="content__top">
                <Categories pizzaCategoryIndex={pizzaCategoryIndex}
                            changeCategory={(index:number) => dispatch(setCategoryId(index))}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ?(
                <div className="content__error-info">
                    <h2>Произошла ошибка <span>😕</span></h2>
                    <p>
                        Повторите позже.<br/>
                    </p>
                </div>)
                : (<div className="content__items">{status === 'loading' ? skeletons : pizzasArr}</div>)}
            <Pagination onChange={(number:number) => dispatch(setCurrentPage(number))}/>
        </div>
    );
};

export default Home;