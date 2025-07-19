import React from 'react';
import {Link} from 'react-router-dom';

const Alignment = () => {
    return (
        <div className="main-card mb-4 border-0 shadow-sm card">
        <div className="card-body">
            <h5 className='mb-3'>Alignment</h5>
            <p>Add class <code>.justify-content-center</code> to align center. <code>jusity-content-end</code> to align right.</p>
            <h6 className='mb-3'>Default Alignment</h6>
            <nav aria-label="Page navigation mb-5">
                <ul className="pagination">
                    <li className="page-item"><Link className="page-link" to="#">Previous</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">Next</Link></li>
                </ul>
            </nav>


            <h6>Center Alignment</h6>
            <nav aria-label="Page navigation mb-5">
                <ul className="pagination justify-content-center">
                    <li className="page-item"><Link className="page-link" to="#">Previous</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">Next</Link></li>
                </ul>
            </nav>

            <h6>Right Alignment</h6>
            <nav>
                <ul className="pagination justify-content-end">
                    <li className="page-item disabled">
                    <Link to="" className="page-link">Previous</Link>
                    </li>
                    <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                    <li className="page-item active">
                    <Link className="page-link" to="#">2</Link>
                    </li>
                    <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                    <li className="page-item">
                    <Link className="page-link" to="#">Next</Link>
                    </li>
                </ul>
            </nav>
        </div>
        
    </div>
    )
}

export default Alignment
