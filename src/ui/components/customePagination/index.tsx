"use client"

import React from "react"
import ReactPaginate from "react-paginate"

import styles from "./Pagination.module.css"

interface PaginationProps {
  pageCount: number
  initialPage?: number
  onPageChange: (selectedPage: number) => void
}

const PaginationComponent: React.FC<PaginationProps> = ({
  pageCount,
  onPageChange,
  initialPage = 0,
}) => {
  const handlePageClick = (data: { selected: number }) => {
    const selectedPage = data.selected + 1
    onPageChange(selectedPage)
  }

  return (
    <ReactPaginate
      initialPage={initialPage}
      previousLabel='<'
      nextLabel='>'
      breakLabel='...'
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick}
      containerClassName={styles.pagination}
      pageClassName={styles.page_item}
      activeClassName={styles.active}
      previousClassName={styles.page_item}
      nextClassName={styles.page_item}
      disabledClassName={styles.disabled}
      breakClassName={styles.page_item}
    />
  )
}

export default PaginationComponent
