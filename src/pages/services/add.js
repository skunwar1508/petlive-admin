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
        name: "Add Services",
        redirect: "/services/list/1",
        postApi: `/services/create`,
        fields: [
            {
                type: 'text',
                name: 'name',
                label: 'Name',
                errorMessage: 'Please enter name',
            },
            {
                type: 'file',
                name: 'image',
                label: 'Image',
                errorMessage: 'Please upload image',
            },
            {
                type: 'number',
                min:1,
                max:100000,
                name: 'price',
                label: 'Price',
                errorMessage: 'Please enter price',
            },
            {
                type: 'number',
                min:1,
                name: 'time',
                label: 'Time',
                errorMessage: 'Please enter time',
            },
            {
                type: 'editor',
                name: 'description',
                label: 'Description',
                errorMessage: 'Please enter description',
            },
        ],
    });


    useEffect(() => {
        let pageInfo = {
            link: '/',
            title: `Add  Services`,
        }
        if (id) {
            pageInfo.title = `Edit  Services`;
            setFormConfig(prev => ({
                ...prev,
                name: `Edit Services`,
                getApi: `/services/getById/${id}`,
                updateApi: `/services/update/${id}`,
                redirect: `/services/list/1`,
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