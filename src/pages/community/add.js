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
        name: "Add Community",
        redirect: "/community/list/1",
        postApi: `/community/add`,
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
                errorMessage: 'Please choose image',
            },
            {
                type: 'text',
                name: 'description',
                label: 'Description',
                errorMessage: 'Please enter description',
            }
        ],
    });


    useEffect(() => {
        let pageInfo = {
            link: '/',
            title: `Add Community`,
        }
        if (id) {
            pageInfo.title = `Edit Community`;
            setFormConfig(prev => ({
                ...prev,
                name: `Edit Community`,
                getApi: `/community/get/${id}`,
                updateApi: `/community/update/${id}`,
                redirect: `/community/list/1`,
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