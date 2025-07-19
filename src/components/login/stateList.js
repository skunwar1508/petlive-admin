import React, { useEffect, useState } from 'react'
import common from '../../services/common';
import UnauthAxios from '../../services/unauthAxios';
import Select from 'react-select';
import authAxios from '../../services/authAxios';
import { BASE_URL } from '../../services/api-url';

const StateList = ({value, setValue, isDisabled}) => {
    const [resDataPC, setResDataPC] = useState([])
    const [selected, setSelected] = useState([])

    function loadPrimaryCategory() {
        authAxios({
            method: "GET",
            url: `${BASE_URL}/pincode/states/india`,
        }).then((res) => {
            setResDataPC(res?.data?.data)
        }).catch((error) => {
            common.error(error)
        });
    }
    useEffect(()=>{
        loadPrimaryCategory()
    },[])

    const handleCategory = (e)=>{
        setSelected(e)
        setValue(e?.map((d)=>{ return d?.stateName}))
    }

    
    const asignValue = (value)=>{
        let res = resDataPC?.filter(item => value.includes(item?.stateName));
        setSelected(res)
    }

    
    useEffect(()=>{
        asignValue(value)
    },[value, resDataPC])
  return (
    <>
        <Select
            className="selectmultyinp"
            value={selected}
            classNamePrefix="select"
            getOptionLabel={e => e.stateName}
            getOptionValue={e => e.stateName}
            isMulti={true}
            // isDisabled={isDisabled}
            // isLoading={isLoading}
            // isClearable={isClearable}
            // isRtl={isRtl}
            // isSearchable={isSearchable}
            // {...formik.getFieldProps("primaryCategory")}
            // onChange={(e)=>console.log(e)}
            isDisabled={isDisabled || false}
            options={resDataPC}
            onChange={(e)=>handleCategory(e)}
            placeholder="Select State"
        />
    </>
  )
}

export default StateList