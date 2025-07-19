
import React from 'react'
import { ErrorMessage } from '../../formik/errorMessage';

const Button = (props) => {
        // console.log(props)
  return (
    <>
        <button {...props} >{props?.name || 'Submit'}</button>
    </>
  )
}

export default Button
