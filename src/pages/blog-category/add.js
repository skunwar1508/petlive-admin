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
        name: "Add Blog Category",
        redirect: "/blog/category/list/1",
        postApi: `/blog/category/create`,
        fields: [
            {
                type: 'text',
                name: 'name',
                label: 'Name',
                errorMessage: 'Please enter name',
            },
            {
                type: 'textarea',
                name: 'description',
                label: 'Description',
                errorMessage: 'Please enter description',
            },
            {
                type:'object',
                name:'meta',
                label:'Meta Information',
                fields: [
                    {
                        type: 'text',
                        name: 'title',
                        label: 'Meta Title',
                        errorMessage: 'Please enter meta title',
                    },
                    {
                        type: 'textarea',
                        name: 'description',
                        label: 'Meta Description',
                        errorMessage: 'Please enter meta description',
                    },
                    {
                        type: 'text',
                        name: 'keywords',
                        label: 'Meta Keywords',
                        placeholder: 'comma separated keywords',
                        errorMessage: 'Please enter meta keywords',
                    },
                ]
            },
        ],
    });

    useEffect(() => {
        let pageInfo = {
            link: '/',
            title: `Add Blog Category`,
        }
        if (id) {
            pageInfo.title = `Edit Blog Category`;
            setFormConfig(prev => ({
                ...prev,
                name: `Edit Blog Category`,
                getApi: `/blog/category/get/${id}`,
                updateApi: `/blog/category/update/${id}`,
                redirect: `/blog/category/list/1`,
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