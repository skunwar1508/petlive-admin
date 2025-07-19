import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import { useFormik } from 'formik';
import { ErrorMessage } from '../formik/errorMessage';
import ReactInputMask from 'react-input-mask';
import common from '../../services/common';
import UnauthAxios from '../../services/unauthAxios';
import { toast } from 'react-toastify';

const SignIn = () => {
    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
        primaryMobileNo: "",
            primaryEmail: "",
        },
        validationSchema: Yup.object({
            primaryMobileNo: Yup.string().min(10, 'Please enter a valid mobile number').max(10, 'Please enter a valid mobile number').required("Please enter mobile number"),
            primaryEmail: Yup.string().email("Please enter a valid email address"),
        }),

        onSubmit: values => {
            localStorage.setItem("primaryMobileNo", values.primaryMobileNo);
            localStorage.setItem("primaryEmail", values.primaryEmail);
            loginAndSignup(values)
        },
        
    });
 
    async function loginAndSignup(values) {
        common.loader(true);
        await UnauthAxios({
            method: "POST",
            url: `/c/login`,
            data: values,
        }).then((res) => {
            toast.success(res?.data?.message)
            navigate('/verifyOTP')
            if (process.env?.REACT_APP_SERVER?.trim() != "production") {
                localStorage.setItem('otp', res?.data?.otp)
            }
        }).catch((error) => {
            if(error?.response?.data?.type?.toLowerCase() == "otp"){
                resendOtp(values)
            }else{
                common.error(error)
            }
        });
        common.loader(false);
    }
    
    
    async function resendOtp(values) {
        common.loader(true);
        await UnauthAxios({
            method: "POST",
            url: `/c/resendOtp`,
            data: values,
        }).then((res) => {
            if (process.env?.REACT_APP_SERVER?.trim() != "production") {
                localStorage.setItem('otp', res?.data?.otp)
            }
            toast.success(res?.data?.message)
            navigate('/verifyOTP')

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
    }, [])
    return (
        <>
            <div className="logincontentwrp bgimg">
                <div className="container">
                    <div className="logincontentCON homegetotp">
                        <div className="row">
                            <div className="col-12">
                                <div className="loginjioncon homegetotp">
                                    <div className="loginsigninuphead">
                                        <div className="loginsigninuptext"><h1>Sign Up / Sign In</h1></div>
                                        <div className='loginsignupinform'>
                                            <form onSubmit={formik.handleSubmit}>
                                                <div className="signloginformcon">
                                                    <div className="loginsinphone mb-3">
                                                        <label className="form-label mb-2">Mobile Number</label>
                                                        <ReactInputMask mask="9999999999" maskChar={null}  {...formik.getFieldProps("primaryMobileNo")} type="text"  className="form-control" placeholder="Enter Mobile Number"  />
                                                        <ErrorMessage formik={formik} name="primaryMobileNo" />

                                                    </div>
                                                    <div className="loginsinphone mb-3">
                                                        <label className="form-label mb-2">Email</label>
                                                        <input {...formik.getFieldProps("primaryEmail")} type="text" className="form-control" placeholder="Enter Email" />
                                                        <ErrorMessage formik={formik} name="primaryEmail" />
                                                    </div>
                                                </div>
                                                <div className="loginsignbtnm sign"><button type='submit' className='theme-btn-1'>Get OTP</button></div>
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

export default SignIn;