import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/theme';
import FormBlock from '../components/form/FormBlock';

// Define form configuration as a constant outside the component
const FORM_CONFIG = {
    postApi: '/admin/auth/chngpass',
    name: 'Change Password',
    redirect: '/change-password',
    fields: [
        {
            type: 'password',
            name: 'oldPassword',
            label: 'Old Password',
            errorMessage: 'Please enter old password',
            placeholder: 'Enter old password',
        },
        {
            type: 'password',
            name: 'password',
            label: 'Password',
            errorMessage: 'Please enter password',
            placeholder: 'Enter password',
        },
        {
            type: 'password',
            name: 'confirmPassword',
            label: 'Confirm Password',
            errorMessage: 'Please enter confirm password',
            placeholder: 'Enter confirm password',
        },
    ],
};

const AddEdit = () => {
    const { setBreadcrumbs } = useContext(UserContext);

    // Set breadcrumbs on component mount
    useEffect(() => {
        const pageInfo = {
            link: '/change-password',
            title: 'Change Password',
        };
        setBreadcrumbs(pageInfo);
    }, [setBreadcrumbs]);

    return (
        <div className="card">
            <FormBlock
                {...FORM_CONFIG}
                inlineForm={true}
                className="card-body Profileformban bank-detailsForm"
            />
        </div>
    );
};

export default AddEdit;