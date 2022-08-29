import React from 'react';
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
import {useSelector} from "react-redux";

type PaginateProps = {
    currentPage: number,
    onChange: (page:number) => void
}

const Pagination: React.FC<PaginateProps> = ({onChange}) => {
    const {currentPage} = useSelector(state => state.featureSlice)
    return (
        <div>
            <ReactPaginate className={styles.root}
                           breakLabel="<"
                           nextLabel=">"
                           onPageChange={(event) => onChange(event.selected + 1)}
                           forcePage={currentPage - 1}
                           pageRangeDisplayed={8}
                           pageCount={3}
                           previousLabel="<"
            />
        </div>
    );
};

export default Pagination;