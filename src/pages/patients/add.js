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
        name: "Add User",
        redirect: "/patients/list/1",
        fields: [
            // Owner Details
            {
                type: 'text',
                name: 'ownerName',
                label: 'Owner Name',
                errorMessage: 'Please enter owner name',
                value: '',
            },
            {
                type: 'select',
                name: 'ownerGender',
                label: 'Owner Gender',
                errorMessage: 'Please select owner gender',
                options: [
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' },
                    { label: 'Other', value: 'Other' },
                ],
            },
            {
                type: 'datepicker',
                name: 'ownerDob',
                label: 'Owner Date of Birth',
                showYearDropdown: true,
                showMonthDropdown: true,
                errorMessage: 'Please enter owner date of birth',
                value: '',
            },
            {
                type: 'array',
                name: 'ownerImage',
                label: 'Owner Images',
                errorMessage: 'Please upload owner images',
                value: [],
                fields: [
                    {
                        type: 'file',
                        name: 'image',
                        label: 'Image',
                        isArray: true,
                        errorMessage: 'Please upload image',
                        value: '',
                    }
                ]
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
            // Pet Details
            {
                type: 'text',
                name: 'name',
                label: 'Pet Name',
                errorMessage: 'Please enter pet name',
                value: '',
            },
            {
                type: 'text',
                name: 'age',
                label: 'Pet Age',
                errorMessage: 'Please enter pet age',
                value: '',
            },
            // {
            //     type: 'select',
            //     name: 'petType',
            //     label: 'Pet Type',
            //     errorMessage: 'Please enter pet type',
            //     value: '',
            //     options: [], // will be loaded dynamically
            //     isDynamic: true,
            //     onLoadOptions: async () => {
            //         // fetch pet types from API
            //         const res = await common.get('/pet/types');
            //         return res?.data?.types?.map(type => ({ label: type.name, value: type._id }));
            //     }
            // },

            {
                type: 'multiselect',
                name: 'petType',
                label: 'Pet Type',
                isMulti: false,
                dependency: 'none',
                labelName: 'name',
                valueName: '_id',
                endpoint: 'data',
                route: '/services/getAll',
                errorMessage: 'Please select pet type',
                placeholder: 'Select pet type',
                value: []

            },
            {
                type: 'multiselect',
                name: 'breed',
                label: 'Breed',
                isMulti: false,
                dependency: 'petType',
                labelName: 'name',
                valueName: '_id',
                endpoint: 'data',
                route: '/services/getAll',
                errorMessage: 'Please select breed',
                placeholder: 'Select breed',
                value: []

            },
            {
                type: 'multiselect',
                name: 'color',
                label: 'Color',
                isMulti: false,
                dependency: 'none',
                labelName: 'name',
                valueName: '_id',
                endpoint: 'data',
                route: '/services/getAll',
                errorMessage: 'Please select color',
                placeholder: 'Select color',
                value: []

            },
            {
                type: 'select',
                name: 'gender',
                label: 'Pet Gender',
                errorMessage: 'Please select pet gender',
                options: [
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' },
                    { label: 'Other', value: 'Other' },
                ],
            },
            {
                type: 'text',
                name: 'interestFor',
                label: 'Interest For',
                errorMessage: 'Please enter interest for',
                value: '',
            },
            {
                type: 'text',
                name: 'reasonToFind',
                label: 'Reason To Find',
                errorMessage: 'Please enter reason to find',
                value: '',
                isArray: true,
            },
            {
                type: 'number',
                name: 'weight',
                label: 'Weight',
                errorMessage: 'Please enter weight',
                value: '',
            },
            {
                type: 'text',
                name: 'activityLevel',
                label: 'Activity Level',
                errorMessage: 'Please enter activity level',
                value: '',
            },
            {
                type: 'text',
                name: 'dietaryPreference',
                label: 'Dietary Preference',
                errorMessage: 'Please enter dietary preference',
                value: '',
            },
            {
                type: 'text',
                name: 'trainingBehaviour',
                label: 'Training Behaviour',
                errorMessage: 'Please enter training behaviour',
                value: '',
            },
            {
                type: 'text',
                name: 'outdoorHabits',
                label: 'Outdoor Habits',
                errorMessage: 'Please enter outdoor habits',
                value: '',
            },
            {
                type: 'array',
                name: 'petImages',
                label: 'Pet Images',
                errorMessage: 'Please upload pet images',
                value: [],
                fields: [
                    {
                        type: 'file',
                        name: 'image',
                        label: 'Image',
                        errorMessage: 'Please upload image',
                        value: '',
                    }
                ]
            },
        ],
    });


    useEffect(() => {
        let pageInfo = {
            link: '/',
            title: `Add User`
        }
        if (id) {
            pageInfo = {
                link: '/patients/list/1',
                title: `Edit User`
            }
            setFormConfig(prev => ({
                ...prev,
                name: "Edit User",
                getApi: `/patient/profile/${id}`,
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