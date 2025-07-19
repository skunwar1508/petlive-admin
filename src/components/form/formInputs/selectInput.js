import React, { memo } from 'react';
import PropTypes from 'prop-types';

const SelectInput = memo((props) => {
  const {
    label,
    formik,
    name,
    options = [],
    placeholder,
    className = 'form-control',
    disabled = false,
    readOnly = false,
    required = false,
    inlineForm = false,
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

        {/* Select Field */}
        <select
          {...getFieldProps(name)} // Bind formik field props
          className={className}
          disabled={disabled}
          readOnly={readOnly}
        >
          <option value="">{placeholder || `Select ${label?.toLowerCase()}`}</option>
          {options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      {/* Display Validation Error */}
      {touched[name] && errors[name] && (
        <div className='text-danger'>{errors[name]}</div>
      )}
      </div>

    </div>
  );
});

// PropTypes for type checking
SelectInput.propTypes = {
  label: PropTypes.string,
  formik: PropTypes.object.isRequired, // formik object is required
  name: PropTypes.string.isRequired, // name is required
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  placeholder: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  inlineForm: PropTypes.bool,
};

export default SelectInput;