import React from 'react'
import {Link} from 'react-router-dom';

const PageHeader = (props) => {

    return (
        <div className="page-header mb-4 pb-2">
            
            <div className="container-fluid">
                <div className="row px-4 align-items-end">
                    <div className="col-lg-8">
                        <div className="page-header-title d-flex flex-wrap align-items-center">
                            <i className={`breadcrumbBig_icon ${props.icon} shadow fs-4 p-2 rounded`}></i>
                            <div className="d-inline-block mt-2 mt-md-0  ml-lg-3">
                                <h5>{props.title}</h5>
                                <span>{props.description}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="page-header-breadcrumb">
                            <ul className=" breadcrumb breadcrumb-title bg-transparent p-0 d-flex justify-content-end">
                                <li className="breadcrumb-item">
                                    <Link to="/"><i className={`feather ${props.icon}`}></i></Link>
                                </li>
                                <li className="breadcrumb-item"><Link to={props.link}>{props.title}</Link> </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageHeader
