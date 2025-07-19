import React, { useEffect, useState } from 'react'
import * as Yup from "yup"
import { useFormik } from 'formik';
import { ErrorMessage } from '../formik/errorMessage';
import { Link, useNavigate } from 'react-router-dom';
import ReactInputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import common from '../../services/common';
import UnauthAxios from '../../services/unauthAxios';
import { useContext } from 'react';
import { UserContext } from '../../context/theme';

export default function VerifyOTP() {
    const { setAuth } = useContext(UserContext)
    let navigate = useNavigate();
    const [otp, setOtp] = useState('')
    const [OTPVerify, setOTPVerify] = useState("")

    const formik = useFormik({
        initialValues: {
            primaryMobileNo: "",
            primaryEmail: "",
            otp: "",
        },
        validationSchema: Yup.object({
            primaryMobileNo: Yup.string().min(10, 'Please enter a valid mobile number').max(10, 'Please enter a valid mobile number').required("Please enter mobile number"),
            primaryEmail: Yup.string().required("Please enter a email address"),
            otp: Yup.string().min(4, 'Please enter valid OTP.').max(4, 'Please enter valid OTP.').required("Please enter OTP, which has been sent to your given email address / mobile number"),
        }),
        onSubmit: values => {
            loginAndSignup(values)
        },
    });
    async function loginAndSignup(values) {
        common.loader(true);
        await UnauthAxios({
            method: "POST",
            url: `/c/otpVerify`,
            data: values,
        }).then((res) => {
            localStorage.clear()
            toast.success(res?.data?.message)
            let token = res?.data?.token
            if (res?.data?.isSignUpCompleted == true) {
                localStorage.setItem("token", token)
                setAuth(true)
                navigate('/dashboard')
            } else {
                values.token = token
                navigate('/signup', { state: values })
            }
        }).catch((error) => {
            common.error(error)
        });
        common.loader(false);
    }

    useEffect(() => {
        let number = localStorage.getItem("primaryMobileNo")
        let email = localStorage.getItem("primaryEmail")
        formik.setFieldValue("primaryMobileNo", number || '');
        formik.setFieldValue("primaryEmail", email || '');
        if (process.env?.REACT_APP_SERVER?.trim() != "production") {
            let getOtp = localStorage.getItem('otp')
            setOTPVerify(getOtp)
        } else {
            setOTPVerify('')
        }
        if (!number || !email) {
            navigate('/sign-in')
        }
    }, [])

    const handleOtp = (e) => {
        const re = /^[ 0-9]+$/;
        if (e.target.value === "" || re.test(e.target.value)) {
            setOtp(e.target.value)
        }
        formik.setFieldValue("otp", otp)

    }
    async function resendOtp() {
        let email = localStorage.getItem("primaryEmail");
        let mobile = localStorage.getItem("primaryMobileNo");
        let postData = {
            primaryEmail: email,
            primaryMobileNo: mobile
        }
        common.loader(true);
        await UnauthAxios({
            method: "POST",
            url: `/c/resendOtp`,
            data: postData,
        }).then((res) => {
            if (process.env?.REACT_APP_SERVER?.trim() != "production") {
                localStorage.setItem('otp', res?.data?.otp)
                setOTPVerify(res?.data?.otp)
            } else {
                setOTPVerify('')
            }

            toast.success(res?.data?.message)
            navigate('/verifyOTP')

        }).catch((error) => {
            common.error(error)
        });
        common.loader(false);
    }

    return (
        <>
            <div className="logincontentwrp bgimg">
                <div className="container">
                    {/* <div className="logincontentimgcon"><img className='img-fluid' src="assets/images/homeimage.svg" alt="image" /></div> */}
                    <div className="logincontentCON homegetotp">
                        <div className="row">
                            {/* <div className="col-6">
                                <div className="loginjionwrp">
                                    <div className="loginjionhead"><h1>What to Join?</h1></div>
                                    <div className="loginjionheadSMwrp">
                                        <div className="loginjionheadSM"><h3>1. A one-of-a-kind unique platform:- </h3></div>
                                        <div className="loginjionpara"><p>  Saledek is a private digital cataloguing B2B platform, using which you can create a digital catalogue store 	that helps your customers choosing the right product for bulk sourcing. From this created store you can 	send multiple connection requests to your genuine buyers & allow them to access your digital store 	privately 24/7, using which they can access filtered, latest, updated or accurate product information & 	other details in real-time. However, the catalogue store does not have the ordering functionality</p></div>
                                    </div>
                                    <div className="loginjionheadSMwrp">
                                        <div className="loginjionheadSM"><h3>2. Support independent SMEs:- </h3></div>
                                        <div className="loginjionpara"><p>  Saledek is a logue store 	From this created store you can 	send multiple connection requests to your genuine buyers & allow them to access your digital store 	privately 24/7, using which they can access filtered, latest, updated or accurate product information & 	other details in real-time. However, the catalogue store does not have the ordering functionality</p></div>
                                    </div>
                                    <div className="loginjionheadSMwrp">
                                        <div className="loginjionheadSM"><h3>3. Secure user login:- </h3></div>
                                        <div className="loginjionpara"><p>  Saledek is a private 	 bulk sourcing. From this created store you can 	access filtered, latest, updated or accurate product information & 	other details in real-time. However, the catalogue store does not have the ordering functionality</p></div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="col-12">
                                <div className="loginjioncon homegetotp">
                                    <div className="loginsigninuphead">
                                        <div className="loginsigninuptext"><h1>Sign Up / Sign In {OTPVerify}</h1></div>
                                        <div className='loginsignupinform'>
                                            <form onSubmit={formik.handleSubmit}>
                                                <div className="signloginformcon">
                                                    <div className="loginsinphone mb-3">
                                                        <div className="loginverifyphcon">
                                                            <label className="form-label mb-2">Mobile Number</label>
                                                            <div className='mb-2' onClick={() => navigate('/sign-in')}>Change Mobile Number</div>
                                                        </div>
                                                        <ReactInputMask mask="9999999999" maskChar={null} value={formik.values.primaryMobileNo} disabled type="text" className="form-control" placeholder="Enter Mobile Number" />
                                                        <ErrorMessage formik={formik} name="primaryMobileNo" />
                                                    </div>
                                                    <div className="loginsinphone mb-3">
                                                        <div className="loginverifyphcon">
                                                            <label className="form-label mb-2">Email</label>
                                                            <div className='mb-2' onClick={() => navigate('/sign-in')}>Change Email</div>
                                                        </div>
                                                        <input value={formik.values.primaryEmail} disabled type="email" className="form-control" placeholder="Enter Email" />
                                                        <ErrorMessage formik={formik} name="primaryEmail" />
                                                    </div>
                                                    <div className="loginsinphone mb-3">
                                                        <div className="loginverifyphcon">
                                                            <label className="form-label mb-2">OTP</label>
                                                            <div className='mb-2' onClick={() => resendOtp()}>Resend</div>
                                                        </div>
                                                        <ReactInputMask mask="9999" maskChar={null}  {...formik.getFieldProps("otp")} type="text" className="form-control" placeholder="Enter OTP" />
                                                        <ErrorMessage formik={formik} name="otp" />
                                                    </div>
                                                </div>
                                                <div className="loginsignbtn sign"><button type='submit' className='theme-btn-1'>Verify OTP</button></div>
                                            </form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
