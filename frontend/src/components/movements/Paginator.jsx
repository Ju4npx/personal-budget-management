import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";

const Paginator = ({ itemsCount = 0, itemsPerPage = 10 }) => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setPageCount(Math.ceil(itemsCount / itemsPerPage));
  }, [itemsCount, itemsPerPage, itemOffset]);

  useEffect(() => {
    let page = searchParams.get("page") || 1;

    if (currentPage <= 0 || isNaN(currentPage)) {
      page = 1;
      setSearchParams({ page: 1 });
    }

    if (page <= pageCount) setCurrentPage(page);
  }, [searchParams, pageCount]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % itemsCount;
    setItemOffset(newOffset);

    searchParams.set("page", event.selected + 1);
    setSearchParams(searchParams);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        forcePage={currentPage - 1}
        nextLabel=">"
        onPageChange={handlePageClick}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className="paginator"
        pageClassName="paginator__page-item"
        pageLinkClassName="paginator__page-link"
        previousClassName="paginator__page-item"
        previousLinkClassName="paginator__page-link"
        nextClassName="paginator__page-item"
        nextLinkClassName="paginator__page-link"
        breakClassName="paginator__page-item paginator__page-item--break"
        breakLinkClassName="paginator__page-link paginator__page-link--break"
        containerClassName="paginator__pagination"
        activeClassName="paginator__page-item paginator__page-item--active"
        activeLinkClassName="paginator__page-link paginator__page-link--active"
      />
    </>
  );
};
export default Paginator;
