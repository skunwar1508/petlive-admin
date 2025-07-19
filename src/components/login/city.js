import React, { useEffect, useState } from 'react'
import common from '../../services/common';
import UnauthAxios from '../../services/unauthAxios';
import Select from 'react-select';
import authAxios from '../../services/authAxios';

const City = ({ value, setValue, type }) => {
    const [resDataPC, setResDataPC] = useState([])
    const [selected, setSelected] = useState([])

    function loadPrimaryCategory() {
        let cityType = type == "vendor" ? 'vendor' : 'customers'
        authAxios({
            method: "GET",
            url: `/admin/${cityType}/city/getall`,
        }).then((res) => {
            let resData = res?.data?.data?.map((d)=>{
                return {
                    label:d
                }
            })
            setResDataPC(resData)
        }).catch((error) => {
            common.error(error)
        });
    }
    useEffect(() => {
        loadPrimaryCategory()
    }, [])

    const handleCategory = (e) => {
        setSelected(e)
        setValue(e.label)
    }


    const asignValue = (value) => {
        let res = resDataPC?.filter(item => item.label == value)[0];
        setSelected(res || [])
    }


    useEffect(() => {
        asignValue(value)
    }, [value, resDataPC]) 
    return (
        <>
            <Select
                className="selectmultyinp"
                classNamePrefix="select"
                getOptionLabel={e => e.label}
                getOptionValue={e => e.label}
                isMulti={false}
                // isDisabled={isDisabled}
                // isLoading={isLoading}
                // isClearable={isClearable}
                // isRtl={isRtl}
                // isSearchable={isSearchable}
                // {...formik.getFieldProps("primaryCategory")}
                // onChange={(e)=>console.log(e)}
                options={resDataPC}
                onChange={(e) => handleCategory(e)}
                value={selected}
                placeholder="Select City"

            />
        </>
    )
}

export default City