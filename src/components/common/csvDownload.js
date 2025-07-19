import React, { useEffect, useState } from "react";
import authAxios from "../../services/authAxios";
import common from "../../services/common";
import { toast } from "react-toastify";
// import { CSVDownload, CSVLink } from "react-csv";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CsvDownload = (props) => {
  const [csvData, setCsvData] = useState([]);
  const { pageData, name, url, fileName, postData, method } = props;
  // console.log(postData);
  const getData = async () => {
    common.loader(true);
    return await authAxios({
      method: method ? method : "GET",
      url: `${url}`,
      data: postData
    })
      .then((res) => {
        // download_csv_file(res.data);
        // setCsvData(res.data);
        common.loader(false);
        return res?.data;
      })
      .catch((error) => {
        common.error(error);
        common.loader(false);
      });
  };
  // useEffect(() => {
  //   getData();
  // }, []);
  function download_csv_file(csvData) {
    console.log(csvData);
    console.log(encodeURI(csvData));
    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csvData);
    hiddenElement.target = "_blank";

    //provide the name for the CSV file to be downloaded
    hiddenElement.download = fileName || "list.csv";
    hiddenElement.click();
  }
  // console.log(pageData);
  return (
    <>
      <a
        className="csvBtn ml-2 btn-custom  btn-theme  btn-sm d-flex align-items-center cursor-pointer  "
        role="button"
        onClick={() => {
          getData().then((k) => {
            if (k?.message) {
              toast.warning(k?.message)
            } else {
              download_csv_file(k);
            }
          });
        }}
      >
        {/* <i className="far fa-file-excel"></i> {name || "CSV"} */}
        Export
      </a>
    </>
  );
};

const CsvImport = (props) => {
  const [csvData, setCsvData] = useState([]);
  const { pageData, name, url, fileName, postData, method, action } = props;
  const getData = async (formData) => {
    try {
      common.loader(true);
      const { data } = await authAxios({
        method: method ? method : "GET",
        url: `${url}`,
        data: formData,
      });
      console.log(data);
      toast.success(data?.message);
      if (action) {
        action();
      }
      common.loader(false);
    } catch (error) {
      console.log(error);
      common.loader(false);
    }
  };
  const imageFormik = useFormik({
    initialValues: {
      csv: "",
    },
    validationSchema: Yup.object().shape({
      csv: common.imageValidate({ extention: ["text/csv"] }),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("file", values.csv);
      // formData.append("vendorId", postData.vendorId);
      getData(formData);
    },
  });
  const handleImageChange = async (e) => {
    const imageFile = e?.target?.files[0];
    await imageFormik.setFieldValue("csv", imageFile);
    const { csv } = await imageFormik.validateForm();
    if (csv) {
      toast.warn(csv);
    } else {
      imageFormik.handleSubmit();
    }
  };

  // console.log(imageFormik.errors)
  return (
    <>
      <label
        className="csvBtn ml-2 mb-0 btn-custom  btn-theme  btn-sm d-flex align-items-center cursor-pointer  "
        role="button"
      >
        {/* <i className="far fa-file-excel"></i> {name || "CSV"} */}
        <input type="file" onChange={(e) => handleImageChange(e)} />
        <span>Import</span>
      </label>
    </>
  );
};

export { CsvImport };
export default CsvDownload;
