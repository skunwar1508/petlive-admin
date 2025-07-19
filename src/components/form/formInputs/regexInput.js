import React, { useEffect, useState } from 'react'
import { ErrorMessage } from '../../formik/errorMessage';

const RegexInput = (props) => {
    const {label, formik, name,inlineForm,required, placeholder, type,disabled,readOnly, changeValue, defaultValue, className, regexreplace} = props;
    // console.log(props)
    const [passVisible, setPassVisible] = useState('');
    useEffect(()=>{
      setPassVisible(props?.type || "text")
    },[type])

    const [alphabet, setAlphabet] = useState('');
    const handleChange = event => {
      const result = event.target.value.replace(regexreplace,"");
      setAlphabet(result);
      changeValue(name, result)
    };
    useEffect(()=>{
      if(props?.value){
        setAlphabet(props?.value || '')
      }
    },[props?.value])
    // /[^a-z ]/gi
    // console.log(regexreplace)
  return (
    <>  
      <div className='row'>
        <div className={`${inlineForm ? 'col-lg-3':''}`}>
          <label>{label} {required != false ? <span className='mandatory'>*</span> : ''}  </label>
        </div>
        <div className={`${inlineForm ? 'col-lg-9':''}`}>
          <div className='inputForm d-flex'>
          {/* {...props} */}
          <input defaultValue={formik?.values?.[defaultValue] || ''} 
          {...formik.getFieldProps(name)} className={className || 'form-control'}
          type={passVisible} disabled={disabled || false} readOnly={readOnly || false} value={alphabet} onChange={(e)=>handleChange(e)} 
          placeholder={placeholder || `Enter ${label?.toLowerCase()}`} />
          
      
          </div>
          <ErrorMessage formik={formik} name={name} />
        </div>
      </div>
    </>
  )
}

export default RegexInput
