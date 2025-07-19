import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import common from '../../services/common';
import PageModule from '../../components/pagination/pagination';
import authAxios from '../../services/authAxios';
import SearchFormik from '../../components/common/searchFormik';
import { UserContext } from '../../context/theme';
import { toast } from 'react-toastify';
import ReactConfirm from '../../components/confirm/reactConfirm';

function List() {
  let navigate = useNavigate();
  const { checkPage } = useContext(UserContext);
  const paramSearch = new URLSearchParams(window.location.search);
  let searchString = paramSearch.get('searchString');
  let profileStatus = paramSearch.get('profileStatus');
  let currentProvider = paramSearch.get('currentProvider');
  let { page } = useParams();

  const [paginData, setPaginData] = useState({
    list: [],
    activePage: parseInt(page) || 1,
    itemsCountPerPage: common.perPageData(),
    totalItemsCount: 0,
  });

  const [expandedRows, setExpandedRows] = useState([]);
  const [providerList, setProviderList] = useState([]);

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

    if(profileStatus || currentProvider){
      postData.filters = {}
    }
    if (profileStatus) {
      postData.filters.profileStatus = profileStatus;
    }
    if (currentProvider) {
      // postData.filters.currentProvider = currentProvider;
    }
    common.loader(true);
    await authAxios({
      method: 'POST',
      url: `/patient/paginate`,
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
  }, [page, searchString, paginData.sort, currentProvider, profileStatus]);

  const pageHasChanged = (pageNumber) => {
    if (pageNumber !== paginData.activePage) {
      setPaginData({
        ...paginData,
        activePage: pageNumber || 1,
        list: [],
      });
      
      const filters = common.getPatientFilter()
      const queryString = new URLSearchParams(filters).toString();
      navigate(`/patients/list/${pageNumber}?${queryString}`);
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
                  let search = common.getPatientFilter();
                  search.page = 1;
                  search.searchString = values.searchString;
                  const queryString = new URLSearchParams(search).toString();
                  navigate(`/patients/list/${1}?` + queryString);
                }} />
              </div>
              <div className="right-widget ml-auto col-4">
                <div className="float-right d-flex align-items-center">
                  <select value={profileStatus} className="form-select form-select-sm" onChange={(e) => {
                    let search = common.getPatientFilter();
                    search.page = 1;
                    search.profileStatus = e.target.value;
                    const queryString = new URLSearchParams(search).toString();
                    navigate(`/patients/list/${1}?` + queryString);
                  }}>
                    <option value="">Profile Status</option>
                    <option value="true">Active</option>
                    <option value="false">In Active</option>
                  </select>
                  {/* <Link to={`/patients/add`} className="btn-custom btn-theme">Add</Link> */}
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>S. No.</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Pet Type</th>
                      <th>Profile Status</th>
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
                          <td>{data?.name}</td>
                          <td>{data?.email}</td>
                          <td>{data?.phone}</td>
                          <td>{data?.petType || 'N/A'}</td>
                          <td>
                            <ReactConfirm
                              type="switch"
                              value={data?.isActive}
                              route={`/patient/status/${data?._id}`}
                              action={() => getData()}
                              message='Are you sure you want to change the profile status?'
                              method="POST"
                              payload={{ isActive: !data?.isActive }}
                            />
                          </td>
                          <td className="text-right">
                            <Link to={`/patients/edit/${data?._id}`} className="btn btn-sm btn-theme">Edit</Link>
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