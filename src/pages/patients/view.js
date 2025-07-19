import React from 'react'
import { useParams } from 'react-router-dom';
import authAxios from '../../services/authAxios';
import ReactConfirm from '../../components/confirm/reactConfirm';

const View = () => {
    const { id } = useParams();
    const [resData, setResData] = React.useState(null);
    const getData = async () => {
        authAxios({
            method: 'GET',
            url: `/patient/detail/${id}`,
        }).then((res) => {
            setResData(res?.data?.data || {});
        }).catch((err) => {
            console.error(err);
        })
    }
    React.useEffect(() => {
        getData();
    }, [id])
    return (
        <div className="row mb-4">
            <div className="col-sm-12">
                <div className="card border-0 shadow-sm rounded-3">
                    <div className="card-body p-0">
                        <div className="expanded-row">
                            <div className="row">
                                <div className="col-md-12">
                                    <h4 className="section-title">Professional Details</h4>
                                    <div className='row'>
                                        <div className="col-md-2">
                                            <img src={resData?.profileImage?.path || '/assets/images/default_user.jpg'} alt="Profile Photo" className="profile-photo" />
                                        </div>
                                        <div className='col-md-8'>
                                            <ul className="details-list mt-3">
                                                <li>
                                                    <strong>Profile Status:</strong> {resData?.isEnabled ? 'Active' : 'Inactive'}
                                                </li>
                                                <li>
                                                    <strong>Profile ID:</strong> {resData?.patientId || 'N/A'}
                                                </li>
                                                <li>
                                                    <strong>Name:</strong> {resData?.fullName || 'N/A'}
                                                </li>
                                                <li>
                                                    <strong>Email:</strong> {resData?.email || 'N/A'}
                                                </li>
                                                <li>
                                                    <strong>Phone:</strong> {resData?.phone || 'N/A'}
                                                </li>

                                                <li>
                                                    <strong>Gender:</strong> {resData?.gender || 'N/A'}
                                                </li>
                                                <li>
                                                    <strong>Date of Birth:</strong> {resData?.dob || 'N/A'}
                                                </li>
                                                <li>
                                                    <strong>Address:</strong> {resData?.address || 'N/A'}
                                                </li>
                                                <li>
                                                    <strong>Medical History:</strong> {resData?.medicalHistory || 'N/A'}
                                                </li>
                                                <li>
                                                    <strong>Aadhar:</strong> {resData?.aadhar}
                                                </li>
                                                <li>
                                                    <strong>Created At:</strong> {resData?.createdAt}
                                                </li>
                                                <li>
                                                    <strong>Updated At:</strong> {resData?.updatedAt}
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-md-2">

                                            <div className="d-flex flex-column align-items-center">
                                                <ReactConfirm
                                                    type="switch"
                                                    value={resData?.isEnabled}
                                                    route={`/patient/status/${resData?._id}`}
                                                    action={() => getData()}
                                                    message='Are you sure you want to change the profile status?'
                                                    method="POST"
                                                    payload={{ status: !resData?.isEnabled }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default View