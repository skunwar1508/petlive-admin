import React, { useEffect, useState } from 'react';
import authAxios from '../services/authAxios';
import { Link } from 'react-router-dom';
function Home(){
    const [dashData, setDashData] = React.useState({});
    const getDashData = async () => {
      try {
        const response = await authAxios.get(`/admin/dashboard`);
        const presc = response?.data?.data || {};
        setDashData(presc)
      } catch (error) {
        console.error('Error fetching chat list:', error);
      }
    };
  
  
  
    useEffect(() => {
      getDashData();
    }, []);


    return (
        <>
        {/* Page Header */}
            <div className="page-header mb-4 pb-2">
                <div className="container-fluid">
                    <div className="row px-4 align-items-end">
                        <div className="col-lg-8">
                            <div className="page-header-title d-flex flex-wrap align-items-center">
                                <i className="breadcrumbBig_icon icon-home shadow fs-4 p-2 rounded"></i>
                                <div className="d-inline-block mt-2 mt-md-0  ml-lg-3">
                                    <h5>Dashboard</h5>
                                    {/* <span>lorem ipsum dolor sit amet, consectetur adipisicing elit</span> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="page-header-breadcrumb">
                                <ul className=" breadcrumb breadcrumb-title bg-transparent p-0 d-flex justify-content-end">
                                    <li className="breadcrumb-item">
                                        <Link to="/"><i className="feather icon-home"></i></Link>
                                    </li>
                                    <li className="breadcrumb-item"><Link to="#!">Dashboard</Link> </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="mainContent px-3 mt-4 dashWrapper">
                <div className="container-fluid">
                    <div className="row mb-4 gy-3">
                        <div className="col-sm-6">
                            <div className="card border-0 shadow-sm rounded-3 mb-4">
                                <Link to="/providers/list/1?verificationStatus=approved&&profileStatus=true" className="card-body d-flex align-items-start justify-content-between">
                                    <div className="flex-shrink-1">
                                        <h5 className="card-title fs-3 fw-bold">{dashData?.activeProviders || 0}</h5>
                                        <h3 className="card-subtitle fs-6 fw-normal mt-2">Total Active Providers</h3>
                                    </div>
                                    <div className="crd_wrapIcon text-info flex-shrink-0"><span className="icon-user-check"></span></div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card border-0 shadow-sm rounded-3 mb-4">
                                <Link to="/patients/list/1?profileStatus=true" className="card-body d-flex align-items-start justify-content-between">
                                    <div className="flex-shrink-1">
                                        <h5 className="card-title fs-3 fw-bold">{dashData?.activePatients || 0}</h5>
                                        <h3 className="card-subtitle fs-6 fw-normal mt-2">Total Active Patients</h3>

                                    </div>
                                    <div className="crd_wrapIcon text-warning flex-shrink-0"><span className="icon-user"></span></div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card border-0 shadow-sm rounded-3 mb-4">
                                <div className="card-body d-flex align-items-start justify-content-between">
                                    <div className="flex-shrink-1">
                                        <h5 className="card-title fs-3 fw-bold">{dashData?.articlesPendingApproval || 0}</h5>
                                        <h3 className="card-subtitle fs-6 fw-normal mt-2">Articles Pending Approval</h3>
                                    </div>
                                    <div className="crd_wrapIcon text-danger flex-shrink-0"><span className="icon-load-balancer"></span></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card border-0 shadow-sm rounded-3 mb-4">
                                <div className="card-body d-flex align-items-start justify-content-between">
                                    <div className="flex-shrink-1">
                                        <h5 className="card-title fs-3 fw-bold">{dashData?.newForumPosts || 0}</h5>
                                        <h3 className="card-subtitle fs-6 fw-normal mt-2">New Forum Posts</h3>
                                    </div>
                                    <div className="crd_wrapIcon text-danger flex-shrink-0"><span className="icon-clipboard"></span></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card border-0 shadow-sm rounded-3 mb-4">
                                <div className="card-body d-flex align-items-start justify-content-between">
                                    <div className="flex-shrink-1">
                                        <h5 className="card-title fs-3 fw-bold">{dashData?.settlementEarnings || 0}</h5>
                                        <h3 className="card-subtitle fs-6 fw-normal mt-2">Settlement Earnings</h3>
                                    </div>
                                    <div className="crd_wrapIcon text-success flex-shrink-0"><span className="icon-price-tag"></span></div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>

    );
}

export default Home;