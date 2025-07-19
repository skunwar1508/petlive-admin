import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from '../../context/theme';
import FormBlock from '../../components/form/FormBlock';
import common from '../../services/common';
import ReactSelect from 'react-select';
import { ErrorMessage } from '../../components/formik/errorMessage';
import { useFormik } from "formik";
import * as Yup from "yup";
import Loader from '../../components/loader/loader';


const Add = () => {
    const { setBreadcrumbs } = useContext(UserContext);
    let { type } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [formConfig, setFormConfig] = useState({
        name: "Add Specialization",
        redirect: "/specialization/primary/list/1",
        postApi: `/admin/specialization`,
        fields: [
            {
                type: 'select',
                name: 'type',
                label: 'Type',
                errorMessage: 'Please enter type',
                options: [
                    { label: 'Primary', value: 'primary' },
                    { label: 'Secondary', value: 'secondary' },
                ],
            },
            {
                type: 'text',
                name: 'title',
                label: 'Title',
                errorMessage: 'Please enter title',
            },
        ],
    });


    useEffect(() => {
        let pageInfo = {
            link: '/',
            title: `Add ${common.capitalizeWord(type)} Specialization`,
        }
        if (type == 'secondary') {
            // pageInfo.title = `Edit ${common.capitalizeWord(type)} Specialization`;
            setFormConfig(prev => ({
                ...prev,
                // name: `Edit ${common.capitalizeWord(type)} Specialization`,
                fields: prev.fields.map(field => {
                    if (field.name === 'type') {
                        field.value = type;
                        console.log(field);
                        field.disabled = true;
                    }
                    return field;
                }),
                redirect: `/specialization/${type}/list/1`,
            }));
            setIsLoaded(true);
        }
        if (type == 'primary') {
            // pageInfo.title = `Edit ${common.capitalizeWord(type)} Specialization`;
            setFormConfig(prev => ({
                ...prev,
                // name: `Edit ${common.capitalizeWord(type)} Specialization`,
                fields: prev.fields.map(field => {
                    if (field.name === 'type') {
                        field.value = type;
                        console.log(field);
                        field.disabled = true;
                    }
                    return field;
                }),
                redirect: `/specialization/${type}/list/1`,
            }));
            setIsLoaded(true);
        }
        setBreadcrumbs(pageInfo)
    }, [type]);



    return (
        <div className='card'>
            {isLoaded && isLoaded ? (
                <FormBlock {...formConfig}
                    inlineForm={true}
                    className={'card-body Profileformban bank-detailsForm'}
                ></FormBlock>

            ) : (
                <Loader />
            )}
        </div>
    )
}

export default Add;