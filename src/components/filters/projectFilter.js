import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { subDays, addYears } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ErrorMessage } from "../formik/errorMessage";
import City from "../login/city";
import common from "../../services/common";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import authAxios from "../../services/authAxios";
import moment from "moment";


export default function OrderFilter({ url, isDateRange }) {
    // const {orderId} = useParams()
    const history = useLocation();
    const [filter, setFilter] = useState(false);
    const navigate = useNavigate();
    // let url = orderId ? `/company/list/${type}/${orderId}` : `/company/list`

    const formik = useFormik({
        initialValues: isDateRange ? {
            status: "",
            startDate: "",
            endDate: "",
        } : {
            status: "",
        },
        validationSchema: Yup.object({
            startDate: Yup.string().test("check", "Please select start date", (value, o) => {
                if (o.parent.endDate && !value) {
                    return false;
                } else {
                    return true;
                }
            }),
            endDate: Yup.string().test("check", "Please select end date", (value, o) => {
                if (o.parent.startDate && !value) {
                    return false;
                } else {
                    return true;
                }
            }),
        }),

        onSubmit: (values) => {
            let urlValues = common.getOrderFilter();
            urlValues.page = 1;
            urlValues.status = values.status || "";
            if (isDateRange) {
                urlValues.startDate = values?.startDate ? moment(values.startDate).format("YYYY-MM-DD") : "";
                urlValues.endDate = values?.endDate ? moment(values.endDate).format("YYYY-MM-DD") : "";
            } else {
                delete urlValues.startDate; 
                delete urlValues.endDate; 
            }
            const queryString = new URLSearchParams(urlValues).toString();
            setFilter(false);
            navigate(`${url}?` + queryString);
        },
    });
    useEffect(() => {
        let urlValues = common.getOrderFilter();
        formik.setFieldValue("status", urlValues?.status || "");
        if (isDateRange) {
            formik.setFieldValue("startDate", urlValues?.startDate || "");
            formik.setFieldValue("endDate", urlValues?.endDate || "");
        } else {
            delete urlValues?.startDate; 
            delete urlValues?.endDate; 
        }
    }, [history]);

    return (
        <>
            <div className="filterwrpprolist">
                <ul>
                    <li className={filter ? "active" : ""}>
                        <div onClick={() => setFilter(false)} className="filtebkbox"></div>
                        {filter ? (
                            <div className="prolistnav ml-3" onClick={() => setFilter(false)}>
                                <img className="img-fluid " src="/assets/images/listmenu.svg" alt="image" />
                            </div>
                        ) : (
                            <div className="prolistnav ml-3" onClick={() => setFilter(true)}>
                                <img className="img-fluid " src="/assets/images/filterchange.svg" alt="image" />
                            </div>
                        )}
                        <div className="filterprolist">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="categorycmodelhead">Filter</div>
                                <div className="loginsinphone catemodal">
                                    <div className="filtercategory mb-3">
                                        <select {...formik.getFieldProps("status")} className="form-select">
                                            <option value="">Select Status</option>
                                            <option value="all">All</option>
                                            <option value="true">Enable</option>
                                            <option value="false">Disable</option>
                                        </select>
                                        <ErrorMessage formik={formik} name="status" />
                                    </div>
                                    {isDateRange && <div className="field__item mb-3 pt-1">
                                        <div className="pendingdate">
                                            <div className="filtercategory mb-3">
                                                <DatePicker
                                                    selected={formik.values.startDate && new Date(formik.values.startDate)}
                                                    onChange={(date) => formik.setFieldValue("startDate", new Date(date || new Date()))}
                                                    // selectsStart
                                                    // startDate={formik.values.startDate && new Date(formik.values.startDate)}
                                                    // endDate={formik.values.endDate && new Date(formik.values.endDate)}
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="Start Date"
                                                    // maxDate={addYears(new Date(), 100)}
                                                    minDate={common.rangMinDate()}
                                                    maxDate={common.rangMaxDate(formik.values.endDate)}
                                                    showYearDropdown={true}
                                                    showMonthDropdown={true}
                                                    fixedHeight
                                                    yearDropdownItemNumber={150}
                                                    // {...formik.getFieldProps("fromDate")}
                                                />

                                                <img className="image-fluid" src="../assets/images/dateicon.svg" alt="" />
                                                <ErrorMessage formik={formik} name="startDate" />
                                            </div>
                                        </div>
                                        <div className="pendingdate">
                                            <DatePicker
                                                selected={formik.values.endDate && new Date(formik.values.endDate)}
                                                onChange={(date) => formik.setFieldValue("endDate", new Date(date || new Date()))}
                                                // selectsEnd
                                                // startDate={formik.values.startDate && new Date(formik.values.startDate)}
                                                // endDate={formik.values.endDate && new Date(formik.values.endDate)}
                                                // minDate={formik.values.startDate && new Date(formik.values.startDate)}
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="End Date"
                                                // minDate={subDays(new Date(), 10)}
                                                // maxDate={addYears(new Date(), 100)}
                                                minDate={common.rangMinDate(formik.values.startDate)}
                                                maxDate={addYears(new Date(), 0)}
                                                showYearDropdown={true}
                                                showMonthDropdown={true}
                                                fixedHeight
                                                yearDropdownItemNumber={150}
                                                // {...formik.getFieldProps("endDate")}
                                            />
                                            <img className="image-fluid" src="../assets/images/dateicon.svg" alt="" />
                                            <ErrorMessage formik={formik} name="endDate" />
                                        </div>
                                    </div>}
                                </div>
                                <div className="filterprolistbtncon">
                                    <div className="loginsignbtn filterreset">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                navigate(url);
                                                formik.resetForm();
                                                setFilter(false);
                                            }}
                                            className="theme-btn-1"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                    <div className="loginsignbtn filterreset">
                                        <button type="submit" className="theme-btn-1">
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
}
