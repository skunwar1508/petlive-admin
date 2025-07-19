import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/theme';
import * as Yup from "yup";
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import ROOT_URL from '../../services/api-url';
import { reactLocalStorage } from 'reactjs-localstorage';
import common from '../../services/common';
import UnauthAxios from '../../services/unauthAxios';


const LoginForm = () => {
    const context = useContext(UserContext)
    let navigate = useNavigate();
    const { setAuth } = useContext(UserContext)

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Please enter valid email')
            .required('Please enter email'),
        password: Yup.string().required("Please enter password"),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            login(values);
        },
    });

    const login = (userData) => {
        UnauthAxios({
            method: "POST",
            url: `/admin/auth/login`,
            data: userData
        }).then((res) => {
            toast.success(res?.data?.message)
            // console.log(res?.data);
            localStorage.setItem("token", res?.data?.data);
            // localStorage.setItem("admin", res?.data?.admin?._id);
            setAuth(true)
            navigate(`/dashboard`)
        }).catch((error) => {
            common.error(error);
        });

    };

    //   console.log(formik.errors);

    return (
        <>
            <ToastContainer />
            <div className="wrapLogin__form">
                <div className='centerWidgetLogo'>
                    <img src={`/assets/images/logo.png`} alt="Logo" />
                </div>
                <div className='Login__box_wrap loginWrp'>

                    <div className='wrap_log__form mt-4'>
                        <form className='login_form' onSubmit={formik.handleSubmit}>
                            <div className='field__item mb-2'>
                                <label>Email</label>
                                <div className='field__wrap'>
                                    <span className=' field_log_icon'></span>
                                    <input type="email" {...formik.getFieldProps("email")} placeholder='Enter Your Email' />
                                    <span className='field_log_icon'></span>
                                </div>

                                {formik.touched.email && formik.errors.email ? (
                                    <div className='field__validate'>
                                        <small className='form-text'>{formik.errors.email}</small>
                                    </div>
                                ) : null}
                            </div>
                            <div className='field__item mb-3 pt-1 forgetPass'>
                                <label>Password</label>
                                <div className='field__wrap '>
                                    <span className=' field_log_icon'></span>
                                    <input type="password"  {...formik.getFieldProps("password")} placeholder='Enter Password' />
                                    <span className='field_log_icon'></span>
                                </div>
                                <div className='forgetpass mt-3 float-right'>
                                    {/* <Link to='/forget-pass'>Forget Password?</Link> */}

                                </div>

                                {formik.touched.password && formik.errors.password ? (
                                    <div className='field__validate'>
                                        <small className='form-text'>{formik.errors.password}</small>
                                    </div>
                                ) : null}
                            </div>

                            <div className='foodiaButn text-center'>
                                <button type='submit' className='mt-3 btn-theme btn-custom'>Login</button>

                            </div>
                            {/* <div className='registerAcc mt-4 text-center'>
                        <span>Don’t have an account?  <Link to='/register'>Register</Link></span>  

                        </div> */}

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginForm
