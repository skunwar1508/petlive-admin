import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom"
import { UserContext } from "../../context/theme";
import 'iconify-icon';
import common from "../../services/common";



const DropDownMenu = (props) =>{
    const {children} = props ;
    // console.log(children)
    return(
        <>
            <div className="sidebarMenu">
                <ul className="metismenu">
                    {children}
                </ul>
            </div>
        </>
    )
}

const Dropdown = (props) =>{
    const { pathname } = useLocation();
    const [childMenu, setChildMenu] = useState(null)
    const {children, title, icon,iconifyIcon , img} = props ;
    let matchPath = pathname || '';
    let iconMenu = icon || 'icon-user';
    let iconfy = iconifyIcon || '';
    let target = title.replace(/ /g, "_") || ''
    let arrCheck = Array.isArray(children);
    const pathFilter = arrCheck &&  children.filter((d)=> d.props.path == matchPath || d.props.path?.includes(childMenu) );
   
    useEffect(()=>{
        let childPath = pathname?.split('/')
        if(childPath?.length >= 1){
            if(childPath[2] !== 'list'){
                setChildMenu(`/${childPath[1]}/list`)
            }
        }
    },[pathname]);


    return(
        <>
            <li>
                <Link
                  className={`btn-toggle align-items-center ${pathFilter.length > 0 ? '':'collapsed'}`}
                  to="#"
                  data-bs-toggle="collapse"
                  title="Tables"
                  data-bs-target={`#${target}`}
                  aria-expanded="false"
                >
                  {/* {iconfy?(
                        <span><iconify-icon icon={iconMenu} /></span>
                    ):(
                        <span className={`${iconMenu}`}></span>
                    )} */}
                    {iconfy &&  <span><iconify-icon icon={iconMenu} /></span>}
                    {(!iconfy && iconMenu) &&   <span className={`${iconMenu}`}></span>}
                    {img &&  <span><img src={img}/></span>}
                  <span className="menu_txt">{title}</span>
                </Link>
                <ul className={`collapse has_menu ${pathFilter.length > 0 ? 'show':''}`} id={target}>
                    {children}
                </ul>
            </li>
            
        </>
    )
}

const Menu = (props) =>{
    const { pathname } = useLocation();
    const [childMenu, setChildMenu] = useState(null)
    const {children, path, icon,title, iconifyIcon} = props ;
    let matchPath = path || '/404';
    let iconMenu = icon || '';
    let iconfy = iconifyIcon || '';
    
    
    const {setBreadcrumbs} = useContext(UserContext); 
    useEffect(()=>{
        let pageInfo = {
            link:path,
            title:title
        }
        if(pathname == matchPath){
            setBreadcrumbs(pageInfo)
        }
        let childPath = pathname?.split('/')
        if(childPath?.length >= 1){
            // if(childPath[2] !== 'list'){
                let ch= common.capitalizeWord(childPath[2]?.replace('-', ' '))?.replace(' ', '%20');
                if(childPath[2] !== 'add' && childPath[2] !== 'edit'){
                    if(childPath[2] == 'mku-limited'){
                        setChildMenu(`/${childPath[1]}/list/MKU%20Limited`)
                    }else{
                        setChildMenu(`/${childPath[1]}/list/${ch}`)
                    }
                    
                }else{
                    setChildMenu(`/${childPath[1]}/list`)
                }
            // }else{

            // }
        }
    },[pathname]);
    // console.log(matchPath, childMenu);
    return(
        <>
            <li>
                <Link to={matchPath} className={`collapse has_menu ${(pathname ==  matchPath || matchPath?.includes(childMenu)) ? 'active':''}`}>
                    {iconfy?(
                        <span><iconify-icon icon={iconMenu} /></span>
                    ):(
                        <span className={`${iconMenu}`}></span>
                    )}
                    <span className="menu_txt">{title}</span>
                </Link>
            </li>
        </>
    )
}

export {Dropdown,Menu}
export default DropDownMenu