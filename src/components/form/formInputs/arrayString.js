import React, { useRef } from "react";
import InputFile from "../../common/inputFile";
import { ErrorMessageARRAY } from "../../formik/errorMessage";

const ArrayString = (props) => {
    const { name, label, formik, inlineForm, resAdmin, multiple, mimeType, iconShow, required } = props;
    const inputRef = useRef(null);
    const addMore = (k) => {
        let array = formik?.values?.[name];
        array.push("");
        formik.setFieldValue(name, array);
    };
    const deleteObj = (k) => {
        let array = [...formik?.values?.[name]];
        array.splice(k, 1);
        formik.setFieldValue(name, array);
    };
    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="formGroup">
                        <div className="row">
                            <div className="col-lg-3">
                                <label>{label} {required != false ? <span className='mandatory'>*</span> : ''}</label>
                            </div>
                            <div className="col-lg-9">
                                {formik?.values?.[name]?.map((d, k) => (
                                    <div className="row mb-3" key={k}>
                                        <div className="col-lg-9">
                                            <InputFile onChange={(e) => formik.setFieldValue(`${name}[${k}]`, e)} imagePrivew={formik.values?.[name][k]} />
                                            {/* <input {...formik.getFieldProps(`${name}[${k}]`)} type="text" className="form-control" placeholder="Enter name" /> */}
                                            <ErrorMessageARRAY formik={formik} index={k} parent={name} />
                                        </div>
                                        <div className="col-lg-3">
                                            {k == 0 ? (
                                                <a onClick={() => addMore(k)} className="btn btn-primary">
                                                    Add More
                                                </a>
                                            ) : (
                                                <a onClick={() => deleteObj(k)} className="btn btn-danger">
                                                    Remove
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ArrayString;
