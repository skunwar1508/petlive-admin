import React, { memo } from 'react';
import PropTypes from 'prop-types';

const TextInput = memo((props) => {
  const {
    label,
    formik,
    name,
    placeholder,
    type = 'text',
    className = 'form-control',
    disabled = false,
    readOnly = false,
    maxLength,
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

        {/* Input Field */}
        <input
          {...getFieldProps(name)} // Bind formik field props
          type={type}
          placeholder={placeholder || `Enter ${label?.toLowerCase()}`}
          className={className}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
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
TextInput.propTypes = {
  label: PropTypes.string,
  formik: PropTypes.object.isRequired, // formik object is required
  name: PropTypes.string.isRequired, // name is required
  placeholder: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  inlineForm: PropTypes.bool,
};

export default TextInput;