import React, { useEffect, useState } from 'react'
import * as Yup from "yup"
import { useFormik } from 'formik';
import { ErrorMessage } from '../formik/errorMessage';
import ReactInputMask from 'react-input-mask';
import common from '../../services/common';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UnauthAxios from '../../services/unauthAxios';
import Pincode from './pincode';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/theme';
import { useContext } from 'react';
import PrimaryCategory from './primaryCategory';

export default function SignUp() {
    const { setAuth } = useContext(UserContext)
    let navigate = useNavigate();
    const location = useLocation();
    const [currntDesign, setCurrent] = useState("")
    const [resDataDesign, setResDataDesign] = useState([])
    const [resDataNOB, setResDataNOB] = useState([])
    const formik = useFormik({
        initialValues: {
            primaryMobileNo: "",
            primaryEmail: "",
            contactName: "",
            designation: "",
            natureOfBusiness: "",
            website: "",
            city: "",
            state: "",
            pinCode: "",
            companyName: "",
            primaryCategory: [],
            designationOther: "",
            agreedToTc: "",
        },
        validationSchema: Yup.object({
            contactName: Yup.string().required("Please enter contact name"),
            designation: Yup.string().required("Please select designation"),
            natureOfBusiness: Yup.string().required("Please select nature of business"),
            companyName: Yup.string().required("Please enter company name"),
            website: Yup.string().matches(
                /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                'Please enter valid url'
            ),
            designationOther: Yup.string().test("match", "Please enter designation", (value, target) => {
                if (target.parent.designation === "Other" && !value) {
                    return false
                } else {
                    return true
                }
            }),
            primaryCategory: Yup.array()
                .of(
                    Yup.string().required("Please select primary category")
                ).min(1,"Please select primary category").required("Please enter primary category"),
            city: Yup.string().required("Please select city"),
            state: Yup.string().required("Please select state"),
            pinCode: Yup.string().required("Please enter Pincode"),
            agreedToTc: Yup.boolean().test("match", "Please mark the checkbox to indicate that you have read and agree to the T&C and Privacy Policy", (value) => {
                if (value === true) {
                    return true
                } else {
                    return false
                }
            }).required("Please mark the checkbox to indicate that you have read and agree to the T&C and Privacy Policy"),
        }),

        onSubmit: values => {
            if (values.designation === "Other") {
                values.designation = values.designationOther
            }
            delete values.designationOther
            loginAndSignup(values)
        },
    });

    async function loginAndSignup(values) {
        common.loader(true);
        await UnauthAxios({
            method: "POST",
            url: `/c/signup`,
            data: values,
        }).then((res) => {
            toast.success(res?.data?.message)
            localStorage.setItem('token', location.state?.token)
            setAuth(true)
            navigate('/profile')
        }).catch((error) => {
            common.error(error)
        });
        common.loader(false);
    }
    function loadDesignation() {
        UnauthAxios({
            method: "GET",
            url: `/c/dropdowns/designation`,
        }).then((res) => {
            setResDataDesign(res?.data?.data)
        }).catch((error) => {
            common.error(error)
        });
    }
    function loadNatureOfBusiness() {
        UnauthAxios({
            method: "GET",
            url: `/c/dropdowns/natureOfBusiness`,
        }).then((res) => {
            setResDataNOB(res?.data?.data)
        }).catch((error) => {
            common.error(error)
        });
    }

    useEffect(() => {
        let locationState = location.state
        formik.setFieldValue("primaryMobileNo", locationState?.primaryMobileNo || '');
        formik.setFieldValue("primaryEmail", locationState?.primaryEmail || '');
        formik.setFieldValue("otp", locationState?.otp || '');
        loadDesignation()
        loadNatureOfBusiness()

        if (!locationState?.primaryMobileNo || !locationState?.primaryEmail) {
            navigate('/sign-in')
        }
    }, [])

    // const handleDasignation = (data)=>{
    //     if(data != 'Other'){
    //         formik.setFieldValue('designation', data);
    //     }else{
    //         formik.setFieldValue('designation', '');
    //     }
    //     setCurrent(data)
    // }

    // console.log(formik.values)
    // console.log(formik.errors)
    return (
        <>
            <div className="logincontentwrp bgimg">
                <div className="container">
                    <div className="logincontentCON signup">
                        <div className="signUpWRP">
                            <div className="signUpheadtext"><h1>Sign Up With Us</h1></div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="container">
                                    <div className="row justify-content-between">
                                        <div className="col-lg-5 col-md-6 col-12">
                                            <div className="loginsinphone sign">
                                                <div className='signupinphead mb-2'>Contact Name </div>
                                                <input {...formik.getFieldProps("contactName")} type="text" className="form-control" placeholder="Enter Contact Name " onChange={(e) => formik.setFieldValue("contactName", common.inpAlphabet(e.target.value))} />
                                                <ErrorMessage formik={formik} name="contactName" />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-6 col-12">
                                            <div className="loginsinphone sign">
                                                <div className='signupinphead mb-2'>Company Name</div>
                                                <input {...formik.getFieldProps("companyName")} type="text" className="form-control" placeholder="Enter Company Name" onChange={(e) => formik.setFieldValue("companyName", common.alphaNumber(e.target.value))} />
                                                <ErrorMessage formik={formik} name="companyName" />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-6 col-12">
                                            <div className="loginsinphone sign">
                                                <div className='signupinphead mb-2'>Designation</div>
                                                <select {...formik.getFieldProps("designation")} className="form-select">
                                                    <option value="">Select Designation</option>
                                                    {resDataDesign?.map((d, k) => (
                                                        <option value={d?.title} key={k}>{d?.title}</option>
                                                    ))}
                                                    <option value="Other">Other</option>
                                                </select>
                                                <ErrorMessage formik={formik} name="designation" />
                                            </div>
                                        </div>
                                        {formik.values.designation === "Other" && (
                                            <div className="col-lg-5 col-md-6 col-12">
                                                <div className="loginsinphone sign">
                                                    <div className='signupinphead mb-2'>Other</div>
                                                    <input {...formik.getFieldProps("designationOther")} type="text" className="form-control" placeholder="Enter Other" onChange={(e) => formik.setFieldValue("designationOther", common.alphaNumber(e.target.value))} />
                                                    <ErrorMessage formik={formik} name="designationOther" />
                                                </div>
                                            </div>
                                        )}

                                        <div className="col-lg-5 col-md-6 col-12">
                                            <div className="loginsinphone sign">
                                                <div className='signupinphead mb-2'>Nature of Business</div>
                                                <select {...formik.getFieldProps("natureOfBusiness")} className="form-select" >
                                                    <option value="">Select Nature of Business</option>
                                                    {resDataNOB?.map((d, k) => (
                                                        <option value={d?.title} key={k}>{d?.title}</option>
                                                    ))}
                                                </select>
                                                <ErrorMessage formik={formik} name="natureOfBusiness" />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-6 col-12">
                                            <div className="loginsinphone sign">
                                                <div className='signupinphead mb-2'>Primary Category</div>
                                                {/* <select  className="form-select">
                                                    <option value="">Select Primary Category</option>
                                                    {resDataPC?.map((d,k)=>(
                                                        <option value={d?.title} key={k}>{d?.title}</option>
                                                    ))}
                                                </select> */}
                                                <PrimaryCategory value={formik.values.primaryCategory} setValue={(arr) => formik.setFieldValue('primaryCategory', arr)} />
                                                <ErrorMessage formik={formik} name="primaryCategory" />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-6 col-12">
                                            <div className="loginsinphone sign">
                                                <div className='signupinphead mb-2'>Website (Optional)</div>
                                                <input {...formik.getFieldProps("website")} type="text" className="form-control" placeholder="Enter Website " />
                                                <ErrorMessage formik={formik} name="website" />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-6 col-12">
                                            <div className="loginsinphone sign">
                                                <div className='signupinphead mb-2'>Pin Code</div>
                                                <Pincode action={(e) => {
                                                    // console.log(e)
                                                    formik.setFieldValue('pinCode', e?.pincode || '')
                                                    formik.setFieldValue('city', e?.city || '')
                                                    formik.setFieldValue('state', e?.state || '')
                                                }} />
                                                <ErrorMessage formik={formik} name="pinCode" />
                                                {/* <ReactInputMask mask="999999" maskChar={null} {...formik.getFieldProps("pinCode")} type="text" className="form-control" placeholder="Enter Pin Code" />
                                                <ErrorMessage formik={formik} name="pinCode" /> */}
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-6 col-12">
                                            <div className="loginsinphone sign">
                                                <div className='signupinphead mb-2'>City</div>
                                                <input value={formik.values.city} type="text" disabled className="form-control" placeholder="Select City" />
                                                {/* <select {...formik.getFieldProps("city")} className="form-select" aria-label="Default select example">
                                                    <option value="">Select City</option>
                                                    <option value="1">Jaipur</option>
                                                </select> */}
                                                <ErrorMessage formik={formik} name="city" />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-6 col-12">
                                            <div className="loginsinphone sign">
                                                <div className='signupinphead mb-2'>State</div>
                                                <input value={formik.values.state} type="text" disabled className="form-control" placeholder="Select State " />
                                                {/* <select {...formik.getFieldProps("state")} className="form-select">
                                                    <option selected>Select State</option>
                                                    <option value="1">Rajasthan</option>
                                                </select> */}
                                                <ErrorMessage formik={formik} name="state" />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="signinpcheck">
                                                <div className="form-check">
                                                    <input {...formik.getFieldProps("agreedToTc")} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        I Agree to All <Link to="/terms-condition"  target="_blank" className='termssign'>Terms & Condition</Link>and<Link to="/privacy-policy"  target="_blank" className='termssign'>  Privacy Policy</Link>
                                                    </label>
                                                </div>
                                                <ErrorMessage formik={formik} name="agreedToTc" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="loginsignbtn"><button type='submit' className='theme-btn-1'>Submit</button></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
