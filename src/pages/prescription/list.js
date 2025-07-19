import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import common from '../../services/common';
import PageModule from '../../components/pagination/pagination';
import authAxios from '../../services/authAxios';
import SearchFormik from '../../components/common/searchFormik';
import { UserContext } from '../../context/theme';
import { toast } from 'react-toastify';
import ReactConfirm from '../../components/confirm/reactConfirm';
import DateFormate from '../../components/dateFormate';

function List() {
  let navigate = useNavigate();
  const { checkPage } = useContext(UserContext);
  const paramSearch = new URLSearchParams(window.location.search);
  let searchString = paramSearch.get('searchString');
  let patientId = paramSearch.get('patientId');
  let providerId = paramSearch.get('providerId');
  let { page } = useParams();

  const [paginData, setPaginData] = useState({
    list: [],
    activePage: parseInt(page) || 1,
    itemsCountPerPage: common.perPageData(),
    totalItemsCount: 0,
  });

  const [expandedRows, setExpandedRows] = useState([]);
  const [providerList, setProviderList] = useState([]);
  const [patientsList, setPatientsList] = useState([]);

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

    if (patientId) {
      postData.patientId = patientId;
    }

    if (providerId) {
        postData.providerId = providerId;
    }
    common.loader(true);
    await authAxios({
      method: 'POST',
      url: `/prescription/paginate`,
      data: postData,
    })
      .then((res) => {
        setPaginData({
          ...paginData,
          activePage: page,
          list: res?.data?.data?.data || [],
          totalItemsCount: res?.data?.data?.totalCount,
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
  }, [page, searchString, paginData.sort, providerId, patientId]);


  async function GetPatientDropData(){
    common.loader(true);
    await authAxios({
      method: 'GET',
      url: `/patient/getall`
    }).then((res) => {

        let data = res?.data?.data ?? []
        let dropData = data.map((parData) => (

            
            {
            title: parData.fullName,
            value: parData?._id
            }
        ))

        setPatientsList(dropData)
          

      })
      .catch((error) => {
        console.log(error);

        common.error(error);
      });
    common.loader(false);
  }
  async function GetDoctorDropData(){
    common.loader(true);
    await authAxios({
      method: 'GET',
      url: `/doctor/provider/all`,
    })
      .then((res) => {
        
        let data = res?.data?.data ?? []
        let dropData = data.map((parData) => (
            {
            title: `${parData.firstName} ${parData?.lastName}`,
            value: parData?._id
            }
        ))

        setProviderList(dropData)

      })
      .catch((error) => {
        console.log(error);

        common.error(error);
      });
    common.loader(false);
  }

  // ---- Get Patient and Doctor Dropdown data
  useEffect(() => {
    GetPatientDropData()
    GetDoctorDropData()
  }, [])


  const pageHasChanged = (pageNumber) => {
    if (pageNumber !== paginData.activePage) {
      setPaginData({
        ...paginData,
        activePage: pageNumber || 1,
        list: [],
      });
      
      const filters = common.getProviderFilter()
      const queryString = new URLSearchParams(filters).toString();
      navigate(`/prescriptions/list/${pageNumber}?${queryString}`);
    }
  };



  return (
    <>
      <div className="row mb-4">
        <div className="col-sm-12">
          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-header d-flex align-items-center justify-content-between py-3 w-100 bg-transparent">
              <div className="left-widget col-4">
                <SearchFormik placeholder="Search Prescription Id" name="getFilter" onChange={(values) => {
                  let search = common.prescriptionFilter();
                  search.page = 1;
                  search.searchString = values.searchString;
                  const queryString = new URLSearchParams(search).toString();
                  navigate(`/prescriptions/list/${1}?` + queryString);
                }} />
              </div>
              <div className="right-widget ml-auto col-4">
                <div className="float-right d-flex align-items-center">
                  
                  <select value={patientId} className="form-select form-select-sm" onChange={(e) => {
                    let search = common.prescriptionFilter();
                    search.page = 1;
                    search.patientId = e.target.value;
                    const queryString = new URLSearchParams(search).toString();
                    navigate(`/prescriptions/list/${1}?` + queryString);
                  }}>
                    <option value="">--Select Patient--</option>
                    {patientsList?.map((item) => (
                      <option key={item?.value} value={item?.value}>{item?.title}</option>
                    ))}
                  </select>

                  <select value={providerId} className="form-select form-select-sm" onChange={(e) => {
                    let search = common.prescriptionFilter();
                    search.page = 1;
                    search.providerId = e.target.value;
                    const queryString = new URLSearchParams(search).toString();
                    navigate(`/prescriptions/list/${1}?` + queryString);
                  }}>
                    <option value="">--Select Provider--</option>
                    {providerList?.map((item) => (
                      <option key={item?.value} value={item?.value}>{item?.title}</option>
                    ))}
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
                      <th>Prescription Id</th>
                      <th>Patient</th>
                      <th>Doctor</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th className="text-right">More Info.</th>
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
                          <td>{data?.prescriptionId}</td>
                          <td>{data?.patientId?.fullName}</td>
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
                          <td><DateFormate children={data?.startDate} /></td>
                          <td><DateFormate children={data?.endDate} /></td>
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
                                  <div className="col-md-12">
                                    <h4 className="section-title">Prescription Details</h4>
                                    <div className='row'>
                                      <div className='col-md-12'>
                                        <ul className="details-list mt-3">
                                          <li>
                                            <strong>Special Instructions:</strong> {data?.specialInstructions.length > 0 ? data?.specialInstructions : "-"}
                                          </li>
                                          <li>
                                            <strong>Common Side Effects:</strong> {data?.commonSideEffect.length > 0 ? data?.commonSideEffect : "-"}
                                          </li>
                                          <li>
                                            <strong>Warnings :</strong> {data?.warning.length > 0 ? data?.warning : "-"}
                                          </li>
                                          <li>
                                            <strong>Additional Notes :</strong> {data?.notes.length > 0 ? data?.notes : "-"}
                                          </li>
                                        </ul>

                                        {/* ---- nested table */}
                                        <table className="table table-hover mb-0">
                                        <thead>
                                            <tr>
                                            <th>S. No.</th>
                                            <th>Medicine Name</th>
                                            <th>Dosage</th>
                                            <th>Number of Tablets</th>
                                            <th>Route</th>
                                            <th>Frequency</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                            data?.medicines?.map((data, key) => (
                                            <React.Fragment key={key}>
                                                <tr>
                                                <td>
                                                    {(Number(page) == 1 ? 0 : (Number(page) - 1) * paginData.itemsCountPerPage) + key + 1}
                                                </td>
                                                <td>{data?.medName}</td>
                                                <td>{data?.dosage?.join(", ")}</td>
                                                <td>{data?.noOfTablets}</td>
                                                <td>{data?.routeOfAdministration}</td>
                                                <td>{data?.frequency}</td>
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