import React, {useEffect, useRef, useState} from "react";
import {setSortNumber, setSortValue} from "../features/featureSlice";
import {useDispatch, useSelector} from "react-redux";

type categoriesItem = {
    name: string,
    property:string
}

type PopUpClick = MouseEvent & {
    path: Node[]
}

export const categories:categoriesItem[] = [
    {name: 'Популярности(desc)', property: 'rating'},
    {name: 'Популярности(asc)', property: '-rating'},
    {name: 'Цене(desc)', property: 'price'},
    {name: 'Цене(asc)', property: '-price'},
    {name: 'Алфавиту(desc)', property: 'title'},
    {name: 'Алфавиту(asc)', property: '-title'}
];

const Sort:React.FC = () => {
    const dispatch = useDispatch()
    const sortRef = useRef<HTMLDivElement>(null)

    const selectItem = useSelector((state) => state.featureSlice.sort.number)

    const [sortPop, setSortPop] = useState(false)

    const sortName = categories[selectItem].name

    const activeCategories = (i:number) => {
        dispatch(setSortNumber(i))
        setSortPop(false)
        dispatch(setSortValue(categories[i].property))
    }



    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const _event = event as PopUpClick;

            if (sortRef.current && !_event.path.includes(sortRef.current)) {
                setSortPop(false)
            }
        };

        document.body.addEventListener('click', handleClickOutside);

        return () => document.body.removeEventListener('click', handleClickOutside);
    }, []);


    return (
        <div className="sort" ref={sortRef}>
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => setSortPop(!sortPop)}>{sortName}</span>
            </div>
            <div className="sort__popup">
                <ul>
                    {sortPop && categories.map((el, i) => {
                        return <li onClick={() => activeCategories(i)} key={i}
                                   className={selectItem === i ? 'active' : ''}>{el.name}</li>
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Sort;