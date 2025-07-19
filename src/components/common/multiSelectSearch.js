import React, { useEffect, useState } from 'react'
import Select, { components } from 'react-select';
import makeAnimated from 'react-select/animated';
import { toast } from 'react-toastify';
import apiFunc from '../../services/api';
import ROOT_URL from '../../services/api-url';
import authAxios from '../../services/authAxios';
import common from '../../services/common';
import AsyncSelect from 'react-select/async';

const SelectMultipleExam = (props) => {
    const [options, setOptions] = useState([])
    const [selected, setSelected] = useState([])
    
    const{value, onBlur, onChange, remove,category} = props;
    const { Option } = components;
    const getTags = (e) => {
    let values= e || 'a'
        let postValue = {
            searchString:values,
            categoryId: "621c547d131904275230b501" || '',
             
        }
        return apiFunc.searchExam(postValue).then((res)=>{
            let resData = res?.data?.data;
                resData = resData?.map((data)=>{
                let firRes = {
                    label:data?.name,
                    value:data._id,
                    examId: data.examId,
                    
                };
                return firRes
            })
            // console.log(resData)
            setOptions(resData);

            return resData;
        }).catch((error) => {
            common.error(error);
        })

        
    }
    const loadOptions = (value, callback) => {
          
       
      
                getTags(value).then((res)=>{
                    // console.log(res)
                  
                    callback(res);
                })
            
            
     
    };
    const handleChange = (e) => {
         onChange(e);
        // setOptions(value);
    }
    // const IconOption = props => (
    //     <Option {...props}>
    //       <span className='qsnNotype'>{props.data.questId} </span>  
    //       {props.data.label}
    //     </Option>
    // );
  return (
    <>
        {value && value.map((data, key)=>(
            <div className="row mb-2" key={key}>
                <div className="col-9">
                <input type="text" readOnly value={data.label}  className="form-control" />
                </div>
                <div className="col-3">
                    <button type="button" onClick={()=> remove(key)} className="trash">
                        <span></span> <i></i>
                    </button>
                </div>
            </div>
        ))}
        <AsyncSelect
            defaultOptions
            value={selected}
            getOptionLabel={e => e.label}
            getOptionValue={e => e._id}
           loadOptions={loadOptions}
            onBlur={(e)=>onBlur(e)} onChange={(e)=>handleChange(e)}
            // components={{ Option: IconOption }}
      />
    </>
  )
}

export default SelectMultipleExam