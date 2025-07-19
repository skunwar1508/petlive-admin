import React, { useContext } from 'react'
import {Link} from 'react-router-dom';
import { UserContext } from '../context/theme';

const PageBreadCrumbs = () => {

    const {breadcrumbs} = useContext(UserContext); 

    return (
        <div className="page-header-breadcrumb">
            <ul className=" breadcrumb breadcrumb-title bg-transparent p-0 d-flex justify-content-end">
                <li className="breadcrumb-item">
                    <Link to="/"><i className={`feather ${breadcrumbs.icon}`}></i></Link>
                </li>
                <li className="breadcrumb-item"><Link to={breadcrumbs.link || '/'}>{breadcrumbs.title}</Link> </li>
            </ul>
        </div>
    )
}
const PageName = () => {

    const {breadcrumbs} = useContext(UserContext); 

    return (
        <div className="page-header-breadcrumb">
            <ul className=" breadcrumb breadcrumb-title bg-transparent p-0 d-flex justify-content-end">
                <li className="breadcrumb-item">
                    {breadcrumbs.title}
                </li>
            </ul>
        </div>
    )
}
export {PageName}
export default PageBreadCrumbs
