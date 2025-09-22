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
    const [isLoaded, setIsLoaded] = useState(true);
    const {id} = useParams();
    const [formConfig, setFormConfig] = useState({
        name: "Create Blog",
        redirect: "/blog/list/1",
        postApi: `/blog/create`,
        fields: [
            {
                type: 'text',
                name: 'title',
                label: 'Title',
                errorMessage: 'Please enter title',
            },
            {
                type: 'file',
                name: 'coverImage',
                label: 'Image',
                errorMessage: 'Please choose image',
            },
            {
                type: 'editor',
                name: 'content',
                label: 'Content',
                errorMessage: 'Please enter content',
            },
            {
                type: 'select',
                name: 'published',
                label: 'Published',
                options: [
                    { value: true, label: 'Published' },
                    { value: false, label: 'Draft' },
                ],
                errorMessage: 'Please select status',
            },
            {
                type: 'select',
                name: 'isActive',
                label: 'Status',
                options: [
                    { value: true, label: 'Active' },
                    { value: false, label: 'Inactive' },
                ],
                errorMessage: 'Please select status',
            },
            {
                type: 'select',
                name: 'isFeatured',
                label: 'Featured (on homepage)',
                options: [
                    { value: true, label: 'Yes' },
                    { value: false, label: 'No' },
                ],
                errorMessage: 'Please select status',
            }
        ],
    });


    useEffect(() => {
        let pageInfo = {
            link: '/',
            title: `Create Blog`,
        }
        if (id) {
            pageInfo.title = `Edit Blog`;
            setFormConfig(prev => ({
                ...prev,
                name: `Edit Blog`,
                getApi: `/blog/get/${id}`,
                updateApi: `/blog/update/${id}`,
                redirect: `/blog/list/1`,
            }));
            setIsLoaded(true);
        }
        setBreadcrumbs(pageInfo)
    }, [id]);

    

    return (
        <div className='card'>
            {isLoaded ? (
                <FormBlock {...formConfig}
                    inlineForm={true}
                    className={'card-body Profileformban bank-detailsForm'}
                ></FormBlock>

            ): (
                <Loader />
            )}
        </div>
    )
}

export default Add;