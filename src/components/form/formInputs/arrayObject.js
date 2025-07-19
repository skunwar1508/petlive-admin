import React, { useRef } from "react";
import InputFile from "../../common/inputFile";
import { ErrorMessageARRAY } from "../../formik/errorMessage";
import TextInput from "./textInput";

const ArrayObject = (props) => {
    const { name, label, formik, inlineForm, resAdmin, multiple, mimeType, iconShow, isArray, arrayOptions, minArray, addDisallow } = props;
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
                                <label>{label}</label>
                            </div>
                            <div className="col-lg-9">
                                {formik?.values?.[name]?.map((d, k) => (
                                    <div className="row mb-3" key={k}>
                                        <div className="col-lg-9">
                                            <div className="formGroup">
                                                <div className="row">
                                                    {arrayOptions?.map((d, kk) => (
                                                        <div className="col-lg-6" key={kk}>
                                                            <div className="mb-3">
                                                            <label>{d?.label} {d?.required != false ? <span className='mandatory'>*</span> : ''}</label>
                                                            {d?.type == 'text' && <div>
                                                            <input type="text" className="form-control" readOnly={d?.readOnly} value={formik.values?.[name][k]?.[d?.name]} onChange={(e) => formik.setFieldValue(`${name}[${k}].[${d?.name}]`, e?.target?.value)} />
                                                            </div>}
                                                            {d?.type == 'file' && <InputFile iconShow={d?.iconShow} label={d?.label} onChange={(e) => formik.setFieldValue(`${name}[${k}].[${d?.name}]`, e)} imagePrivew={formik.values?.[name][k]?.[d?.name]} mimeType={d?.mimeType} /> }
                                                            {/* <input {...formik.getFieldProps(`${name}[${k}]`)} type="text" className="form-control" placeholder="Enter name" /> */}
                                                            <ErrorMessageARRAY formik={formik} index={k} parent={name} name={d?.name} />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 pt-4">
                                            {k == 0 && !addDisallow ? (
                                                ( k < minArray) && (  
                                                <a onClick={() => addMore(k)} className="btn btn-primary">
                                                    Add More
                                                </a>
                                                )
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

export default ArrayObject;
