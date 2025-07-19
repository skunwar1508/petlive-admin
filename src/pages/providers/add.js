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
        name: "Add Vet",
        redirect: "/doctor/list/1",
        postApi: '/doctor/create',
        fields: [
            {
                type: 'text',
                name: 'name',
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
                name: 'dob',
                label: 'Date of Birth',
                showYearDropdown: true,
                showMonthDropdown: true,
                errorMessage: 'Please enter date of birth',
            },
            {
                type: 'number',
                name: 'experience',
                label: 'Years of Experience',
                errorMessage: 'Please enter years of experience',
                min: 1,
            },
            {
                type: 'text',
                name: 'registrationNo',
                label: 'Registration Number',
                errorMessage: 'Please enter registration number',
            },
            {
                type: 'file',
                name: 'profileImage',
                label: 'Profile Image',
                errorMessage: 'Please upload profile image',
            },
            {
                type: 'file',
                name: 'licenceImage',
                label: 'Licence Image',
                errorMessage: 'Please upload licence image',
            },
            {
                type: 'text',
                name: 'primarySpecialisation',
                label: 'Primary Specialisation',
                errorMessage: 'Please enter primary specialisation',
            },
            {
                type: 'text',
                name: 'otherSpecialisation',
                label: 'Other Specialisations',
                errorMessage: 'Please enter other specialisations',
                options: [], // Populate dynamically if needed
            },
            {
                type: 'multiselect',
                name: 'services',
                label: 'Services',
                isMulti: true,
                dependency: 'none',
                labelName: 'name',
                valueName: '_id',
                endpoint: 'data',
                route: '/services/getAll',
                errorMessage: 'Please select services',
                placeholder: 'Select services',
                value: []

            },
            {
                type: 'multiselect',
                name: 'animalPreference',
                label: 'Animal Preference',
                isMulti: true,
                errorMessage: 'Please select animal preference',
                options: [
                    { label: 'Dog', value: 'Dog' },
                    { label: 'Cat', value: 'Cat' }
                ],
            },
            {
                type: 'number',
                name: 'consultationFee',
                label: 'Consultation Fee',
                min: 1,
                max: 100,
                regex: /^(100|[1-9][0-9]?)$/,
                errorMessage: 'Please enter consultation fee (max 100)',
            },
            {
                type: 'textarea',
                name: 'bio',
                label: 'Bio',
                errorMessage: 'Please enter bio',
            },
        ],
    });


    useEffect(() => {
        let pageInfo = {
            link: '/',
            title: `Add Vet`
        }
        if (id) {
            setFormConfig(prev => ({
                ...prev,
                name: "Edit Vet",
                getApi: `/doctor/details/${id}`,
                updateApi: `/doctor/profile/update/${id}`,
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