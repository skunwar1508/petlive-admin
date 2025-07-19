import React, { memo } from 'react';
import PropTypes from 'prop-types';

const CheckBoxForm = memo((props) => {
  const {
    label,
    formik,
    name,
    options,
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
        )}</div>
      <div className={`${inlineForm ? 'col-lg-9' : 'col-lg-12'}`}>

        {/* Checkboxes */}
        {options.map((option, index) => (
          <div key={index} className='form-check'>
            <input
              {...getFieldProps(name)} // Bind formik field props
              type="checkbox"
              value={option.value}
              className={className}
              disabled={disabled}
              readOnly={readOnly}
            />
            <label className="form-check-label">
              {option.label}
            </label>
          </div>
        ))}
        {/* Display Validation Error */}
        {touched[name] && errors[name] && (
          <div className='text-danger'>{errors[name]}</div>
        )}
      </div>

    </div>
  );
});

// PropTypes for type checking
CheckBoxForm.propTypes = {
  label: PropTypes.string,
  formik: PropTypes.object.isRequired, // formik object is required
  name: PropTypes.string.isRequired, // name is required
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired, // options is required
  className: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  inlineForm: PropTypes.bool,
};

export default CheckBoxForm;