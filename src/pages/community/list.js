import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import common from '../../services/common';
import PageModule from '../../components/pagination/pagination';
import authAxios from '../../services/authAxios';
import SearchFormik from '../../components/common/searchFormik';
import { UserContext } from '../../context/theme';
import { toast } from 'react-toastify';
import ReactConfirm from '../../components/confirm/reactConfirm';
import Moment from 'react-moment';
import ViewMore from '../../components/modal/viewMoreContent';

function List() {
  let navigate = useNavigate();
  const { checkPage } = useContext(UserContext);
  const paramSearch = new URLSearchParams(window.location.search);
  let searchString = paramSearch.get('searchString');
  let articleStatus = paramSearch.get('articleStatus');
  let { page } = useParams();

  const [paginData, setPaginData] = useState({
    list: [],
    activePage: parseInt(page) || 1,
    itemsCountPerPage: common.perPageData(),
    totalItemsCount: 0,
  });

  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRow = (id) => {
    const currentExpandedRows = [...expandedRows];
    const isRowExpanded = currentExpandedRows.includes(id);

    if (isRowExpanded) {
      setExpandedRows(currentExpandedRows.filter((rowId) => rowId !== id));
    } else {
      setExpandedRows([...currentExpandedRows, id]);
    }
  };

  const getData = async () => {
    let postData = {
      page: page || 1,
      perPage: paginData.itemsCountPerPage,
      searchString: searchString || '',
    };

    if (articleStatus) {
      postData.articleStatus = articleStatus;
    }

    common.loader(true);
    await authAxios({
      method: 'POST',
      url: `/community/paginate`,
      data: postData,
    })
      .then((res) => {
        setPaginData({
          ...paginData,
          activePage: page,
          list: res?.data?.data || [],
          totalItemsCount: res?.data?.totalCount,
        });

      })
      .catch((error) => {
        console.log(error);

        common.error(error);
      });
    common.loader(false);
  };

  useEffect(() => {
    getData();
  }, [page, searchString, paginData.sort, articleStatus]);

  const pageHasChanged = (pageNumber) => {
    if (pageNumber !== paginData.activePage) {
      setPaginData({
        ...paginData,
        activePage: pageNumber || 1,
        list: [],
      });

      const filters = common.getFilter()
      const queryString = new URLSearchParams(filters).toString();
      navigate(`/community/list/${pageNumber}?${queryString}`);
    }
  };



  return (
    <>
      <div className="row mb-4">
        <div className="col-sm-12">
          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-header d-flex align-items-center justify-content-between py-3 w-100 bg-transparent">
              <div className="left-widget col-4">
                <SearchFormik name="getFilter" onChange={(values) => {
                  let search = common.getFilter();
                  search.page = 1;
                  search.searchString = values.searchString;
                  const queryString = new URLSearchParams(search).toString();
                  navigate(`/community/list/${1}?` + queryString);
                }} />
              </div>
              <div className="right-widget ml-auto col-4">
                {/* <div className="float-right d-flex align-items-center">
                  <select value={articleStatus} className="form-select form-select-sm" onChange={(e) => {
                    let search = common.getFilter();
                    search.page = 1;
                    search.articleStatus = e.target.value;
                    const queryString = new URLSearchParams(search).toString();
                    navigate(`/templates/list/${1}?` + queryString);
                  }}>
                    <option value="">Article Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div> */}
                <div className="float-right d-flex align-items-center">
                  <Link to={`/community/add`} className="btn btn-theme btn-sm">
                    Add Community
                  </Link>
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>S. No.</th>
                      <th>image</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Created By</th>
                      <th>Created Date</th>
                      <th>Members</th>
                      <th className="text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      paginData?.list?.map((data, key) => (
                        <React.Fragment key={key}>
                          <tr>
                            <td>
                              {(Number(page) == 1 ? 0 : (Number(page) - 1) * paginData.itemsCountPerPage) + key + 1}
                            </td>
                            <td>
                              <a href={data?.image?.path} target="_blank">
                                <img style={{ width: '100px', maxHeight: '100px' }} src={data?.image?.path || ''} className='img-fluid' />
                              </a>
                            </td>
                            <td>{data?.name}</td>
                            <td>
                              <ViewMore data={data?.description} maxLength={20} />
                            </td>
                            <td>{common.capitalizeWord(data?.createdBy)}</td>

                            <td>
                              <Moment format="MMM DD, YYYY">{data?.createdAt}</Moment>
                            </td>
                            <td>
                              {data?.members?.length || '-'}
                            </td>
                            <td className="text-right">
                              <Link to={`/community/edit/${data?._id}`} className="btn btn-info">
                                Edit
                              </Link>

                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {paginData?.totalItemsCount > paginData.itemsCountPerPage && (
        <PageModule
          totalItems={paginData.totalItemsCount}
          itemsPerPage={paginData.itemsCountPerPage}
          currentPage={paginData.activePage}
          range={3}
          theme="paging-4"
          pageChange={(page) => {
            pageHasChanged(page);
          }}
        />
      )}
    </>
  );
}

export default List;