import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import TextInput from './formInputs/textInput';
import FileInput from './formInputs/fileInput';
import SelectInput from './formInputs/selectInput';
import common from '../../services/common';
import authAxios from '../../services/authAxios';
import TextArea from './formInputs/textArea';
import RadioForm from './formInputs/radioForm';
import CheckBoxForm from './formInputs/chekbox';
import RegexInput from './formInputs/regexInput';
import ProfileBanner from './formInputs/profileBanner';
import TextAreaEditor from './formInputs/textAreaEditor';
import DatePickerInput from './formInputs/datepicker';
import MultiSelectInput from './formInputs/multiSelect';
import PropTypes from 'prop-types';
import { type } from '@testing-library/user-event/dist/type';

const FormBlock = memo(({
    name, className, inlineForm, fields, formType, updateApi, customeKeyAssign,
    getApi, postApi, redirect, action, children, pathUrl, removeField, getPathId,
    afterSubmitDisable, submitName, isCancel, cancelName, cancelOnChange, defaltNullValues
}) => {
    const [resAdmin, setResAdmin] = useState([]);
    const history = useLocation();
    const navigate = useNavigate();
    const { countryId, stateId } = useParams();
    const paramSearch = new URLSearchParams(window.location.search);
    const category = paramSearch.get("category");
    const subCategory = paramSearch.get("subCategory");

    // Memoized initial values
    const initialValues = useMemo(() => {
        let iniValues = {};
        fields?.filter((d) => d?.type).forEach((obj) => {
            const name = obj?.name;
            if (obj?.type === 'file') {
                iniValues[name] = obj?.value || null;
            } else if (obj?.type === 'array') {
                iniValues[name] = obj?.value || [];
            } else {
                iniValues[name] = obj?.value || '';
            }
        });
        return iniValues;
    }, [fields]);

    // Memoized validation schema
    const validationSchema = useMemo(() => {
        let schema = {};
        const getFieldValidation = (field) => {
            fields?.filter((d) => d?.type).forEach((obj) => {
                const name = obj?.name;
                const reqir = obj?.required === false ? 'notRequired' : 'required';
                const ermsg = obj?.errorMessage || 'Required';

                if (obj?.isEqual && !obj?.isNotEqual) {
                    schema[name] = Yup.string().test("match", obj?.isEqualMsg || 'Not Match', (values, options) => {
                        return values === options?.parent?.[obj?.isEqual];
                    })?.[reqir](ermsg);
                } else if (obj?.isNotEqual) {
                    schema[name] = Yup.string().test("match", obj?.isNotEqualMsg || 'Enter different value', (values, options) => {
                        if (!values || values === undefined || values === 'undefined') {
                            return options.createError({ message: ermsg });
                        }
                        if (obj?.regex && values && !values.match(obj?.regex)) {
                            return options.createError({ message: obj?.regexMsg });
                        }
                        return values !== options?.parent?.[obj?.isNotEqual];
                    })?.[reqir](ermsg);
                } else if (obj?.regex) {
                    schema[name] = Yup.string().matches(obj?.regex, ermsg || 'Invalid')?.[reqir](ermsg);
                } else if (obj?.type === 'number' && obj?.min && obj?.max) {
                    schema[name] = Yup.string().test('match', (v, o) => {
                        if (!v) return o.createError({ message: ermsg || 'Invalid' });
                        if (v < obj?.min) return o.createError({ message: `Please enter value greater than or equal to ${obj?.min}` });
                        if (v > obj?.max) return o.createError({ message: `Please enter value less than or equal to ${obj?.max}` });
                        return true;
                    })?.[reqir](ermsg);
                } else if (obj?.type === 'email') {
                    schema[name] = Yup.string().email('Please enter a valid email')[reqir](ermsg);
                } else if (obj?.type === 'array' && Array.isArray(obj?.fields)) {
                    // Nested array validation
                    const nestedSchema = {};
                    obj.fields.forEach((field) => {
                        const fname = field?.name;
                        const freqir = field?.required === false ? 'notRequired' : 'required';
                        const fermsg = field?.errorMessage || 'Required';
                        if (field?.regex) {
                            nestedSchema[fname] = Yup.string().matches(field?.regex, fermsg || 'Invalid')[freqir](fermsg);
                        } else if (field?.type === 'number' && field?.min && field?.max) {
                            nestedSchema[fname] = Yup.number()
                                .min(field?.min, `Please enter value greater than or equal to ${field?.min}`)
                                .max(field?.max, `Please enter value less than or equal to ${field?.max}`)[freqir](fermsg);
                        } else if (field?.type === 'email') {
                            nestedSchema[fname] = Yup.string().email('Please enter a valid email')[freqir](fermsg);
                        } else {
                            nestedSchema[fname] = Yup.string()[freqir](fermsg).nullable();
                        }
                    });
                    if (obj?.arrayString) {
                        schema[name] = Yup.array().of(Yup.string())[reqir](ermsg);
                    } else {
                        schema[name] = Yup.array().of(Yup.object().shape(nestedSchema))[reqir](ermsg);
                    }
                } else if (obj?.type == 'multiselect' && obj?.isMulti) {
                    if (obj?.arrayType === 'object') {
                        getFieldValidation(obj?.fields);
                    } else {
                        schema[name] = Yup.array().of(Yup.string()).nullable();
                    }

                } else {
                    schema[name] = Yup.string()?.[reqir](ermsg).nullable();
                }
            });
        }
        getFieldValidation(fields);
        return Yup.object().shape(schema);
    }, [fields]);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: useCallback(async (values) => {
            // Clean up values
            delete values.undefined;

            if (defaltNullValues && defaltNullValues?.length > 0) {
                defaltNullValues?.forEach(field => {
                    if (!values[field]) values[field] = null;
                });
            }

            const postValues = formType === "page" ? { section: values } : values;
            if (getApi) {
                await editForm(postValues);
            } else {
                await postForm(postValues);
            }
        }, [formType, getApi]),
    });

    useEffect(() => {
        formik.resetForm();
    }, [history]);

    const getForm = useCallback(async () => {
        if (getApi) {
            try {
                const res = await authAxios.get(`${getApi}${getPathId || ''}`);
                const resData = formType === "page" ? res?.data?.data?.section : res?.data?.data;
                setResAdmin(resData);
                fields.forEach((obj) => {
                    const name = obj?.name;
                    if (obj?.type === 'file' && typeof resData[name] === 'object' && resData[name] !== null) {
                        formik.setFieldValue(name, resData[name]._id);
                    } else if (obj?.type === 'array' && Array.isArray(obj?.fields)) {
                        const arrayValues = resData[name] || [];
                        if (obj?.arrayString && arrayValues.length == 0) {
                            formik.setFieldValue(name, obj?.defaultValue || ['']);
                            return;
                        }
                        const formattedArray = arrayValues.map(item => {
                            let newItem = {};
                            obj.fields.forEach(field => {
                                if (field.type === 'file' && typeof item === 'object' && item?._id !== null) {
                                    newItem = item?._id || '';
                                } else {
                                    newItem[field.name] = item[field.name] || field.value || '';
                                }
                            });
                            return newItem;
                        });
                        formik.setFieldValue(name, formattedArray);
                    } else {
                        formik.setFieldValue(name, resData[name] || '');
                    }
                });
            } catch (error) {
                common.error(error);
            }
        }
    }, [getApi, getPathId, formType, fields]);


    useEffect(() => {
        getForm();
    }, [getForm]);

    const editForm = async (values) => {
        common.loader(true);
        const path = pathUrl ? resAdmin?._id : '';
        if (removeField && removeField?.length > 0) {
            removeField.forEach(rmField => delete values[rmField]);
        }

        try {
            const res = await authAxios.post(`${updateApi}/${path}`, values);
            toast.success(res?.data?.message);
            if (redirect) {
                navigate(redirect);
            } else if (action) {
                action(res?.data);
            } else {
                getForm();
            }
        } catch (error) {
            common.error(error);
        } finally {
            common.loader(false);
        }
    };

    const postForm = async (values) => {
        common.loader(true);
        if (removeField && removeField?.length > 0) {
            removeField.forEach(rmField => delete values[rmField]);
        }

        try {
            const res = await authAxios.post(postApi, values);
            toast.success(res?.data?.message);
            if (redirect) {
                navigate(redirect);
            } else if (action) {
                action(res?.data);
            }
        } catch (error) {
            common.error(error);
        } finally {
            common.loader(false);
        }
    };

    return (
        <form onSubmit={formik.handleSubmit} className='login_form'>
            <div className={`ProfileForm ${className}`}>
                <div className='ProfileHeading'>
                    <h5>{name}</h5>
                </div>
                <div className='formWraper'>
                    <div className='row'>
                        {fields.map((d, k) => (
                            <div className={`col-lg-${d?.col || 12}`} key={k}>
                                <div className={`formGroup ${d?.isHide ? '' : 'mb-3'}`}>
                                    {!d?.isHide && (
                                        <>
                                            {d?.type === 'text' && <TextInput {...formik.getFieldProps(d?.name)} {...d} formik={formik} inlineForm={inlineForm} />}
                                            {d?.type === 'password' && <TextInput {...formik.getFieldProps(d?.name)} {...d} formik={formik} inlineForm={inlineForm} type="password" />}
                                            {d?.type === 'email' && <TextInput {...formik.getFieldProps(d?.name)} {...d} formik={formik} inlineForm={inlineForm} type="email" />}
                                            {d?.type === 'number' && <TextInput {...formik.getFieldProps(d?.name)} {...d} formik={formik} inlineForm={inlineForm} type="number" />}
                                            {d?.type === 'file' && <FileInput {...formik.getFieldProps(d?.name)} {...d} formik={formik} inlineForm={inlineForm} />}
                                            {d?.type === 'select' && <SelectInput {...formik.getFieldProps(d?.name)} {...d} formik={formik} inlineForm={inlineForm} />}
                                            {d?.type === 'multiselect' && <MultiSelectInput {...formik.getFieldProps(d?.name)} {...d} formik={formik} inlineForm={inlineForm} value={formik.values[d?.name]} />}
                                            {d?.type === 'textarea' && <TextArea {...formik.getFieldProps(d?.name)} {...d} formik={formik} inlineForm={inlineForm} />}
                                            {d?.type === 'radio' && <RadioForm {...formik.getFieldProps(d?.name)} {...d} formik={formik} inlineForm={inlineForm} />}
                                            {d?.type === 'checkbox' && <CheckBoxForm {...formik.getFieldProps(d?.name)} {...d} formik={formik} inlineForm={inlineForm} />}
                                            {d?.type === 'editor' && <TextAreaEditor {...formik.getFieldProps(d?.name)} {...d} formik={formik} inlineForm={inlineForm} />}
                                            {d?.type === 'datepicker' && <DatePickerInput {...formik.getFieldProps(d?.name)} {...d} formik={formik} inlineForm={inlineForm} />}
                                            {d?.type === 'array' && Array.isArray(d?.fields) && (
                                                <ArrayObject
                                                    {...formik.getFieldProps(d?.name)}
                                                    {...d}
                                                    formik={formik}
                                                    inlineForm={inlineForm}
                                                />
                                            )}
                                        </>
                                    )}
                                    {children && (
                                        <div className='other_html_content'>
                                            {typeof children === 'function' ? children(d, formik) : children}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='row'>
                        <div className={`${inlineForm ? 'col-lg-3' : ''}`}></div>
                        <div className={`${inlineForm ? 'col-lg-9' : ''}`}>
                            <div className='saveButton'>
                                <button type='submit' className='mt-3 btn-theme btn-custom'>
                                    {submitName || 'Save'}
                                </button>
                                {isCancel && (
                                    <button type='button' className='mt-3 ml-2 btn-theme-5 btn-custom' onClick={cancelOnChange}>
                                        {cancelName || 'Cancel'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
});

const ArrayObject = memo(({ name, fields, formik, inlineForm, addMoreName }) => {
    const values = formik.values[name] || [];
    const errors = formik.errors[name] || [];
    const touched = formik.touched[name] || [];

    const handleAdd = () => {
        const newItem = {};
        fields.forEach(field => {
            newItem[field.name] = field.value || (field.type === 'array' ? [] : '');
        });
        formik.setFieldValue(name, [...values, newItem]);
    };

    const handleRemove = (idx) => {
        const updated = values.filter((_, i) => i !== idx);
        formik.setFieldValue(name, updated);
    };

    const handleChange = (idx, fieldName, value) => {
        const updated = values.map((item, i) =>
            i === idx ? { ...item, [fieldName]: value } : item
        );
        formik.setFieldValue(name, updated);
    };

    // Helper to render input based on type, supports nested arrays
    const renderInput = (field, idx, item) => {
        const inputName = `${name}[${idx}].${field.name}`;
        const commonProps = {
            name: inputName,
            value: item[field.name],
            error: errors[idx]?.[field.name],
            touched: touched[idx]?.[field.name],
            inlineForm,
            formik,
            ...field
        };
        if (field.isArray) {
            commonProps.name = `${name}[${idx}]`;
            commonProps.value = item || "";
            commonProps.error = errors[idx] || [];
            commonProps.touched = touched[idx] || [];
        }

        switch (field.type) {
            case 'text':
            case 'password':
            case 'email':
            case 'number':
                return (
                    <TextInput
                        {...commonProps}
                        type={field.type}
                        onChange={e => handleChange(idx, field.name, e.target.value)}
                    />
                );
            case 'file':
                return (
                    <FileInput
                        {...commonProps}
                        onChange={e => handleChange(idx, field.name, e.target.files?.[0])}
                    />
                );
            case 'select':
                return (
                    <SelectInput
                        {...commonProps}
                        onChange={e => handleChange(idx, field.name, e.target.value)}
                    />
                );
            case 'multiselect':
                return (
                    <MultiSelectInput
                        {...commonProps}
                        onChange={val => handleChange(idx, field.name, val)}
                    />
                );
            case 'textarea':
                return (
                    <TextArea
                        {...commonProps}
                        onChange={e => handleChange(idx, field.name, e.target.value)}
                    />
                );
            case 'radio':
                return (
                    <RadioForm
                        {...commonProps}
                        onChange={e => handleChange(idx, field.name, e.target.value)}
                    />
                );
            case 'checkbox':
                return (
                    <CheckBoxForm
                        {...commonProps}
                        onChange={e => handleChange(idx, field.name, e.target.checked)}
                    />
                );
            case 'editor':
                return (
                    <TextAreaEditor
                        {...commonProps}
                        onChange={val => handleChange(idx, field.name, val)}
                    />
                );
            case 'datepicker':
                return (
                    <DatePickerInput
                        {...commonProps}
                        onChange={val => handleChange(idx, field.name, val)}
                    />
                );
            case 'array':
                // Nested array support
                return (
                    <ArrayObject
                        name={`${name}[${idx}].${field.name}`}
                        fields={field.fields}
                        formik={{
                            ...formik,
                            values: { [field.name]: item[field.name] || [] },
                            errors: { [field.name]: errors[idx]?.[field.name] || [] },
                            touched: { [field.name]: touched[idx]?.[field.name] || [] },
                            setFieldValue: (fieldKey, val) => {
                                const updated = values.map((itm, i) =>
                                    i === idx ? { ...itm, [field.name]: val } : itm
                                );
                                formik.setFieldValue(name, updated);
                            }
                        }}
                        inlineForm={inlineForm}
                    />
                );
            default:
                return (
                    <TextInput
                        {...commonProps}
                        onChange={e => handleChange(idx, field.name, e.target.value)}
                    />
                );
        }
    };

    return (
        <div className="array-object-wrapper">
            {values.map((item, idx) => (
                <div key={idx} className="array-object-item mb-2">
                    <div className="row">
                        {fields.map((field, fidx) => (
                            <div className={`col-lg-${field.col || 12}`} key={fidx}>
                                {renderInput(field, idx, item)}
                            </div>
                        ))}

                    </div>
                    <div className="row mb-3">
                        <div className="col-lg-3"></div>
                        <div className="col-lg-9 d-flex align-items-end gap-2">
                            {values?.length > 1 && (
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleRemove(idx)}
                                >
                                    Remove
                                </button>
                            )}
                            {values?.length === idx+1 && (
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm mt-2"
                                    onClick={handleAdd}
                                >
                                    {addMoreName || 'Add Item'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
});
FormBlock.propTypes = {
    /** Name of the form */
    name: PropTypes.string,
    /** CSS class name for the form */
    className: PropTypes.string,
    /** Whether the form should be displayed inline */
    inlineForm: PropTypes.bool,
    /** Fields to be rendered in the form */
    fields: PropTypes.arrayOf(PropTypes.object),
    /** Type of the form */
    formType: PropTypes.string,
    /** API endpoint for updating data */
    updateApi: PropTypes.string,
    /** Custom key assignment for form fields */
    customeKeyAssign: PropTypes.func,
    /** API endpoint for fetching data */
    getApi: PropTypes.string,
    /** API endpoint for posting data */
    postApi: PropTypes.string,
    /** URL to redirect after form submission */
    redirect: PropTypes.string,
    /** Action to be performed on form submission */
    action: PropTypes.func,
    /** Child components */
    children: PropTypes.oneOfType([
        PropTypes.func, // Allow function
        PropTypes.node, // Allow string, number, element, or array
    ]),
    /** URL path for the form */
    pathUrl: PropTypes.string,
    /** Function to remove a field from the form */
    removeField: PropTypes.arrayOf(PropTypes.string),
    /** Function to get the path ID */
    getPathId: PropTypes.func,
    /** Whether to disable the form after submission */
    afterSubmitDisable: PropTypes.bool,
    /** Name of the submit button */
    submitName: PropTypes.string,
    /** Whether to show a cancel button */
    isCancel: PropTypes.bool,
    /** Name of the cancel button */
    cancelName: PropTypes.string,
    /** Function to handle cancel button click */
    cancelOnChange: PropTypes.func,
    /** Default null values for the form fields */
    defaltNullValues: PropTypes.arrayOf(PropTypes.string)
};

export default FormBlock;