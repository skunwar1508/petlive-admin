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
  const { searchString, status } = common.getFilterAppointment();
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
    let statusKey = status ? status : 'all'
    common.loader(true);
    await authAxios({
      method: 'POST',
      url: `/patient/consultation/${statusKey}`,
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
  }, [page, searchString, paginData.sort, status]);

  const pageHasChanged = (pageNumber) => {
    if (pageNumber !== paginData.activePage) {
      setPaginData({
        ...paginData,
        activePage: pageNumber || 1,
        list: [],
      });

      const filters = common.getFilterAppointment()
      const queryString = new URLSearchParams(filters).toString();
      navigate(`/appointment/list/${pageNumber}?${queryString}`);
    }
  };




  return (
    <>
      <div className="row mb-4">
        <div className="col-sm-12">
          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-header d-flex align-items-center justify-content-between py-3 w-100 bg-transparent">
              <div className="left-widget col-4">
                <h5 className="mb-0">Appointment List</h5>
                {/* <SearchFormik name="getFilter" onChange={(values) => {
                  let search = common.getFilterAppointment();
                  search.page = 1;
                  search.searchString = values.searchString;
                  const queryString = new URLSearchParams(search).toString();
                  navigate(`/appointment/list/${1}?` + queryString);
                }} /> */}
              </div>
              <div className="right-widget ml-auto col-4">
                <div className="float-right gap-2 d-flex align-items-center">
                  <select
                    className="form-select form-select-sm"
                    value={status || 'pending'}
                    onChange={(e) => {
                      let search = common.getFilterAppointment();
                      search.page = 1;
                      search.status = e.target.value;
                      const queryString = new URLSearchParams(search).toString();
                      navigate(`/appointment/list/${1}?` + queryString);
                    }}
                  >
                    <option value="all">All</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="pending">Pending</option>
                    {/* <option value="approved">Approved</option> */}
                    <option value="rejected">Rejected</option>
                    <option value="completed">Completed</option>
                  </select>
{/*     
                  <ReusableAsyncSelect
                    apiEndpoint="/appointment/paginate"
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
                  <button className="btn btn-sm btn-outline-primary" onClick={() => {
                    navigate(`/flag/list/${1}`);
                  }}>
                    Reset
                  </button> */}
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>S. No.</th>
                      <th>Patient</th>
                      <th>Doctor</th>
                      <th>Appointment Type</th>
                      <th>Duration</th>
                      <th>Date</th>
                      <th>Fees</th>
                      <th>status</th>
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
                            <td>{data?.userId?.fullName}</td>
                            <td>Dr. {data?.doctorId?.firstName} {data?.doctorId?.lastName}</td>
                            <td>
                              {data?.consultationType == 'inperson' ? 'In-Person' : 'Online'}
                            </td>
                            <td>{data?.duration} min</td>
                            <td>
                              <Moment format="MMM DD, YYYY">{data?.createdAt}</Moment> {data?.time}
                            </td>
                            <td>{data?.fees}</td>
                            <td>
                              {data?.status == 'pending' ? (
                                <span className="badge badge-warning">{common.capitalizeWord(status)}</span>
                              ) : data?.status == 'approved' ? (
                                <span className="badge badge-success">{common.capitalizeWord(status)}</span>
                              ) : data?.status == 'rejected' ? (
                                <span className="badge badge-danger">{common.capitalizeWord(status)}</span>
                              ) : data?.status == 'completed' ? (
                                <span className="badge badge-info">{common.capitalizeWord(status)}</span>
                              ) : (
                                <span className="badge badge-secondary">{common.capitalizeWord(status)}</span>
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