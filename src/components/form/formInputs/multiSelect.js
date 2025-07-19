import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import common from '../../../services/common';
import authAxios from '../../../services/authAxios';

const MultiSelectInput = memo((props) => {
    const {
        label,
        formik,
        name,
        placeholder,
        className = '',
        disabled = false,
        readOnly = false,
        required = false,
        inlineForm = false,
        isMulti = false,
        isAll = false,
        route,
        labelName,
        valueName,
        dependency,
        dependencyId,
    } = props;

    // Extract formik props
    const { getFieldProps, touched, errors } = formik;

    const [apiData, setApiData] = useState([]);
    const [selected, setSelected] = useState([]);

    const fetchDataFromAPI = async (url) => {
        try {
            const response = await authAxios.get(url);
            const data = response.data;
            return data?.data || [];
        } catch (error) {
            common.error(error);
            return [];
        }
    };

    React.useEffect(() => {
        if (dependency !== "none" && route && dependencyId) {
            const url = route + "/" + dependencyId;
            fetchDataFromAPI(url).then((data) => {
                const formattedData = data.map((item) => ({
                    label: labelName ? item[labelName] : item,
                    value: valueName ? item[valueName] : item,
                }));
                setApiData(formattedData);
            });
        } else if (dependency === "none" && route) {
            fetchDataFromAPI(route).then((data) => {
                const formattedData = data.map((item) => ({
                    label: labelName ? item[labelName] : item,
                    value: valueName ? item[valueName] : item,
                }));
                setApiData(formattedData);
            });
        }
    }, [dependency, route, dependencyId]);
    

    const handleSelect = (e) => {
        if (isAll && e && e.some((option) => option.value === 'all')) {
            // If "Select All" is selected, set all options as selected
            setSelected(apiData); // Set all options as selected
            formik.setFieldValue(name, apiData.map((option) => option.value)); // Update formik values
        } else if (isAll && e && e.some((option) => option.value === 'all-unselected')) {
            // If "All Unselected" is selected, clear all selections
            setSelected([]); // Clear selected options
            formik.setFieldValue(name, []); // Update formik values to empty
        } else {
            // If "Select All" or "All Unselected" is not selected, set the selected options
            setSelected(e);
            if (isMulti) {
                formik.setFieldValue(name, e?.map((item) => item.value));
            } else {
                formik.setFieldValue(name, e?.value);
            }
        }
    };
    

    const asignValue = (value) => {
        let res = apiData?.filter((item) => value == item?.value);
        if (isMulti) {
            res = apiData?.filter((item) => value?.includes(item?.value));
        } else {
            res = apiData?.filter((item) => value == item?.value);
        }
        setSelected(res);
    };

    useEffect(() => {
        asignValue(props.value);
    }, [props.value, apiData]);

    // Determine if all options are selected
    const allSelected = selected.length === apiData.length;

    // Add "Select All" or "All Unselected" option based on selection state
    const optionsWithSelectAll = isAll 
        ? allSelected 
            ? [{ label: 'All Unselected', value: 'all-unselected' }, ...apiData] 
            : [{ label: 'All', value: 'all' }, ...apiData] 
        : apiData;

    return (
        <div className='row'>
            <div className={`${inlineForm ? 'col-lg-3' : 'col-lg-12'}`}>
                {/* Label */}
                {label && (
                    <label>
                        {label} {required && <span className='mandatory'>*</span>}
                    </label>
                )}
            </div>
            <div className={`${inlineForm ? 'col-lg-9' : 'col-lg-12'}`}>
                {/* Multi Select Field */}
                <Select
                    {...getFieldProps(name)} // Bind formik field props
                    value={selected}
                    className={className}
                    disabled={disabled}
                    readOnly={readOnly}
                    isMulti={isMulti}
                    options={optionsWithSelectAll}
                    placeholder={placeholder || `Select ${label?.toLowerCase()}`}
                    onChange ={handleSelect} // Handle selection changes
                />
                {/* Display Validation Error */}
                {touched[name] && errors[name] && (
                    <div className='text-danger'>{errors[name]}</div>
                )}
            </div>
        </div>
    );
});

// PropTypes for type checking
MultiSelectInput.propTypes = {
    label: PropTypes.string,
    formik: PropTypes.object.isRequired, // formik object is required
    name: PropTypes.string.isRequired, // name is required
    placeholder: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    inlineForm: PropTypes.bool,
    isMulti: PropTypes.bool,
    isAll: PropTypes.bool,
    route: PropTypes.string,
    labelName: PropTypes.string,
    valueName: PropTypes.string,
    dependency: PropTypes.string,
    dependencyId: PropTypes.string,
};

export default MultiSelectInput;