import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import common from '../../services/common';
import PageModule from '../../components/pagination/pagination';
import authAxios from '../../services/authAxios';
import SearchFormik from '../../components/common/searchFormik';
import { UserContext } from '../../context/theme';
import ReactConfirm from '../../components/confirm/reactConfirm';
import ViewMore from '../../components/modal/viewMoreContent';

function List() {
  let navigate = useNavigate();
  const { checkPage } = useContext(UserContext);
  const paramSearch = new URLSearchParams(window.location.search);
  let searchString = paramSearch.get('searchString');
  let { page } = useParams();

  const [paginData, setPaginData] = useState({
    list: [],
    activePage: parseInt(page) || 1,
    itemsCountPerPage: common.perPageData(),
    totalItemsCount: 0,
  });


  const getData = async () => {
    let postData = {
      page: page || 1,
      perPage: paginData.itemsCountPerPage,
      searchString: searchString || '',
    };

    common.loader(true);
    await authAxios({
      method: 'POST',
      url: `/services/pagination`,
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
        common.error(error);
      });
    common.loader(false);
  };

  useEffect(() => {
    getData();
  }, [page, searchString, paginData.sort]);

  const pageHasChanged = (pageNumber) => {
    if (pageNumber !== paginData.activePage) {
      setPaginData({
        ...paginData,
        activePage: pageNumber || 1,
        list: [],
      });
      navigate(`/services/list/${pageNumber}?searchString=${searchString || ''}`);
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
                  navigate(`/services/list/${1}?` + queryString);
                }} />
              </div>
              <div className="right-widget ml-auto col-4">
                <div className="float-right d-flex align-items-center">
                  <Link to={`/services/add`} className="btn-custom btn-theme">Add</Link>
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>S. No.</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Description</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginData?.list?.length > 0 && paginData?.list?.map((data, key) => (
                      <React.Fragment key={key}>
                        <tr>
                          <td>
                            {(Number(page) == 1 ? 0 : (Number(page) - 1) * paginData.itemsCountPerPage) + key + 1}
                          </td>
                          <td>{data?.name}</td>
                          <td>{data?.price}</td>
                          <td><ViewMore data={data?.description} /></td>
                          <td>
                          <ReactConfirm
                            type="switch"
                            value={data?.status}
                            route={`/services/status/${data?._id}`}
                            action={() => getData()}
                            message='Are you sure you want to change the status?'
                            method="POST"
                            payload={{ status: !data?.status }}
                          />
                          </td>
                          <td className='text-right'>
                            <Link to={`/services/edit/${data?._id}`} className='btn btn-theme'>Edit</Link>
                            {/* <ReactConfirm type='delete' route={`/admin/category/delete/${data?._id}`} action={() => getData()} message='Are you sure you want to delete this category?' /> */}
                          </td>

                        </tr>
                      </React.Fragment>
                    ))}
                    {paginData?.list?.length == 0 && (
                      <tr>
                        <td colSpan={5} className='text-center'>Unable to load lab categories. Please try again later.</td>
                      </tr>
                      )}
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