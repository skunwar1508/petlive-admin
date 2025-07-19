import React, { memo } from 'react';
import PropTypes from 'prop-types';

const TextArea = memo((props) => {
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
    rows = 5,
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

        {/* Text Area Field */}
        <textarea
          {...getFieldProps(name)} // Bind formik field props
          className={className}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder || `Enter ${label?.toLowerCase()}`}
          rows={rows}
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
TextArea.propTypes = {
  label: PropTypes.string,
  formik: PropTypes.object.isRequired, // formik object is required
  name: PropTypes.string.isRequired, // name is required
  placeholder: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  inlineForm: PropTypes.bool,
  rows: PropTypes.number,
};

export default TextArea;