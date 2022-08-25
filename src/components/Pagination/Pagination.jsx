import React from 'react';
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
import {useSelector} from "react-redux";

const Pagination = ({onChange}) => {
    const {currentPage} = useSelector(state => state.featureSlice)
    return (
        <div>
            <ReactPaginate className={styles.root}
                           breakLabel="<"
                           nextLabel=">"
                           onPageChange={(event) => onChange(event.selected + 1)}
                           forcePage={currentPage-1}
                           pageRangeDisplayed={8}
                           pageCount={3}
                           previousLabel="<"
                           renderOnZeroPageCount={null}
            />
        </div>
    );
};

export default Pagination;