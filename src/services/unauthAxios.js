import axios from "axios";
import ROOT_URL from "./api-url";


const UnauthAxios = axios.create({
    baseURL:ROOT_URL
});


export default UnauthAxios;