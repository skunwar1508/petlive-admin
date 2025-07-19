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
        name: "Add Provider",
        redirect: "/providers/list/1",    
        fields: [
            {
                type: 'text',
                name: 'fullName',
                label: 'Full Name',
                errorMessage: 'Please enter full name',
            },
            {
                type: 'email',
                name: 'email',
                label: 'Email',
                errorMessage: 'Please enter a valid email',
            },
            {
                type: 'text',
                name: 'phone',
                label: 'Phone',
                errorMessage: 'Please enter phone number',
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
            },
            {
                type: 'text',
                name: 'specialization',
                label: 'Specialization',
                errorMessage: 'Please enter specialization',
            },
            {
                type: 'text',
                name: 'license',
                label: 'License Number',
                errorMessage: 'Please enter license number',
            },
            {
                type: 'number',
                name: 'yearsOfExperience',
                label: 'Years of Experience',
                errorMessage: 'Please enter years of experience',
            },
            {
                type: 'text',
                name: 'expertise',
                label: 'Expertise',
                errorMessage: 'Please enter expertise',
            },
            {
                type: 'text',
                name: 'accountHolder',
                label: 'Account Holder Name',
                errorMessage: 'Please enter account holder name',
            },
            {
                type: 'text',
                name: 'bankName',
                label: 'Bank Name',
                errorMessage: 'Please enter bank name',
            },
            {
                type: 'text',
                name: 'accountNumber',
                label: 'Account Number',
                errorMessage: 'Please enter account number',
            },
            {
                type: 'text',
                name: 'ifsc',
                label: 'IFSC Code',
                errorMessage: 'Please enter IFSC code',
            },
            {
                type: 'number',
                name: 'commissionRate',
                label: 'Commission Rate (%)',
                errorMessage: 'Please enter commission rate',
            },
        ],
    });
    

    useEffect(() => {
        let pageInfo = {
            link: '/',
            title: `Add Provider`
        }
        if (id) {
            setFormConfig(prev => ({
                ...prev,
                getApi: `/doctor/provider/detail/${id}`,
                updateApi: `/doctor/provider/${id}`,
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