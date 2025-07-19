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
      url: `/treatment/paginate`,
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
      navigate(`/treatments/list/${pageNumber}?${queryString}`);
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
                  navigate(`/treatments/list/${1}?` + queryString);
                }} />
              </div>
              <div className="right-widget ml-auto col-4">
                {/* <div className="float-right d-flex align-items-center">
                  <select value={articleStatus} className="form-select form-select-sm" onChange={(e) => {
                    let search = common.getFilter();
                    search.page = 1;
                    search.articleStatus = e.target.value;
                    const queryString = new URLSearchParams(search).toString();
                    navigate(`/treatments/list/${1}?` + queryString);
                  }}>
                    <option value="">Article Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div> */}
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>S. No.</th>
                      <th>Treatment Id</th>
                      <th>Treatment Name</th>
                      <th>Provider</th>
                      <th>Assign Patient</th>
                      <th>Start Date</th>
                      <th>End Date</th>
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
                            <td>{data?.treatmentId}</td>
                            <td>{data?.name}</td>
                            <td>
                              {Array.isArray(data?.providerId)
                                ? data.providerId.map((doctor, index) => (
                                  <div key={index}>Dr. {doctor?.firstName || ''} {doctor?.lastName || ''}</div>
                                ))
                                : data?.providerId
                                  ? `Dr. ${data?.providerId?.firstName || ''} ${data?.providerId?.lastName || ''}`
                                  : "-"
                              }
                            </td>
                            <td>{data?.patientId?.fullName}</td>
                            <td>
                              <Moment format="MMM DD, YYYY">{data?.startDate}</Moment>
                            </td>
                            <td>
                              <Moment format="MMM DD, YYYY">{data?.endDate}</Moment>
                            </td>
                            <td className="text-right">
                              <button
                                className="btn btn-info"
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent row click from triggering
                                  toggleRow(data._id);
                                }}
                              >
                                {expandedRows.includes(data._id) ? 'Hide' : 'View'}
                              </button>
                            </td>
                          </tr>
                          {expandedRows.includes(data._id) && (
                            <tr>
                              <td colSpan="8">
                                <div className="expanded-row">
                                  <div className="row">
                                    <div className="col-md-12 mb-5">
                                      <h4 className="section-title">Treatment Details</h4>
                                      <div className='row'>
                                        <div className='col-md-12'>
                                          <ul className="details-list mt-3">
                                            <li>
                                              <strong>Name :</strong> {data?.name}
                                            </li>
                                            <li>
                                              <strong>Additional Notes :</strong> {data?.additionalNotes}
                                            </li>
                                            <li>
                                              <strong>Duration :</strong> {data?.duration}
                                            </li>
                                            <li>
                                              <strong>Created At:</strong> <Moment format="MMM DD, YYYY">{data?.createdAt}</Moment>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className='col-md-12 mb-5'>
                                          <h4 className="section-title">Meals</h4>
                                          {data?.meals?.map((meal, index) => (
                                            <table key={index} className="table table-hover mb-0">
                                              <thead className='bg-secondary text-white'>
                                                <tr>
                                                  <th>Meal</th>
                                                  <th className='text-right'>Time</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td>{meal?.name}</td>
                                                  <td className='text-right'>{meal?.time}</td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          ))}
                                        </div>
                                        <div className='col-md-12 mb-5'>
                                          <h4 className="section-title">Exercises</h4>
                                          {data?.exercises?.map((exercise, index) => (
                                            <table key={index} className="table table-hover mb-0">
                                              <thead className='bg-secondary text-white'>
                                                <tr>
                                                  <th>Exercise</th>
                                                  <th className='text-center'>Duration</th>
                                                  <th className='text-right'>Time</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td>{exercise?.name}</td>
                                                  <td className='text-center'>{exercise?.duration}</td>
                                                  <td className='text-right'>{exercise?.time}</td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          ))}
                                        </div>
                                        {/* medications */}
                                        <div className='col-md-12 mb-5'>
                                          <h4 className="section-title">Medications</h4>
                                          {data?.medications?.map((medication, index) => (
                                            <table key={index} className="table table-hover mb-0">
                                              <thead className='bg-secondary text-white'>
                                                <tr>
                                                  <th>Medication</th>
                                                  <th className='text-center'>Dosage</th>
                                                  <th className='text-right'>Time</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td>{medication?.name}</td>
                                                  <td className='text-center'>{medication?.dosage}</td>
                                                  <td className='text-right'>{medication?.time}</td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          ))}
                                        </div>
                                        {/* mentalHealthActivities */}
                                        <div className='col-md-12'>
                                          <h4 className="section-title">Activities</h4>
                                          {data?.mentalHealthActivities?.map((activity, index) => (
                                            <table key={index} className="table table-hover mb-0">
                                              <thead className='bg-secondary text-white'>
                                                <tr>
                                                  <th>Activity</th>
                                                  <th className='text-center'>Duration</th>
                                                  <th className='text-right'>Time</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td>{activity?.name}</td>
                                                  <td className='text-center'>{activity?.duration}</td>
                                                  <td className='text-right'>{activity?.time}</td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          ))}
                                        </div>

                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
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