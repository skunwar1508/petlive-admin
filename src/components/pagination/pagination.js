import { useParams } from "react-router-dom";

export default function PageModule(props) {
  const { page } = useParams()
  const paramSearch = new URLSearchParams(window.location.search);
  let page2 = paramSearch.get("page");
  let totalItems = props.totalItems || 10;
  let itemsPerPage = props.itemsPerPage || 10;

  let totalPages = Math.ceil(totalItems / itemsPerPage);

  let currentPage = (Number(page) || Number(page2)) || 1;
  let range = props.range || 3;
  let startPage = currentPage - range;
  let endPage = currentPage + range;
  let url = props.pageUrl || "/users?";
  if (endPage > totalPages) {
    endPage = totalPages;
  }

  if (startPage < 1) {
    startPage = 1;
  }
  let pageItems = [];
  // function createLink(pageNo) {
  //   return url + "pageNo=" + pageNo;
  // }
  for (let i = startPage; i <= endPage; i++) {
    pageItems.push(
      <li key={i} className={currentPage === i ? "active page-item" : "page-item"}>
        <a
          title={`Page No ${i}`}
          //   href={() => false}
          className="page-link"
          onClick={() => {
            if (props.currentPage != i) {
              props.pageChange(i);
            }
          }}
        >
          <span>
            <b>{i}</b>
          </span>
        </a>
      </li>
    );
  }
  return (
    <div className={`table_botm_paging ${props.theme ? props.theme : ''}`}>
      <ul className="pagination">
        <li className="page-item">
          <a
            title="First Page"
            // href={() => false}
            className="page-link"
            onClick={() => {
              if (currentPage > 1)
                props.pageChange(1);
            }}
          >
            <span>
              <i className={"fa fa-fast-backward"}></i>
            </span>
          </a>
        </li>
        <li className="page-item">
          <a
            title="Previous Page"
            // href={() => false}
            className="page-link"
            onClick={() => {
              props.pageChange(currentPage === 1 ? 1 : currentPage - 1);
            }}
          >
            <span>
              <i className={"fa fa-step-backward"}></i>
            </span>
          </a>
        </li>
        {pageItems}
        <li className="page-item">
          <a
            title="Next Page"
            // href={() => false}
            className="page-link"
            onClick={() => {
              props.pageChange(
                currentPage === totalPages ? totalPages : currentPage + 1
              );
            }}
          >
            <span>
              <i className={"fa fa-step-forward"}></i>
            </span>
          </a>
        </li>
        <li className="page-item">
          <a
            title="Last Page"
            // href={() => false}
            className="page-link"
            onClick={() => {
              if (currentPage < totalPages) {
                props.pageChange(totalPages);
              }
            }}
          >
            <i className={"fa fa-fast-forward"}></i>
          </a>
        </li>
      </ul>
    </div>
  );
}
