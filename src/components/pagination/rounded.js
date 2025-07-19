import React from 'react';
import {Link} from 'react-router-dom';

const Rounded = () => {
    return (
        <div className="main-card mb-4 border-0 shadow-sm card">
        <div className="card-body">
            <h5 className='mb-3'>Rounded</h5>
            <p>For rounded pagination add <code>.pagination-rounded</code> class.</p>
            <nav className="pagination-rounded" aria-label="Page navigation">
                <ul className="pagination">
                    <li className="page-item">
                        <Link to="#" className="page-link" aria-label="Previous">
                            <span aria-hidden="true">«</span>
                            <span className="sr-only">Previous</span>
                        </Link>
                    </li>
                    <li className="page-item">
                        <Link to="#" className="page-link">1</Link>
                    </li>
                    <li className="page-item active">
                        <Link to="#" className="page-link">2</Link>
                    </li>
                    <li className="page-item">
                        <Link to="#" className="page-link">3</Link>
                    </li>
                    <li className="page-item">
                        <Link to="#" className="page-link">4</Link>
                    </li>
                    <li className="page-item">
                        <Link to="#" className="page-link">5</Link>
                    </li>
                    <li className="page-item">
                        <Link to="#" className="page-link" aria-label="Next">
                            <span aria-hidden="true">»</span>
                            <span className="sr-only">Next</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
        
    </div>
    )
}

export default Rounded
