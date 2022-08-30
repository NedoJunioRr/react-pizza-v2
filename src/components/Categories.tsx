import React from "react";
import { useWhyDidYouUpdate } from 'ahooks';
import CartItem from "./CartItem";

type CategoriesProps = {
    changeCategory: (i:number)=>void,
    pizzaCategoryIndex:number
}



const Categories:React.FC<CategoriesProps> = React.memo(({changeCategory, pizzaCategoryIndex}) => {
    const pizzas = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]
    useWhyDidYouUpdate( 'Categories',{changeCategory, pizzaCategoryIndex})
    return (
        <div className="categories">
            <ul>
                {pizzas.map((el, index) => {
                    return <li key={index} onClick={() => changeCategory(index)}
                               className={pizzaCategoryIndex === index ? 'active' : ''}>
                        {el}
                    </li>
                })}
            </ul>
        </div>
    );
});

export default Categories;