
import React from 'react'
import { getPagesArray } from '../../../utils/pages';

const Pagination = ({ totalPages, page, changePage }) => {
    let pageArray = getPagesArray(totalPages);
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            {pageArray.map(p =>
                <span
                    onClick={() => changePage(p)}
                    key={p}
                    className={page === p ? "page page_active" : "page"}
                >
                    {p}
                </span>
            )}
        </div>
    )
}

export default Pagination