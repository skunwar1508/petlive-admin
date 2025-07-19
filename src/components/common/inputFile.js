import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import common from "../../services/common";
import { ErrorMessage } from "../formik/errorMessage";

const InputFile = (props) => {
    const { onChange, imagePrivew, mimeType, iconShow } = props;
    const [image, setImage] = useState("");
    const imageFormik = useFormik({
        initialValues: {
            userImage: "",
        },
        validationSchema: Yup.object().shape({
            userImage: common.imageValidate({ extention: mimeType || ["image/jpg", "image/jpeg", "image/png"] }),
        }),
        onSubmit: async (values) => {
            await common.uploadImage(values).then((res) => onChange(res));
        },
    });
    const handleImageChange = async (e) => {
        const imageFile = e?.target?.files[0];
        await imageFormik.setFieldValue("userImage", imageFile);
        await imageFormik.handleSubmit();
    };

    const updateimage = (id) => {
        common.getImage(id).then((data) => {
            setImage(data);
        });
    };
    useEffect(() => {
        if (imagePrivew) {
            updateimage(imagePrivew);
        }
    }, [imagePrivew]);
    return (
        <>
            <div className="imagegroup d-flex">
                <div className="previewImge">
                    {!imageFormik.errors.userImage && imageFormik.values.userImage ? (
                        <a href={`${common.previewURL(imageFormik.values.userImage)}`} target="_blank">
                            <img src={`${iconShow ? iconShow : common.previewURL(imageFormik.values.userImage)}`} className="img-fluid" />
                        </a>
                    ) : (
                        <a href={`${image ? image?.path : "/assets/images/default-image.png"}`} target="_blank">
                            <img src={`${image?.path ? (iconShow ? iconShow : image?.path) : "/assets/images/default-image.png"}`} className="img-fluid" />
                        </a>
                    )}
                </div>
                <div className="inputGroup">
                    <input type="file" onChange={(e) => handleImageChange(e)} className="form-control" />
                </div>
            </div>
            <ErrorMessage formik={imageFormik} name="userImage" />
        </>
    );
};

export default InputFile;
