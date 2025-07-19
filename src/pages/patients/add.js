import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from '../../context/theme';
import FormBlock from '../../components/form/FormBlock';
import common from '../../services/common';
import ReactSelect from 'react-select';
import { ErrorMessage } from '../../components/formik/errorMessage';
import { useFormik } from "formik";
import * as Yup from "yup";


const Add = () => {
    const { setBreadcrumbs } = useContext(UserContext);
    let { id } = useParams()
    const [formConfig, setFormConfig] = useState({
        name: "Add Patient",
        redirect: "/patients/list/1",    
        fields: [
            {
                type: 'text',
                name: 'fullName',
                label: 'Full Name',
                errorMessage: 'Please enter full name',
                value: '', 
            },
            {
                type: 'email',
                name: 'email',
                label: 'Email',
                errorMessage: 'Please enter a valid email',
                value: '', 
            },
            {
                type: 'text',
                name: 'phone',
                label: 'Phone',
                errorMessage: 'Please enter phone number',
                value: '', 
            },
            {
                type: 'select',
                name: 'gender',
                label: 'Gender',
                errorMessage: 'Please select gender',
                options: [
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' },
                    { label: 'Other', value: 'Other' },
                ],
            },
            {
                type: 'datepicker',
                name: 'dateOfBirth',
                label: 'Date of Birth',
                showYearDropdown: true,
                showMonthDropdown: true,
                errorMessage: 'Please enter date of birth',
                value: '',
            },
            {
                type: 'text',
                name: 'currentProvider',
                label: 'Current Provider',
                errorMessage: 'Please enter current provider',
                value: '',
            },
            {
                type: 'file',
                name: 'historyDoc',
                label: 'History Document',
                errorMessage: 'Please enter history document',
                value: '',
            },
        ],
    });
    

    useEffect(() => {
        let pageInfo = {
            link: '/',
            title: `Add Patient`
        }
        if (id) {
            setFormConfig(prev => ({
                ...prev,
                getApi: `/patient/get/${id}`,
                updateApi: `/patient/update/${id}`,
            }))
        }
        setBreadcrumbs(pageInfo)
    }, [id]);


    return (
        <div className='card'>
            <FormBlock {...formConfig}
                inlineForm={true}
                className={'card-body Profileformban bank-detailsForm'}
            > </FormBlock>


        </div>
    )
}

export default Add;