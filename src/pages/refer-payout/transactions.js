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
    let { page, doctorId } = useParams();

    const [paginData, setPaginData] = useState({
        list: [],
        activePage: parseInt(page) || 1,
        itemsCountPerPage: common.perPageData(),
        totalItemsCount: 0,
    });
    const [dashData, setDashData] = useState({});
    const getDashData = async () => {
        try {
            let postData = {
                period: 'monthly'
            }
            if (doctorId) {
                postData.doctorId = doctorId;
            }
            const response = await authAxios.post(`/earnings/admin/counts`, postData);
            const presc = response?.data?.data || {};
            setDashData(presc);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

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
            period: 'monthly'
        };

        if (doctorId) {
            postData.doctorId = doctorId;
        }

        common.loader(true);
        await authAxios({
            method: 'POST',
            url: `/earnings/settlement/transactions`,
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
        if (doctorId) {
            getData();
            getDashData();
        }
    }, [page, searchString, paginData.sort, doctorId]);

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

    const formatNumber = (num) => {
        return Number.isInteger(num) ? num : parseFloat(num?.toFixed(2));
    };

    return (
        <>
            <div className='bxcuntWrrapper'>
                <div className='boxcount'>
                    <h2>{formatNumber(dashData?.totalAmount) || 0}</h2>
                    <p>Total Amount</p>
                </div>
                <div className='boxcount'>
                    <h2>{formatNumber(dashData?.deduction) || 0}</h2>
                    <p>Deduction</p>
                </div>
                <div className='boxcount'>
                    <h2>{formatNumber(dashData?.earning) || 0}</h2>
                    <p>Earning</p>
                </div>
                <div className='boxcount'>
                    <h2>{formatNumber(dashData?.settledAmount) || 0}</h2>
                    <p>Settled Amount</p>
                </div>
                <div className='boxcount'>
                    <h2>{formatNumber(dashData?.unsettledAmount) || 0}</h2>
                    <p>Unsettled Amount</p>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-sm-12">
                    <div className="card border-0 shadow-sm rounded-3">
                        <div className="card-header d-flex align-items-center justify-content-between py-3 w-100 bg-transparent">
                            <div className="left-widget col-4">
                                Transactions
                            </div>
                            <div className="right-widget col-4">
                                <div className='d-flex justify-content-end'>
                                    {dashData?.unsettledAmount > 0 && (
                                        <ReactConfirm
                                            type="custom"
                                            name='Sattle'
                                            value={doctorId}
                                            route={`/earnings/settle`}
                                            action={() => {
                                                getData();
                                                getDashData();
                                            }}
                                            message={`Are you sure you want to settle amount of ${formatNumber(dashData?.unsettledAmount)}?`}
                                            method="POST"
                                            payload={{ doctorId: doctorId }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th>S. No.</th>
                                            <th>Date</th>
                                            <th>Amount </th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginData?.list?.map((order, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {(Number(page) == 1 ? 0 : (Number(page) - 1) * paginData.itemsCountPerPage) + index + 1}
                                                </td>
                                                <td><Moment format="DD-MM-yyyy">{order?.createdAt}</Moment></td>
                                                <td>{formatNumber(order?.amount) || '0'}</td>
                                                <td>
                                                    <span className={`badge badge-success`}>
                                                        Settled
                                                    </span>
                                                </td>
                                            </tr>
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
