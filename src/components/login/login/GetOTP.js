import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import { useFormik } from 'formik';
import { ErrorMessage } from '../formik/errorMessage';
import ReactInputMask from 'react-input-mask';
import common from '../../services/common';
import UnauthAxios from '../../services/unauthAxios';

const GetOTP = () => {
    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            primaryMobileNo: "",
            primaryEmail: "",
        },
        validationSchema: Yup.object({
            primaryMobileNo: Yup.string().min(10, 'Mobile number is not valid').max(10, 'Mobile number is not valid').required("Please enter mobile number"),
            primaryEmail: Yup.string().required("Please enter valid email"),
        }),

        onSubmit: values => {
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
            if (res.data.type === "signup") {
                localStorage.setItem('token', res.data.token)
                if (process.env?.REACT_APP_SERVER?.trim() != "production") {
                    localStorage.setItem('otp', res?.data?.otp)
                }
                localStorage.setItem("primaryMobileNo", values.primaryMobileNo);
                localStorage.setItem("primaryEmail", values.primaryEmail);
                navigate('/verifyOTP')
            } else {
                navigate('/')
            }

        }).catch((error) => {
            common.error(error)
        });
        common.loader(false);
    }


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
                                                        <input {...formik.getFieldProps("primaryEmail")} type="email" className="form-control" placeholder="Enter Email" />
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

export default GetOTP;
