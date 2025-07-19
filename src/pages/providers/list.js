import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import common from '../../services/common';
import PageModule from '../../components/pagination/pagination';
import authAxios from '../../services/authAxios';
import SearchFormik from '../../components/common/searchFormik';
import { UserContext } from '../../context/theme';
import { toast } from 'react-toastify';
import ReactConfirm from '../../components/confirm/reactConfirm';
import CommisionUpdatePop from '../../components/modal/commisionUpdatePop';

function List() {
  let navigate = useNavigate();
  const { checkPage } = useContext(UserContext);
  const paramSearch = new URLSearchParams(window.location.search);
  let profileStatus = paramSearch.get('profileStatus');
  let specialization = paramSearch.get('specialization');
  let verificationStatus = paramSearch.get('verificationStatus');
  const [showCommPop, setShowCommPop] = useState(false)
  const [parProviderDataForComm, setParProviderDataForComm] = useState({})


  let searchString = paramSearch.get('searchString');
  let { page } = useParams();

  const [paginData, setPaginData] = useState({
    list: [],
    activePage: parseInt(page) || 1,
    itemsCountPerPage: 10 || common.perPageData(),
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
    if (profileStatus || specialization || verificationStatus) {
      postData.filters = {}
    }
    if (profileStatus) {
      postData.filters.profileStatus = profileStatus;
    }
    if (specialization) {
      postData.filters.specialization = specialization;
    }
    if (verificationStatus) {
      postData.filters.verificationStatus = verificationStatus;
    }
    common.loader(true);
    await authAxios({
      method: 'POST',
      url: `/doctor/provider/paginate`,
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
  }, [page, searchString, paginData.sort, profileStatus, specialization, verificationStatus]);

  const pageHasChanged = (pageNumber) => {
    if (pageNumber !== paginData.activePage) {
      setPaginData({
        ...paginData,
        activePage: pageNumber || 1,
        list: [],
      });
      const filters = common.getProviderFilter()
      const queryString = new URLSearchParams(filters).toString();
      navigate(`/providers/list/${pageNumber}?${queryString}`);
    }
  };


  const [primary, setPrimary] = useState([]);
  const [secondary, setSecondary] = useState([]);
  const getSpecialization = () => {
    authAxios.get(`/admin/specialization/getall/primary`).then((res) => {
      setPrimary(res?.data?.data || []);
    }).catch((error) => {
      console.error(error);
      common.error(error);
    });
  }
  const getSecondarySpecialization = () => {
    authAxios.get(`/admin/specialization/getall/secondary`).then((res) => {
      setSecondary(res?.data?.data || []);
    }).catch((error) => {
      console.error(error);
      common.error(error);
    });
  }

  useEffect(() => {
    getSpecialization();
    getSecondarySpecialization();
  }, [])

  return (
    <>
      <div className="row mb-4">
        <div className="col-sm-12">
          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-header d-flex align-items-center justify-content-between py-3 w-100 bg-transparent">
              <div className="left-widget col-4">
                <SearchFormik name="getFilter" onChange={(values) => {
                  let search = common.getProviderFilter();
                  search.page = 1;
                  search.searchString = values.searchString;
                  const queryString = new URLSearchParams(search).toString();
                  navigate(`/providers/list/${1}?` + queryString);
                }} />
              </div>
              <div className="right-widget ml-auto col-4">
                <div className="float-right d-flex align-items-center">
                  <select value={profileStatus} className="form-select form-select-sm" onChange={(e) => {
                    let search = common.getProviderFilter();
                    search.page = 1;
                    search.profileStatus = e.target.value;
                    const queryString = new URLSearchParams(search).toString();
                    navigate(`/providers/list/${1}?` + queryString);
                  }}>
                    <option value="">Profile Status</option>
                    <option value="true">Active</option>
                    <option value="false">In Active</option>
                  </select>
                  <select value={verificationStatus} className="form-select form-select-sm" onChange={(e) => {
                    let search = common.getProviderFilter();
                    search.page = 1;
                    search.verificationStatus = e.target.value;

                    const queryString = new URLSearchParams(search).toString();
                    navigate(`/providers/list/${1}?` + queryString);
                  }}>
                    <option value="">Verification Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    {/* <option value="rejected">Rejected</option> */}
                  </select>
                  <select value={specialization} className="form-select form-select-sm" onChange={(e) => {
                    let search = common.getProviderFilter();
                    search.page = 1;
                    search.specialization = e.target.value;
                    const queryString = new URLSearchParams(search).toString();
                    navigate(`/providers/list/${1}?` + queryString);
                  }}>
                    <option value="">Specialization</option>
                    {primary?.map((item) => (
                      <option key={item?._id} value={item?._id}>{item?.title}</option>
                    ))}
                  </select>
                  {/* <Link to={`/providers/add`} className="btn-custom btn-theme">Add</Link> */}
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>S. No.</th>
                      <th>Provider ID</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Specialization</th>
                      <th>Profile Status</th>
                      <th>Verification Status</th>
                      <th className="text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginData?.list?.map((data, key) => (
                      <React.Fragment key={key}>
                        <tr>
                          <td>
                            {(Number(page) == 1 ? 0 : (Number(page) - 1) * paginData.itemsCountPerPage) + key + 1}
                          </td>
                          <td>{data?.doctorId}</td>
                          <td>Dr. {data?.firstName} {data?.lastName}</td>
                          <td>{data?.email}</td>
                          
                          <td>
                            {
                              data?.primarySpecialization?.title && data?.secondarySpecialization?.title
                                ? `${data.primarySpecialization.title}, ${data.secondarySpecialization.title}`
                                : data?.primarySpecialization?.title || data?.secondarySpecialization?.title || "-"
                            }
                          </td>


                          <td>
                            <ReactConfirm
                              type="switch"
                              value={data?.isEnabled}
                              route={`/doctor/provider/status/${data?._id}`}
                              action={() => getData()}
                              message='Are you sure you want to change the profile status?'
                              method="PUT"
                              payload={{ status: !data?.isEnabled }}
                            />
                          </td>
                          <td>
                            <ReactConfirm
                              type="dropdown"
                              value={data?.approveProfile}
                              route={`/doctor/provider/approve/${data?._id}`}
                              action={() => getData()}
                              message='Are you sure you want to change the profile status?'
                              method="PUT"
                              options={[{ label: 'Pending', value: 'pending' }, { label: 'Approved', value: 'approved' }, { label: 'Rejected', value: 'rejected' }]}

                            />
                          </td>
                          <td className="text-right">
                            
                            <button
                              className="btn btn-info"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent row click from triggering
                                setParProviderDataForComm(data);
                                setShowCommPop(true)
                              }}
                            >
                              Commission Update
                            </button>

                            <button
                              className="btn btn-info ml-1"
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
                                    <h4 className="section-title">Professional Details</h4>
                                    <div className='row'>
                                      <div className="col-md-2">
                                        <img src={data?.profileImage?.path || '/assets/images/default_user.jpg'} alt="Profile Photo" className="profile-photo" />
                                      </div>
                                      <div className='col-md-10'>
                                        <ul className="details-list mt-3">
                                          <li>
                                            <strong>Clinic Name:</strong> {data?.clinicName}
                                          </li>
                                          <li>
                                            <strong>Clinic Location:</strong> {data?.clinicLocation}
                                          </li>
                                          <li>
                                            <strong>Reg Number:</strong> {data?.regNumber}
                                          </li>
                                          <li>
                                            <strong>License Image:</strong> <a href={data?.licenseImage?.path} target="_blank"> <u> View License Image </u></a>
                                          </li>
                                          <li>
                                            <strong>Phone:</strong> {data?.phone}
                                          </li>
                                          <li>
                                            <strong>Gender:</strong> {common.capitalizeWord(data?.gender)}
                                          </li>
                                          <li>
                                            <strong>DOB:</strong> {new Date (data?.dob).toLocaleDateString('en-IN', { timeZone: 'IST' })}
                                          </li>
                                        </ul>
                                      </div>
                                      <div className='col-md-12'>
                                        <ul className="details-list">
                                          <li>
                                            <strong>About:</strong> {data?.about}
                                          </li>
                                        </ul>
                                      </div>
                                    </div>

                                  </div>

                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <h4 className="section-title">Specialization Details</h4>
                                    <ul className="details-list">
                                      <li>
                                        <strong>Primary Specialization:</strong> {data?.primarySpecialization?.title}
                                      </li>
                                      {data?.primarySpecialization == 'other' && (
                                        <li>
                                          <strong>Primary Specialization:</strong> {data?.primarySpecialization?.title}
                                        </li>
                                      )
                                      }
                                      <li>
                                        <strong>Sub Specialization:</strong> {data?.subSpecialization}
                                      </li>
                                      <li>
                                        <strong>Secondary Specialization:</strong> {data?.secondarySpecialization?.title}
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="col-md-6">
                                    <h4 className="section-title">Consultation Details</h4>
                                    <ul className="details-list">
                                      {/* <li>
                                        <strong>Consultation Type:</strong>
                                      </li> */}
                                      {/* {data?.consultationType?.inperson && ( */}
                                      {(  
                                        <li>
                                          <b>In Person</b>: {data?.inPersonFees ? `₹${data?.inPersonFees}` : "-"}
                                        </li>
                                      )}
                                      {/* {data?.consultationType?.online && ( */}
                                      {(
                                        <li>
                                          <b>Online</b>: {data?.onlineFees ? `₹${data?.onlineFees}` : "-"}
                                        </li>
                                      )}
                                    </ul>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <h4 className="section-title">Availability Details</h4>
                                    <ul className="details-list">
                                      <li>
                                        <strong>Available Days:</strong> {data?.availableDays?.map((d) => common.capitalizeWord(d))?.join(', ')}
                                      </li>
                                      <li>
                                        <strong>Languages Spoken:</strong> {data?.languagesSpoken?.map((d) => common.capitalizeWord(d))?.join(', ')}
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="col-md-6">
                                    <h4 className="section-title">Total Experience</h4>
                                    <ul className="details-list">
                                      <li>
                                        <strong>Experience:</strong> {data?.experience}
                                      </li>
                                      {/* <li>
                                        <strong>Terms:</strong> {data?.terms ? 'Accepted' : 'Not Accepted'}
                                      </li> */}
                                    </ul>
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

      <CommisionUpdatePop 
        show={showCommPop}
        onClose={() => {
            setShowCommPop(false)
        }}
        data={parProviderDataForComm}
        /> 

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