import { useFormik } from 'formik'
import * as Yup from "yup"
import React, { useEffect, useState } from 'react'
import common from '../../services/common';
import { useLocation } from 'react-router-dom';

const SearchFormik = ({placeholder, onChange, name}) => {
    const history = useLocation()
    const [searchText, setSearchText] = useState("");
    const searchFormik = useFormik({
        initialValues: {
           searchString: ''
        },
  
        onSubmit: (values) => {
            onChange(values)
        },
     });
     
   useEffect(() => {
    // console.log('searchText', searchText);
    // const getData = setTimeout(() => {
    // //    searchFormik.handleSubmit()
    //    // searchSubmit(searchText)
    // }, 500)

    // return () => clearTimeout(getData)
 }, [searchText])


 useEffect(()=>{
    if(name){
        let values = common?.[name]();
        searchFormik.setFieldValue('searchString', values?.searchString || '')
    }else{
        searchFormik.setFieldValue('searchString', '')
    }
},[name, history])

  return (
    <>
        <input 
            type="text" 
            placeholder={placeholder || "Search"} 
            value={searchFormik.values.searchString}
            className="form-control"
            onChange={(e) => {
                setSearchText(e.target.value || '');
                searchFormik.setFieldValue('searchString', e?.target?.value);
                const getData = setTimeout(() => {
                   searchFormik.handleSubmit()
                }, 500)
            
                return () => clearTimeout(getData)
            }} 
        />
    </>
  )
}

export default SearchFormik