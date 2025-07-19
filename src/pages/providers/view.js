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
            url: `/doctor/provider/detail/${id}`,
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
                                                    <strong>Clinic Name:</strong> {resData?.clinicName || 'N/A'}
                                                </li>
                                                <li>
                                                    <strong>Clinic Location:</strong> {resData?.clinicLocation || 'N/A'}
                                                </li>
                                                <li>
                                                    <strong>Reg Number:</strong> {resData?.regNumber || 'N/A'}
                                                </li>
                                                <li>
                                                    <strong>License Image:</strong> {resData?.licenseImage?.path ? <a href={resData.licenseImage.path} target="_blank" rel="noopener noreferrer"><u>View License Image</u></a> : 'N/A'}
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
                                                    <strong>About:</strong> {resData?.about || 'N/A'}
                                                </li>
                                                <li>
                                                    <strong>Primary Specialization:</strong> {resData?.primarySpecialization?.title || 'N/A'}
                                                </li>
                                                <li>
                                                    <strong>Secondary Specialization:</strong> {resData?.secondarySpecialization?.title || 'N/A'}
                                                </li>
                                                <li>
                                                    <strong>Sub Specialization:</strong> {resData?.subSpecialization || 'N/A'}
                                                </li>
                                                <li>
                                                    <strong>In Person Fees:</strong> {resData?.inPersonFees ? `₹${resData.inPersonFees}` : 'N/A'}
                                                </li>
                                                <li>
                                                    <strong>Online Fees:</strong> {resData?.onlineFees ? `₹${resData.onlineFees}` : 'N/A'}
                                                </li>
                                                <li>
                                                    <strong>Available Days:</strong> {resData?.availableDays?.map((d) => d.charAt(0).toUpperCase() + d.slice(1))?.join(', ') || 'N/A'}
                                                </li>
                                                <li>
                                                    <strong>Languages Spoken:</strong> {resData?.languagesSpoken?.map((d) => d.charAt(0).toUpperCase() + d.slice(1))?.join(', ') || 'N/A'}
                                                </li>
                                                <li>
                                                    <strong>Experience:</strong> {resData?.experience || 'N/A'}
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='col-md-2'>
                                            <div className="d-flex flex-column align-items-center">
                                                <ReactConfirm
                                                    type="switch"
                                                    value={resData?.isEnabled}
                                                    route={`/doctor/provider/status/${resData?._id}`}
                                                    action={() => getData()}
                                                    message='Are you sure you want to change the profile status?'
                                                    method="PUT"
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