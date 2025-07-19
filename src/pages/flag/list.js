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
import ReusableAsyncSelect from '../../components/common/multiSelectSearch';

function List() {
  let navigate = useNavigate();
  const { checkPage } = useContext(UserContext);
  const paramSearch = new URLSearchParams(window.location.search);
  // let searchString = paramSearch.get('searchString');
  const { searchString, communityId, communityPostId } = common.getFilterFlag();
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
    if (communityId || communityPostId) {
      postData.filters = {}
    }
    if (communityId) {
      postData.filters.communityId = communityId;
    }
    if (communityPostId) {
      postData.filters.communityPostId = communityPostId;
    }

    common.loader(true);
    await authAxios({
      method: 'POST',
      url: `/community/flag/paginate`,
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
  }, [page, searchString, paginData.sort, communityId, communityPostId]);

  const pageHasChanged = (pageNumber) => {
    if (pageNumber !== paginData.activePage) {
      setPaginData({
        ...paginData,
        activePage: pageNumber || 1,
        list: [],
      });

      const filters = common.getFilterFlag()
      const queryString = new URLSearchParams(filters).toString();
      navigate(`/flag/list/${pageNumber}?${queryString}`);
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
                  let search = common.getFilterFlag();
                  search.page = 1;
                  search.searchString = values.searchString;
                  const queryString = new URLSearchParams(search).toString();
                  navigate(`/flag/list/${1}?` + queryString);
                }} />
              </div>
              <div className="right-widget ml-auto col-4">
                <div className="float-right gap-2 d-flex align-items-center">

                  <ReusableAsyncSelect
                    apiEndpoint="/community/paginate"
                    requestPayload={{ page: 1, perPage: 100 }}
                    mapResponseToOptions={(data) => data.map(item => ({ label: item.name, value: item._id }))}
                    onChange={(selectedOption) => {
                      let search = common.getFilterFlag();
                      search.page = 1;
                      search.communityId = selectedOption?.value;
                      const queryString = new URLSearchParams(search).toString();
                      navigate(`/flag/list/${1}?` + queryString);
                    }}
                    value={communityId}
                    defaultOptions={true}
                    getOptionLabel={(e) => e.label}
                    getOptionValue={(e) => e.value}
                  />
                  {communityId && (
                    <ReusableAsyncSelect
                      apiEndpoint={`/community/post/${communityId}/paginate`}
                      requestPayload={{ page: 1, perPage: 100 }}
                      mapResponseToOptions={(data) => data.map(item => ({ label: item.content, value: item._id }))}
                      onChange={(selectedOption) => {
                        let search = common.getFilterFlag();
                        search.page = 1;
                        search.communityPostId = selectedOption?.value;
                        const queryString = new URLSearchParams(search).toString();
                        navigate(`/flag/list/${1}?` + queryString);
                      }}
                      value={communityPostId}
                      defaultOptions={true}
                      getOptionLabel={(e) => e.label}
                      getOptionValue={(e) => e.value}
                    />
                  )}
                  <button className="btn btn-sm btn-outline-primary" onClick={() => {
                    navigate(`/flag/list/${1}`);
                  }}>
                    Reset
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>S. No.</th>
                      <th>Reason</th>
                      <th>Community Name</th>
                      <th>Post</th>
                      <th>Post By</th>
                      <th>Flag By</th>
                      <th>Date</th>
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
                              {data?.reason}
                            </td>
                            <td>{data?.communityId?.name}</td>
                            <td>{data?.communityPostId?.content}</td>
                            <td>
                              {data?.communityPostId?.authorRole === 'patient' && (
                                <>
                                  <Link to={`/patients/view/${data?.communityPostId?.author?._id}`} className="text-decoration-none">
                                    {data?.communityPostId?.author?.fullName}
                                  </Link>
                                </>
                              )}
                              {data?.communityPostId?.authorRole === 'doctor' && (
                                <>
                                  <Link to={`/providers/view/${data?.communityPostId?.author?._id}`} className="text-decoration-none">
                                    {data?.communityPostId?.author?.firstName} {data?.communityPostId?.author?.lastName}
                                  </Link>
                                </>
                              )}
                            </td>
                            <td>
                              {/* {common.capitalizeWord(data?.flaggedByRole)} -{' '} */}
                              {data?.flaggedByRole === 'patient'
                                ? (
                                  <Link to={`/patients/view/${data?.flaggedBy?._id}`} className="text-decoration-none">
                                    {common.capitalizeWord(data?.flaggedBy?.fullName)}
                                  </Link>
                                )
                                : (
                                  <Link to={`/providers/view/${data?.flaggedBy?._id}`} className="text-decoration-none">
                                    {common.capitalizeWord(data?.flaggedBy?.firstName)} {common.capitalizeWord(data?.flaggedBy?.lastName)}
                                  </Link>
                                )}
                            </td>
                            <td>
                              <Moment format="MMM DD, YYYY">{data?.createdAt}</Moment>
                            </td>
                            <td className="text-right">
                              {!data?.communityPostId?.isDeleted ? (
                                <ReactConfirm
                                  type="delete"
                                  route={`/community/post/${data?.communityPostId?._id}/delete`}
                                  action={() => getData()}
                                  message='Are you sure you want to delete this community?'
                                />
                              ) : (
                                <span className="text-danger">Deleted</span>
                              )}
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