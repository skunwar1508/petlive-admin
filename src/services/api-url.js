let ROOT_URL = "";
let BASE_URL = "";
let socketConnectionURL = "";
// console.log(process.env.REACT_APP_SERVER);
if (process.env.REACT_APP_SERVER?.trim() == "production") {
  ROOT_URL = "http://staging.alphonic.net.in:5656/api/v1";
  BASE_URL = "http://staging.alphonic.net.in:5656/api/v1";
} else {
  ROOT_URL = "http://staging.alphonic.net.in:5656/api/v1";
  BASE_URL = "http://staging.alphonic.net.in:5656/api/v1";
}
  // ROOT_URL = "http://localhost:5656/api/v1";
  // BASE_URL = "http://localhost:5656/api/v1";
export { BASE_URL, socketConnectionURL }
export default ROOT_URL;