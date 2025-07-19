import React, { useEffect, useState } from 'react'
import common from '../../services/common';
import UnauthAxios from '../../services/unauthAxios';
import Select from 'react-select';
import authAxios from '../../services/authAxios';

const PrimaryCategory = ({ value, setValue, disabled }) => {
    const [resDataPC, setResDataPC] = useState([])
    const [selected, setSelected] = useState([])

    function loadPrimaryCategory() {
        authAxios({
            method: "GET",
            url: `/dropdowns/primaryCategory`,
        }).then((res) => {
            setResDataPC(res?.data?.data)
        }).catch((error) => {
            common.error(error)
        });
    }
    useEffect(() => {
        loadPrimaryCategory()
    }, [])

    const handleCategory = (e) => {
        setSelected(e)
        setValue(e?.map((d) => { return d._id }))
    }


    const asignValue = (value) => {
        let res = resDataPC?.filter(item => value.includes(item?._id));
        setSelected(res)
    }


    useEffect(() => {
        value?.length > 0 && asignValue(value)
    }, [value, resDataPC])
    return (
        <>
            <Select
                className="selectmultyinp"
                classNamePrefix="select"
                value={selected}
                getOptionLabel={e => e.title}
                getOptionValue={e => e._id}
                isMulti={true}
                // isDisabled={isDisabled}
                // isLoading={isLoading}
                // isClearable={isClearable}
                // isRtl={isRtl}
                // isSearchable={isSearchable}
                // {...formik.getFieldProps("primaryCategory")}
                // onChange={(e)=>console.log(e)}
                options={resDataPC}
                isDisabled={disabled || false}
                onChange={(e) => handleCategory(e)}
                placeholder="Select Primary Category"

            />
        </>
    )
}

export default PrimaryCategory