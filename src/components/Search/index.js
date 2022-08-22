import React from 'react';
import {FcSearch} from "react-icons/fc";
import styles from './Search.module.scss'
import {AiOutlineClose} from "react-icons/ai";

const Search = ({searchValue,setSearchValue}) => {
    return (
        <div className={styles.root}>
            <FcSearch className={styles.icon}/>
            <input className={styles.input} value={searchValue} onChange={(event)=>setSearchValue(event.target.value)}/>
            {searchValue.length>0 &&<AiOutlineClose className={styles.close} onClick={()=>setSearchValue('')}/>}
        </div>
    );
};

export default Search;