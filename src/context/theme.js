import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authAxios from "../services/authAxios";
// import Layout from "../layout/layout";
// import Login from "../pages/login";

export const UserContext = createContext();

// This context provider is passed to any component requiring the context
export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);
    const [Theme, setTheme] = useState("theme-1");
    const [ThemeColor, setThemeColor] = useState("theme-color-11");
    const [MiniSidebar, setMiniSidebar] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const [breadcrumbs, setBreadcrumbs] = useState({});
    const [counts, setCounts] = useState({});
    const [socket, setSocket] = useState({});
    const [notificationData, setNotificationData] = useState([])

    const reset = () => {
        setAuth(false);
        setSocket({})
        setUserInfo({});
        setCounts({});
        setBreadcrumbs({});
        setNotificationData([]);
        localStorage.clear();
        navigate("/");
    };

    function refreshtoken() {
        authAxios({
            method: "GET",
            url: `/admin/auth/refreshToken`,
        })
            .then((res) => {
                localStorage.setItem("token", res.data.token);
            })
            .catch((error) => {
                console.log(error);
                // reactLocalStorage.remove("token");
            });
    }
    function getProfile() {
        let adminId = localStorage.getItem("admin");
        authAxios({
            method: "GET",
            url: `/admins/profile`,
        })
            .then((res) => {
                setUserInfo(res?.data?.data || {});
            })
            .catch((error) => {
                console.log(error);
                // reactLocalStorage.remove("token");
            });
    }
    useEffect(() => {
        let intrVal;
        if (auth) {
            intrVal = setInterval(() => {
                // refreshtoken();
            }, 20000);
        }
        if (auth) {
            // getStoreCounts();
            // getProfile();
        }
        return () => clearInterval(intrVal);
    }, [auth]);
    useEffect(() => {
        /* let thm = localStorage.getItem('theme') || "theme-1";
    let thmClr = localStorage.getItem('themeColor'); */
        let authLocal = localStorage.getItem("token");
        /* setTheme(thm);
    setThemeColor(thmClr); */
        setAuth(authLocal);
    }, []);



    function checkPage(page, perpageData, totalCount, redirection, listing) {
        console.log(page, perpageData, totalCount, redirection)
        if (Number(page) > 1 && page) {
            page = Number(page) - 1
            perpageData = Number(perpageData)
            totalCount = Number(totalCount)

            if (((page * perpageData) + 1) == Number(totalCount)) {
                console.log("isndie navigation")
                navigate(redirection)
            } else {
                listing()
            }
        } else {
            listing()
        }
    }
    return (
        <UserContext.Provider
            value={{
                ThemeColor,
                Theme,
                auth,
                MiniSidebar,
                reset,
                counts,
                setCounts,
                socket, setSocket,
                setThemeColor,
                setTheme,
                setAuth,
                setMiniSidebar,
                userInfo,
                setUserInfo,
                breadcrumbs,
                setBreadcrumbs,
                notificationData, setNotificationData, checkPage
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
