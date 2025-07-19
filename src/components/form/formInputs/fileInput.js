import React, { memo, useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import common from '../../../services/common';
import { toast } from 'react-toastify';

const FileInput = memo((props) => {
    const {
        label,
        formik,
        name,
        className = 'form-control',
        disabled = false,
        readOnly = false,
        required = false,
        inlineForm = false,
        iconShow,
        value,
    } = props;

    const inputRef = useRef(null);
    const [image, setImage] = useState('');
    const { getFieldProps, touched, errors } = formik;

    // Formik instance for image handling
    const imageFormik = useFormik({
        initialValues: {
            userImage: '',
        },
        validationSchema: Yup.object().shape({
            userImage: common.imageValidate({ extention: ['image/jpg', 'image/jpeg', 'image/png'] }),
        }),
        onSubmit: async (values) => {
            try {
                const res = await common.uploadImage(values);
                formik.setFieldValue(name, res);
            } catch (error) {
                toast.error('Failed to upload image');
            }
        },
    });

    // Handle image change
    const handleImageChange = useCallback(async (e) => {
        const imageFile = e?.target?.files[0];
        if (!imageFile) return;

        await imageFormik.setFieldValue('userImage', imageFile);
        const validationErrors = await imageFormik.validateForm();

        if (!validationErrors?.userImage) {
            imageFormik.handleSubmit();
        } else {
            toast.error(validationErrors.userImage);
            imageFormik.setFieldTouched('userImage', true);
            imageFormik.resetForm();
            formik.setFieldValue(name, '');
            inputRef.current.value = '';
            setImage('');
        }
    }, [imageFormik, formik, name]);

    // Fetch and update image
    const updateImage = useCallback(async (id) => {
        try {
            const data = await common.getImage(id);
            setImage(data);
        } catch (error) {
            toast.error('Failed to fetch image');
        }
    }, []);

    useEffect(() => {
        // Ensure all dependencies are valid
        if (!value || !updateImage || !imageFormik || !formik || !name) return;

        // Handle image updates
        const handleImageUpdate = async () => {
            try {
                if (value) {
                    await updateImage(value);
                } else {
                    setImage(null);
                    imageFormik.setFieldValue('userImage', '');
                    formik.setFieldValue(name, '');
                    if (inputRef.current) {
                        inputRef.current.value = '';
                    }
                }
            } catch (error) {
                console.error('Error updating image:', error);
            }
        };

        handleImageUpdate();
    }, [value, updateImage]); // Removed unnecessary dependencies to prevent re-renders

    return (
        <div className='row'>
            <div className={`${inlineForm ? 'col-lg-3' : 'col-lg-12'}`}>
                {/* Label */}
                {label && (
                    <label>
                        {label} {required && <span className='mandatory'>*</span>}
                    </label>
                )}
            </div>
            <div className={`${inlineForm ? 'col-lg-9' : 'col-lg-12'}`}>
                <div className='imagegroup d-flex'>
                    {/* Image Preview */}
                    <div className='previewImge'>
                        {!imageFormik.errors.userImage && imageFormik.values.userImage ? (
                            <a href={common.previewURL(imageFormik.values.userImage)} target="_blank" rel="noopener noreferrer">
                                <img src={iconShow || common.previewURL(imageFormik.values.userImage)} className="img-fluid" alt="Preview" />
                            </a>
                        ) : (
                            <a href={image?.path || '/assets/images/default-image.png'} target="_blank" rel="noopener noreferrer ">
                                <img src={image?.path || '/assets/images/default-image.png'} className="img-fluid" alt="Preview" />
                            </a>
                        )}
                    </div>
                    <div className='inputGroup'>
                        <input 
                            type="file" 
                            className={className}
                            disabled={disabled}
                            readOnly={readOnly}
                            onChange={handleImageChange} 
                            ref={inputRef} 
                            aria-label={label}
                        />
                    </div>
                </div>

                {/* Display Validation Error */}
                {touched[name] && errors[name] && (
                    <div className='text-danger'>{errors[name]}</div>
                )}
            </div>
        </div>
    );
});



export default FileInput;