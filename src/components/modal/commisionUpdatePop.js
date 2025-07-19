import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import common from "../../services/common";
import authAxios from "../../services/authAxios";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from 'formik';

const CommisionUpdatePop = ({ show, onClose, data }) => {

  const initialValues = {
    inputValue : "",
  };

  const validationSchema = Yup.object({
    inputValue: Yup.string().matches(/^(100(\.0{1,2})?|[0-9]{1,2}(\.\d{1,2})?)$/, 'Enter a value between 0 and 100 (up to 2 decimals)').required('Enter Commission'),
  }); 

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      
      common.loader(true);
        await authAxios({
        method: 'POST',
        url: `/doctor/provider/update/${data?._id}`,
        data: {
          "commision" : values.inputValue
          },
        })
        .then((res) => {
            toast.success(res?.data?.message)
            onClose()
        })
        .catch((error) => {
            console.log(error);
            common.error(error);
        });
        common.loader(false);
        
    }
  });

    // ---- set current commision value
    useEffect(() => {
      formik.setFieldValue("inputValue", data?.adminCommission ?? "")
    }, [data])

  return (
    <>
        <>
        <Modal show={show} onHide={onClose} centered>
      <Modal.Header >
        <Modal.Title>Commission Update for - {data.firstName} {data.lastName} </Modal.Title>
      </Modal.Header>

      <Modal.Body>
          {/* <div className="form-control"> */}
            <span> Commission </span>
            <input 
              type="text" 
              {...formik.getFieldProps("inputValue")} 
              placeholder="Enter Commission"
              className="form-control"
            />
            {formik.touched.inputValue && formik.errors.inputValue ? (
              <div className='text-danger'>
                  {formik.errors.inputValue}
              </div>
            ) : null}
          {/* </div> */}
      </Modal.Body> 
      <Modal.Footer>
          <div className="confirm-box__actions">
            <Button role="confirmable-button" className=" "  onClick={formik.handleSubmit} >Submit</Button>
            <Button role="cancellable-button" className=" " onClick={onClose}>Cancel</Button>
          </div>
      </Modal.Footer>
    </Modal>
        </>
    </>
  );
};

export default CommisionUpdatePop;
