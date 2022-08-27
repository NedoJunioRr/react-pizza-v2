import React, {useRef, useState, useContext, useCallback} from 'react';
import {FcSearch} from "react-icons/fc";
import styles from './Search.module.scss'
import {AiOutlineClose} from "react-icons/ai";
import debounce from 'lodash.debounce'
import {SearchContext} from "../../App";
import {useDispatch} from "react-redux";
import {setSearchValue} from "../../features/featureSlice";

const Search = () => {

    const dispatch = useDispatch()
    const [inputValue,setInputValue] = useState('');



    const inputRef = useRef()

    const closeIconUse = () =>{
        setInputValue('')
        inputRef.current.focus()
    }

    const changeInputValue =  useCallback(
        debounce(string=> {
        dispatch(setSearchValue(string))
    },500), [])

    const onChangeInput = (event) =>{
        setInputValue(event.target.value)
        changeInputValue(event.target.value)
    }

    return (
        <div className={styles.root}>
            <FcSearch className={styles.icon}/>
            <input className={styles.input} value={inputValue} onChange={(event)=>onChangeInput(event)} ref={inputRef}/>
            {inputValue.length>0 &&
                <AiOutlineClose className={styles.close} onClick={closeIconUse} />
            }
        </div>
    );
};

export default Search;