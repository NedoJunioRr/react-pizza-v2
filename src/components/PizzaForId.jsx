import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

const PizzaForId = () => {
    const {id} = useParams()
    const [pizza, setPizza] = useState()


    useEffect(() => {

        async function fetchFullPizza() {
            try {
                const {data} = await axios.get(`https://62fe4adca85c52ee483464b0.mockapi.io/pizzas/${id}`)
                setPizza(data)
            } catch (e) {
                console.log(e);
            }
        }

        fetchFullPizza()
    }, [])
    if (!pizza) {
        return (
            <div>Загрузка</div>
        )
    }
    const {imageUrl, price, title} = pizza
    return (
        <div style={{margin: "30px", textAlign: "center"}}>
            <h1>{title}</h1>
            <img src={imageUrl} style={{width: "350px"}} alt='full-pizza'/>
            <h2>Цена: {price}</h2>
        </div>
    );
};

export default PizzaForId;