import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';

const DatePickerInput = memo((props) => {
    const {
        label,
        formik,
        name,
        placeholder,
        className = 'form-control',
        disabled = false,
        readOnly = false,
        required = false,
        inlineForm = false,
        minDate,
        maxDate,
        dateFormat,
        showYearDropdown,
        showMonthDropdown,
        yearDropdownItemNumber,
        fixedHeight,
    } = props;

    // Extract formik props
    const { getFieldProps, touched, errors } = formik;

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

                {/* Date Picker */}
                <ReactDatePicker
                    selected={formik?.values[name] ? new Date(formik?.values[name] || '') : null}
                    onChange={(date) => formik.setFieldValue(name, date)}
                    placeholderText={placeholder || `Enter ${label?.toLowerCase()}`}
                    className={className}
                    disabled={disabled}
                    readOnly={readOnly}
                    minDate={minDate}
                    maxDate={maxDate}
                    dateFormat={dateFormat}
                    showYearDropdown={showYearDropdown}
                    showMonthDropdown={showMonthDropdown}
                    yearDropdownItemNumber={yearDropdownItemNumber}
                    fixedHeight={fixedHeight}
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
DatePickerInput.propTypes = {
    label: PropTypes.string,
    formik: PropTypes.object.isRequired, // formik object is required
    name: PropTypes.string.isRequired, // name is required
    placeholder: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    inlineForm: PropTypes.bool,
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
    dateFormat: PropTypes.string,
    showYearDropdown: PropTypes.bool,
    showMonthDropdown: PropTypes.bool,
    yearDropdownItemNumber: PropTypes.number,
    fixedHeight: PropTypes.bool,
};

export default DatePickerInput;