import React from 'react';
import Categories from "./Categories";
import Sort from "./Sort";
import Skeleton from "./PizzaBlock/Skeleton";
import PizzaBlock from "./PizzaBlock";

const Home = () => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [pizzas, setPizzas] = React.useState([])
    const [pizzaCategoryIndex, setPizzaCategoryIndex] = React.useState(0);
    const cat = pizzaCategoryIndex?`category=${pizzaCategoryIndex}`:"";
    const [sortValue,setSortValue] = React.useState('rating')

    const [selectItem, setSelectItem] = React.useState(0);

    console.log(pizzaCategoryIndex)
    React.useEffect(() => {
        setIsLoading(true)
        fetch(`https://62fe4adca85c52ee483464b0.mockapi.io/pizzas?${cat}&sortBy=${sortValue}&order=asc`)
            .then(res => res.json())
            .then(json => {
                setPizzas(json)
                setIsLoading(false)
                console.log(sortValue)
            })
    }, [pizzaCategoryIndex,sortValue])
    return (
        <div className="container">
            <div className="content__top">
                <Categories pizzaCategoryIndex={pizzaCategoryIndex} changeCategory = {(index)=>setPizzaCategoryIndex(index)}/>
                <Sort value = {selectItem} changeSortItem = {(i)=> setSelectItem(i)} setSortValue = {(item)=>setSortValue(item)}/>
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
        </div>
    );
};

export default Home;