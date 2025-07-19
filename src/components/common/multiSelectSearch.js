import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import authAxios from '../../services/authAxios';
import common from '../../services/common';
import PropTypes from 'prop-types';

const ReusableAsyncSelect = ({
    apiEndpoint,
    requestPayload = {},
    mapResponseToOptions,
    value,
    onBlur,
    onChange,
    defaultOptions = true,
    getOptionLabel = (e) => e.label,
    getOptionValue = (e) => e.value,
}) => {
    const [options, setOptions] = useState([]);
    const [currentValue, setCurrentValue] = useState([]);

    const fetchOptions = async (searchString) => {
        try {
            const payload = { ...requestPayload, searchString };
            const res = await authAxios.post(apiEndpoint, payload);
            const resData = res?.data?.data || [];
            const mappedOptions = mapResponseToOptions
                ? mapResponseToOptions(resData)
                : resData.map((item) => ({
                        label: item.name,
                        value: item._id,
                    }));
            setOptions(mappedOptions);
            return mappedOptions;
        } catch (error) {
            console.error(error);
            common.error(error);
            return [];
        }
    };

    const loadOptions = (inputValue, callback) => {
        fetchOptions(inputValue).then(callback);
    };

    const handleChange = (selectedOption) => {
        setCurrentValue(selectedOption);
        onChange(selectedOption);
    };

    useEffect(() => {
        if (value) {
            const selectedOption = options.filter((option) => option.value === value);
            setCurrentValue(selectedOption);
        } else {
            setCurrentValue(null);
        }
    }, [value, options]);



    return (
        <div className="reusable-async-select" style={{ margin: '10px 0', position: 'relative', minWidth: '100px' }}>
            <AsyncSelect
                classNamePrefix="async-select"
                styles={{
                    control: (base) => ({
                        ...base,
                        borderColor: '#ccc',
                        boxShadow: 'none',
                        fontSize: '12px', // Reduced font size
                        width: '200px', // Added min width
                        '&:hover': { borderColor: '#888' },
                    }),
                    menu: (base) => ({
                        ...base,
                        zIndex: 5,
                        fontSize: '12px', // Reduced font size
                    }),
                    option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? '#f0f0f0' : '#fff',
                        color: '#333',
                        fontSize: '12px', // Reduced font size
                        '&:active': { backgroundColor: '#ddd' },
                    }),
                }}
                defaultOptions={defaultOptions}
                value={currentValue}
                getOptionLabel={getOptionLabel}
                getOptionValue={getOptionValue}
                loadOptions={loadOptions}
                onBlur={onBlur}
                onChange={handleChange}
            />
        </div>
    );
};


ReusableAsyncSelect.defaultProps = {
    ...ReusableAsyncSelect.defaultProps,
};


ReusableAsyncSelect.propTypes = {
    apiEndpoint: PropTypes.string.isRequired,
    requestPayload: PropTypes.object,
    mapResponseToOptions: PropTypes.func,
    value: PropTypes.object,
    onBlur: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    defaultOptions: PropTypes.bool,
    getOptionLabel: PropTypes.func,
    getOptionValue: PropTypes.func,
};

ReusableAsyncSelect.defaultProps = {
    requestPayload: {},
    mapResponseToOptions: null,
    value: null,
    onBlur: () => {},
    defaultOptions: true,
    getOptionLabel: (e) => e.label,
    getOptionValue: (e) => e.value,
};
ReusableAsyncSelect.displayName = 'ReusableAsyncSelect';

export default ReusableAsyncSelect;
