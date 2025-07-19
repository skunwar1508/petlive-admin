import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import common from '../../../services/common';

const ProfileBanner = (props) => {
    const {name,label, formik, resAdmin} = props;

    useEffect(()=>{
        if(formik.values?.id){
            formik.setFieldValue(name, formik.values?.id)
        }
        
    },[formik.values])
    const imageFormik = useFormik({
        initialValues: {
           userImage: ''
        },
        validationSchema: Yup.object().shape({
           userImage: common.imageValidate({
              extention:['image/jpg', 'image/jpeg', 'image/png']
              
          })
        }),
        onSubmit: (values) => {
            // console.log(values)
           common.uploadImage(values).then((res) => formik.setFieldValue(name, res))
        //    setActive(false);
  
        },
     });
     const handleImageChange = async (e) => {
        const imageFile = e?.target?.files[0];
        await imageFormik.setFieldValue("userImage", imageFile);
        await imageFormik.handleSubmit();
     }
     
  return (
    <>
    
      <div className={`bannerimages`} style={imageFormik?.values?.userImage ? {backgroundImage:`url(${common.previewURL(imageFormik.values?.userImage)})`} :  {backgroundImage:`url(${resAdmin?.[name]?.path})`}}>
        {(resAdmin?.[name]?.path === '' && imageFormik?.values?.userImage === '') && (
        <div className='ProfilecenterWidgetLogo'>
            <img src={`assets/images/foodia1.png`} alt="Logo"/>
            <div className='bannertext'> 
                <span> + <br/>
                Upload cover picture <br/>
                (787*380)</span>
            </div>
        </div>
        ) }
       <div className='imageUpload'>
        <input  type="file" accept="image/png, image/jpeg" onChange={(e)=>handleImageChange(e)} />
            <img src='assets/images/edit.png' />
            </div>
       </div> 
 
    </> 
  )
}

export default ProfileBanner;






 