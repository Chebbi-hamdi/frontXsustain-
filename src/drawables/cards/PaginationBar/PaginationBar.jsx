import React from 'react';
import styles from './style.module.scss';

const PaginationBar = ({ currentPage, totalPages, handlePageChange }) => {
    const goToPrevPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    return (
        <div className={styles.paginationBar}>
            <span className={styles.pageNumber}>{currentPage} of {totalPages} pages</span>
            <div className={styles.prev} onClick={goToPrevPage} disabled={currentPage === 1}>Prev</div>
            <div className={styles.next} onClick={goToNextPage} disabled={currentPage === totalPages}>Next</div>
        </div>
    );
};

export default PaginationBar;
