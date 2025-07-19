import React from 'react'
import * as Yup from "yup"
import { useFormik } from 'formik';
import ReactInputMask from 'react-input-mask'
import { ErrorMessage } from '../formik/errorMessage'
import { useEffect } from 'react';
import { useState } from 'react';
import common from '../../services/common';
import UnauthAxios from '../../services/unauthAxios';
import { BASE_URL } from '../../services/api-url';

const Pincode = ({action, value, disabled}) => {
    const [searchText, setSearchText] = useState("");
    const pincodeFormik = useFormik({
        initialValues : {
            pincode :''
        },
        validationSchema : Yup.object().shape({
            // pincode: Yup.number().required("Please enter pincode"),
        }),
        onSubmit: async(values) => {
            if(values.pincode){
                await getPincode(values.pincode)
            }else{
                action(values)
            }
        },
    });

    
    
    async function getPincode(values) {
        common.loader(true);
        let resData ={
            pincode:values || '',
            city:'',
            state:'',
        }
        await UnauthAxios({
            method: "GET",
            url: `${BASE_URL}/pincode/${values}`,
        }).then((res) => {
            resData.pincode = values
            resData.city = res?.data?.data?.districtName
            resData.state = res?.data?.data?.stateName
            action(resData)
        }).catch((error) => {
            action(resData)
            common.error(error)
        });
        common.loader(false);
    }

    useEffect(() => {
        const getData = setTimeout(() => {
            pincodeFormik.handleSubmit()
        }, 500)
  
        return () => clearTimeout(getData)
     }, [searchText])


    useEffect(() => {
        pincodeFormik.setFieldValue('pincode', value || '')
     }, [value])
  return (
    <>
        <ReactInputMask mask="999999" maskChar={null} {...pincodeFormik.getFieldProps("pincode")} onChange={(e)=>{
            setSearchText(e.target.value);
            pincodeFormik.setFieldValue('pincode', e?.target?.value);
        }} type="text" className="form-control" placeholder="Enter Pin Code" disabled={disabled} />
        <ErrorMessage formik={pincodeFormik} name="pinCode" />
    </>
  )
}

export default Pincode