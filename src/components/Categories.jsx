import React from "react";

const Categories = () => {
    const pizzas = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]
    const [pizzaActiveIndex, setPizzaActiveIndex] = React.useState(0);
    return (
        <div className="categories">
            <ul>
                {pizzas.map((el, index) => {
                    return <li key={index} onClick={() => setPizzaActiveIndex(index)}
                               className={pizzaActiveIndex === index ? 'active' : ''}>
                        {el}
                    </li>
                })}
            </ul>
        </div>
    );
};

export default Categories;