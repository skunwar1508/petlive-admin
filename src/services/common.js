import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import * as Yup from "yup";
import apiFunc from "./api";
import millify from "millify";
import authAxios from "./authAxios";
import moment from "moment";

const common = {
  milifying: (milifyData) => {
    return millify(milifyData, {
      units: ["", "K", "M", "B", "T", "P", "E"],
      space: true,
    });
  },
  loader: (type) => {
    if (type) {
      document.body.className = "loading_page";
    } else {
      document.body.className = document.body.className.replace(
        "loading_page",
        ""
      );
    }
  },
  base64Mime: (encoded) => {
    var result = null;
    if (typeof encoded !== "string") {
      return result;
    }
    var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    if (mime && mime.length) {
      result = mime[1];
    }
    return result;
  },
  base64ReadFile: (base64String) => {
    var nonBlob = base64String == undefined ? 0 : base64String.length;
    var filetype = common.base64Mime(base64String);
    var datass = { size: nonBlob / 1000, type: filetype };
    return datass;
  },
  previewURL: (file) => {
    let URL = "";
    if (file != "") {
      URL = window.URL.createObjectURL(file);
    }
    return URL;
  },
  trim: (d) => {
    if (d == undefined || d == null || d == "") {
      return;
    }
    return d.replace(/(<([^>]+)>)/gi, "");
  },
  mineTypeValidate: (value) => {
    if (value == undefined || value == null) {
      return false;
    }
    let fileType = value.type;
    return (
      value &&
      (fileType === "image/jpeg" ||
        fileType === "image/bmp" ||
        fileType === "image/png") /* ||
      fileType === 'application/pdf' ||
      fileType === "application/msword" */
    );
  },
  fileSizeValidate: (value, size) => {
    if (value == undefined || value == null) {
      return false;
    }
    let fileSize = value.size;
    if (!fileSize) {
      fileSize = 2;
    }
    let mb = fileSize * 1024;
    return fileSize <= mb;
  },
  getMiles: (i) => {
    return (i * 0.000621371192).toFixed(1);
  },
  coupanTypeDiscount: (obj) => {
    let ctype = obj.couponType || 0;
    let price = obj.price || 0;
    let discount = obj.discount || 0;
    let minAmount = obj.minAmount || 0;
    let disUpto = obj.disUpto || 0;
    let disRate = 0;
    if (ctype == "FLAT PERCENT") {
      disRate = price >= minAmount ? (price * discount) / 100 : disRate;
    } else if (ctype == "FLAT PERCENT UPTO") {
      disRate = price >= minAmount ? (price * discount) / 100 : disRate;
      disRate = disRate <= disUpto ? disRate : disUpto;
      // console.log("FLAT PERCENT UPTO", disRate);
    } else if (ctype == "CASH DISCOUNT UPTO") {
      disRate = price >= minAmount ? discount : disRate;
      disRate = disRate <= disUpto ? disRate : disUpto;
      // console.log("CASH DISCOUNT UPTO", disRate);
    }
    return parseFloat(disRate.toFixed(2));
  },
  isMobile: (num) => {
    var isphone =
      /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(num);
    return isphone;
  },
  coordinateLocal: async () => {
    let coordataL;
    function asignData(data) {
      coordataL = data;
    }
    await navigator.geolocation.getCurrentPosition(function (position) {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      let jsonCoords = {
        lat: lat,
        lng: lng,
      };
      jsonCoords = JSON.stringify(jsonCoords);
      asignData(jsonCoords);
      localStorage.setItem("geoLocal", jsonCoords);
      // console.log('coordataL', localStorage.getItem('geoLocal'))
      // reactLocalStorage.set('geoLocal', jsonCoords);
    });
    return coordataL;
  },
  creditCardType: (cardType) => {
    let imageUrl;
    cardType = cardType.toLowerCase();
    switch (cardType) {
      case "visa":
        imageUrl = "card-logo-visa.svg";
        break;
      case "mastercard":
        imageUrl = "card-logo-mastercard.svg";
        break;
      case "american-express":
        imageUrl = "card-logo-amex.svg";
        break;
      default:
        imageUrl = "card-logo-unknown.svg";
    }
    return imageUrl;
  },
  imageValidate: ({ extention, size, msg }) => {
    extention = extention || [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/gif",
    ];
    msg = msg || "You need to attach image";
    size = size || 100 * 1024 * 1024;
    let image = Yup.mixed()
      .required(msg)
      .test("fileSize", "The image is too large", (value) => {
        if (value == undefined || value == null) {
          return false;
        }
        return value && value?.size <= size;
      })
      .test(
        "type",
        `Only the following formats are accepted: ${extention?.join(", ")}`,
        (value) => {
          if (value == undefined || value == null) {
            return false;
          }
          let fileType = value.type;
          return value && extention.indexOf(fileType) != -1;
        }
      );
    return image;
  },
  uploadImage: async (values, allResponse) => {
    //console.log("values",values)
    let data;
    common.loader(true);
    const formData = new FormData();
    formData.append("coverImage", values.userImage);
    data = await apiFunc
      .postUpload(formData)
      .then((res) => {
        if (allResponse) {
          return res;
        } else {
          return res.data.data._id;
        }
      })
      .catch((error) => {
        common.error(error);
      });
    common.loader(false);
    return data;
  },
  error: (error) => {
    var message = JSON.parse(error.request.response).message;

    toast.error(message);
    return message;
  },

  generateQOID: async () => {
    let resData = null;
    resData = await apiFunc
      .getOptionId()
      .then((res) => {
        return res.data.data;
      })
      .catch((error) => {
        common.error(error);
      });

    return resData;
  },
  bufferToBase64: (arr) => {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    let buffer = btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
    return "data:image/png;base64," + buffer;
  },

  getImage: async (id) => {
    if (id) {
      let data;
      data = await authAxios({
        method: "GET",
        url: `/media/download/${id}`,
      })
        .then((res) => {
          return res?.data?.data || "";
        })
        .catch((error) => {
          console.log(error);
          // common.error(error);
        });
      return data;
    }
  },
  aadharValidate: (num) => {
    let regexp = /^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;
    return regexp.test(num);
  },
  isAlphabet: (event) => {
    // console.log(event)
    return (
      (event.charCode >= 65 && event.charCode <= 90) ||
      (event.charCode >= 97 && event.charCode <= 122)
    );
  },

  inpAlphabet: (e) => {
    let realphate = e.replace(/[^A-Za-z\s]/gi, "");
    return realphate;
  },

  alphaNumber: (e) => {
    // console.log(e)
    let alprealphate = e.replace(/[^\w\s]/gi, "");
    return alprealphate;
  },
  getFirstLetter: (str) => {
    if (str) {
      let matches = str.match(/\b(\w)/g);
      let strJoin = matches.join("");
      let letters = strJoin.charAt(0);
      let letters2 = strJoin.charAt(1);
      return letters + letters2;
    }
  },
  getFilter: () => {
    const params = new URLSearchParams(window.location.search);
    let page = params.get("page");
    let searchString = params.get("searchString");
    let newPostData = {};
    newPostData.page = page || 1;
    newPostData.perPage = common.perPageData();
    newPostData.searchString = searchString || "";
    return newPostData;
  },
  getFilterFlag: () => {
    const params = new URLSearchParams(window.location.search);
    let page = params.get("page");
    let searchString = params.get("searchString");
    let communityId = params.get("communityId");
    let communityPostId = params.get("communityPostId");
    let flaggedBy = params.get("flaggedBy");
    let flaggedByRole = params.get("flaggedByRole");
    let newPostData = {};
    newPostData.page = page || 1;
    newPostData.perPage = common.perPageData();
    newPostData.searchString = searchString || "";
    newPostData.communityId = communityId || "";
    newPostData.communityPostId = communityPostId || "";
    newPostData.flaggedBy = flaggedBy || "";
    newPostData.flaggedByRole = flaggedByRole || "";
    return newPostData;
  },
  getFilterAppointment: () => {
    const params = new URLSearchParams(window.location.search);
    let page = params.get("page");
    let searchString = params.get("searchString");
    let status = params.get("status");
    let newPostData = {};
    newPostData.page = page || 1;
    newPostData.perPage = common.perPageData();
    newPostData.searchString = searchString || "";
    newPostData.status = status || "";
    return newPostData;
  },


  getArticleFilter: () => {
    const params = new URLSearchParams(window.location.search);
    let page = params.get("page");
    let searchString = params.get("searchString");
    let articleStatus = params.get("articleStatus");
    let newPostData = {};
    newPostData.page = page || 1;
    newPostData.perPage = common.perPageData();
    newPostData.searchString = searchString || "";
    newPostData.articleStatus = articleStatus || "";
    return newPostData;
  },
  getProviderFilter: () => {
    const params = new URLSearchParams(window.location.search);
    let page = params.get("page");
    let searchString = params.get("searchString");
    let profileStatus = params.get("profileStatus");
    let specialization = params.get("specialization");
    let verificationStatus = params.get("verificationStatus");
    let newPostData = {};
    newPostData.page = page || 1;
    newPostData.perPage = common.perPageData();
    newPostData.searchString = searchString || "";
    newPostData.profileStatus = profileStatus || "";
    newPostData.specialization = specialization || "";
    newPostData.verificationStatus = verificationStatus || "";
    return newPostData;
  },
  getPatientFilter: () => {
    const params = new URLSearchParams(window.location.search);
    let page = params.get("page");
    let searchString = params.get("searchString");
    let profileStatus = params.get("profileStatus");
    let currentProvider = params.get("currentProvider");
    let newPostData = {};
    newPostData.page = page || 1;
    newPostData.perPage = common.perPageData();
    newPostData.searchString = searchString || "";
    newPostData.profileStatus = profileStatus || "";
    newPostData.currentProvider = currentProvider || "";
    return newPostData;
  },
  prescriptionFilter: () => {
    const params = new URLSearchParams(window.location.search);
    let page = params.get("page");
    let searchString = params.get("searchString");
    let patientId = params.get("patientId");
    let providerId = params.get("providerId");
    
    let newPostData = {};
    newPostData.page = page || 1;
    newPostData.perPage = common.perPageData();
    newPostData.searchString = searchString || "";
    newPostData.patientId = patientId || "";
    newPostData.providerId = providerId || "";
    return newPostData;
  },

  dateFormate: (formate, date) => {
    let newdate = moment(date).format(formate || "YYYY-MM-DD");
    return newdate;
  },
  rangMinDate: (date) => {
    if (date) {
      let newdate = new Date(date);
      return newdate;
    } else {
      return new Date("1947-08-15");
    }
  },
  rangMaxDate: (date) => {
    if (date) {
      let newdate = new Date(date);
      return newdate;
    } else {
      return new Date();
    }
  },

  perPageData: () => {
    return 50;
  },
  isPrice: (val) => {
    val = val.replace(/[^0-9\.]/g, "");
    let spiltData = val?.split(".");

    if (spiltData?.length > 2) {
      val = val?.replace(/\.+$/, "");
    }
    if (spiltData[1]?.length > 2) {
      val = Number(val?.toString()?.slice(0, -1));
    }
    return val;
  },

  capitalizeWord: (str) => {
    let splitStr = str?.toLowerCase()?.split(" ");
    for (let i = 0; i < splitStr?.length; i++) {
      splitStr[i] =
        splitStr[i]?.charAt(0)?.toUpperCase() + splitStr[i]?.substring(1);
    }
    return splitStr?.join(" ");
  },

  removeLable: (data) => {
    let temp = [];
    data?.map((val) => temp.push(val?.value));
    return temp;
  },

  checkSelected: (catid, ids, key) => {
    let check = true;
    catid?.map((value, id) => {
      if (value?.category == ids) {
        if (key != id) {
          check = false;
        }
      }
    });
    return check;
  },

  modifyAccordingSelect: (data, subCategory) => {
    // console.log("data", data)
    // console.log("subCategorysubCategorysubCategory", subCategory)
    let temp = [];
    data?.map((d) => {
      subCategory?.map((s) => {
        if (s.value == d) {
          temp.push(s);
        }
      });
    });
    return temp;
  },

  checkEndDate: (startdate, enddate) => {
    let temp = false;
    if (enddate) {
      return (temp =
        new Date(startdate)?.getTime() > new Date(enddate)?.getTime());
    } else {
      return temp;
    }
  },
  getOrderStatus: (status) => {
    let newStatus = "";
    status == 1 && (newStatus = "Order Request");
    status == 2 && (newStatus = "Pending");
    status == 3 && (newStatus = "In Transit");
    status == 4 && (newStatus = "Delivered");
    status == 5 && (newStatus = "Cancelled By Customer");
    status == 6 && (newStatus = "Cancelled By Vendor");
    status == 7 && (newStatus = "Return Request");
    status == 8 && (newStatus = "Item Dispatched by Customer");
    status == 9 && (newStatus = "Item Dispatched by Vendor");
    status == 10 && (newStatus = "Refund Provided");
    return newStatus;
  },
  getOrderClass: (status) => {
    let newStatus = "";
    status == 1 && (newStatus = "btn-request");
    status == 2 && (newStatus = "btn-pending");
    status == 3 && (newStatus = "btn-in-transit");
    status == 4 && (newStatus = "btn-delivered");
    status == 5 && (newStatus = "btn-cancelled");
    status == 6 && (newStatus = "btn-cancelled");
    status == 7 && (newStatus = "btn-return-request");
    status == 8 && (newStatus = "btn-dispatched");
    status == 9 && (newStatus = "btn-received");
    status == 10 && (newStatus = "btn-refunded");
    return newStatus;
  },
  positionLable: (value) => {
    if (value == 1) return "Top";
    if (value == 2) return "Middle";
    if (value == 3) return "Bottom";
  },
  replaceNumber: (e) => {
    let value = e?.target?.value;
    if (value) {
      return value?.replace(/\D/g, "");
    }
    return "";
  },
};

export default common;
