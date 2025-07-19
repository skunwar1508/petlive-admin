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
    if (profileStatus || verificationStatus) {
      postData.filters = {}
      if (profileStatus) {
        postData.filters.profileStatus = profileStatus;
      }

      if (verificationStatus) {
        postData.filters.verificationStatus = verificationStatus;
      }
    }

    common.loader(true);
    await authAxios({
      method: 'POST',
      url: `/doctor/pagination`,
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
      navigate(`/doctor/list/${pageNumber}?${queryString}`);
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
                  let search = common.getProviderFilter();
                  search.page = 1;
                  search.searchString = values.searchString;
                  const queryString = new URLSearchParams(search).toString();
                  navigate(`/doctor/list/${1}?` + queryString);
                }} />
              </div>
              <div className="right-widget ml-auto col-4">
                <div className="float-right d-flex align-items-center gap-1">
                  <select value={profileStatus} className="form-select form-select-sm" onChange={(e) => {
                    let search = common.getProviderFilter();
                    search.page = 1;
                    search.profileStatus = e.target.value;
                    const queryString = new URLSearchParams(search).toString();
                    navigate(`/doctor/list/${1}?` + queryString);
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
                    navigate(`/doctor/list/${1}?` + queryString);
                  }}>
                    <option value="">Verification Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    {/* <option value="Rejected">Rejected</option> */}
                  </select>
                  <Link to={`/doctor/add`} className="btn-custom btn-theme">Add</Link>
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>S. No.</th>
                      <th>Photo</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Registration No</th>
                      <th>Consultation Fee</th>
                      <th>Experience</th>
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
                          <td>
                            <div className='tablePhoto'>
                              <img style={{ width: '30px' }} src={data?.profileImage?.path || '/assets/images/default_user.jpg'} alt="Profile Photo" className="profile-photo" />
                            </div>
                          </td>
                          <td>{data?.name}</td>
                          <td>{data?.email}</td>
                          <td>{data?.registrationNo}</td>
                          <td>{data?.consultationFee}</td>
                          <td>{data?.experience}</td>
                          <td>
                            <ReactConfirm
                              type="switch"
                              value={data?.isActive}
                              route={`/doctor/profileStatus/${data?._id}`}
                              action={() => getData()}
                              message='Are you sure you want to change the profile status?'
                              method="PUT"
                              payload={{ isActive: !data?.isActive }}
                            />
                          </td>
                          <td>
                            <ReactConfirm
                              type="dropdown"
                              value={data?.approveProfile}
                              route={`/doctor/status/${data?._id}`}
                              action={() => getData()}
                              message='Are you sure you want to change the profile status?'
                              method="PUT"
                              options={[{ label: 'Pending', value: 'Pending' }, { label: 'Approved', value: 'Approved' }, { label: 'Rejected', value: 'Rejected' }]}

                            />
                          </td>
                          <td className="text-right">
                            <Link to={`/doctor/edit/${data?._id}`} className="btn btn-sm btn-primary mr-2">Edit</Link>
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