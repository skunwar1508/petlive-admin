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
        name: "Add Breed",
        redirect: "/breed/list/1",
        postApi: `/subcategory/create`,
        fields: [
            {
                type:'multiselect',
                name: 'category',
                label: 'Category',
                errorMessage: 'Please select category',
                dependency:'none',
                route: '/category/getAll',
                valueName: '_id',
                labelName: 'name',
                isMulti: false,
            },
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
        ],
    });


    useEffect(() => {
        let pageInfo = {
            link: '/',
            title: `Add Breed`,
        }
        if (id) {
            pageInfo.title = `Edit Breed`;
            setFormConfig(prev => ({
                ...prev,
                name: `Edit Breed`,
                getApi: `/subcategory/getById/${id}`,
                updateApi: `/subcategory/update/${id}`,
                redirect: `/breed/list/1`,
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