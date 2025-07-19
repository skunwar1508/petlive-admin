
import authAxios from "../services/authAxios";
import UnauthAxios from "../services/unauthAxios";
import ROOT_URL from "./api-url";

const apiFunc = {
  refreshToken: () =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/users/token/refresh`,
    }).catch((err) => {
      console.log(err);
    }),
    postUpload: (data) =>
    
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/media/upload`,
      data: data,
    }).catch((err) => {
      console.log(err);
    }),
    getImage: (id) =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/media/download-file/${id}`,
    }).catch((err) => {
      console.log(err);
    }),
    getCategory: () =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/category/getAllCategories`,
    }).catch((err) => {
      console.log(err);
    }),
   
    getSubCategory: () =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/category/getAllSubCategories`,
    }).catch((err) => {
      console.log(err);
    }),
    getSubCategoryById: (id) =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/subCategory/getSubCategoryByCategoryId/${id}`,
    }).catch((err) => {
      console.log(err);
    }),
    getExamsByCategoryId: (id) =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/exam/getExamsByCategoryId/${id}`,
    }).catch((err) => {
      console.log(err);
    }),
    getOptionId: () =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/question/generateId`,
    }).catch((err) => {
      console.log(err);
    }),
    searchQSN: (text) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/question/search`,
      data:text
    }).catch((err) => {
      console.log(err);
    }),
    searchTags: (text) =>
    authAxios({
      method: "GET",
      url: `${ROOT_URL}/tags/search/${text}`,
    }).catch((err) => {
      console.log(err);
    }),
    searchExam: (text) =>
    authAxios({
      method: "POST",
      url: `${ROOT_URL}/exam/search`,
      data:text
    }).catch((err) => {
      console.log(err);
    }),
    
    
};

export default apiFunc;
