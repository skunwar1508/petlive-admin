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
import MultiSelectInput from "../form/formInputs/multiSelect";

export default function PriceFilter({ url }) {
  // const {orderId} = useParams()
  const history = useLocation();
  const [filter, setFilter] = useState(false);
  const navigate = useNavigate();
  // let url = orderId ? `/company/list/${type}/${orderId}` : `/company/list`

  const formik = useFormik({
    initialValues: {
      status: "",
      country: "",
      // language: "",
    },
    validationSchema: Yup.object({}),

    onSubmit: (values) => {
      let urlValues = common.getPriceFilter();
      urlValues.page = 1;
      urlValues.status = values.status || "";
      urlValues.country = values.country || "";
      // urlValues.language = values.language || "";
      const queryString = new URLSearchParams(urlValues).toString();
      setFilter(false);
      navigate(`${url}?` + queryString);
    },
  });
  useEffect(() => {
    let urlValues = common.getPriceFilter();
    formik.setFieldValue("status", urlValues?.status || "");
    formik.setFieldValue("country", urlValues?.country || "");
    // formik.setFieldValue("language", urlValues?.language || "");
  }, [history]);

  // const Language  = [
  //     {
  //         label: "English",
  //         value: "English",
  //     },
  //     {
  //         label: "German",
  //         value: "German",
  //     },
  //     {
  //         label: "French",
  //         value: "French",
  //     },
  //     {
  //         label: "Portuguese",
  //         value: "Portuguese",
  //     },
  //     {
  //         label: "Arabic",
  //         value: "Arabic",
  //     },
  //     {
  //         label: "Mandarin",
  //         value: "Mandarin",
  //     },
  // ];

  const documentType = [
    {
      label: "Presentation",
      value: "Presentation",
    },
    {
      label: "Catalogue",
      value: "Catalogue",
    },
    {
      label: "Brochure",
      value: "Brochure",
    },
    {
      label: "Test Report",
      value: "Test Report",
    },
    {
      label: "Photo",
      value: "Photo",
    },
    {
      label: "Video",
      value: "Video",
    },
  ];

  return (
    <>
      <div className="filterwrpprolist">
        <ul>
          <li className={filter ? "active" : ""}>
            <div onClick={() => setFilter(false)} className="filtebkbox"></div>
            {filter ? (
              <div className="prolistnav ml-3" onClick={() => setFilter(false)}>
                <img
                  className="img-fluid "
                  src="/assets/images/listmenu.svg"
                  alt="image"
                />
              </div>
            ) : (
              <div className="prolistnav ml-3" onClick={() => setFilter(true)}>
                <img
                  className="img-fluid "
                  src="/assets/images/filterchange.svg"
                  alt="image"
                />
              </div>
            )}
            <div className="filterprolist">
              <form onSubmit={formik.handleSubmit}>
                <div className="categorycmodelhead">Filter</div>
                <div className="loginsinphone catemodal">
                  <div className="filtercategory mb-3">
                    <select
                      {...formik.getFieldProps("status")}
                      className="form-select"
                    >
                      <option value="">Select Status</option>
                      <option value="all">All</option>
                      <option value="true">Enable</option>
                      <option value="false">Disable</option>
                    </select>
                    <ErrorMessage formik={formik} name="status" />
                  </div>
                  {/* <div className="filtercategory mb-3">
                                        <select {...formik.getFieldProps("language")} className="form-select">
                                            <option value="">Select Language</option>
                                            {Language?.map((d,k)=>(
                                                <option key={k} value={d?.value}>{d?.label}</option>
                                            ))}
                                        </select>
                                        <ErrorMessage formik={formik} name="language" />
                                    </div> */}
                  <div className="filtercategory mb-3">
                    <MultiSelectInput
                      type="multiselect"
                      name="country"
                      label=""
                      isMulti={false}
                      dependency="none"
                      labelName="title"
                      valueName="_id"
                      endpoint="data"
                      route="/country/getAll"
                      errorMessage="Please select country"
                      placeholder="Select country..."
                      value={formik.values?.country}
                      setValuesFormik={(e) =>
                        formik.setFieldValue("country", e)
                      }
                    />
                    {/* <select {...formik.getFieldProps("documentType")} className="form-select">
                                            <option value="">Select Document Type</option>
                                            {documentType?.map((d,k)=>(
                                                <option key={k} value={d?.value}>{d?.label}</option>
                                            ))}
                                        </select> */}
                    <ErrorMessage formik={formik} name="country" />
                  </div>
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
