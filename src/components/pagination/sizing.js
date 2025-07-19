import React from 'react';
import {Link} from 'react-router-dom';


const Sizing = () => {
    return (
        <div className="main-card mb-4 border-0 shadow-sm card">
            <div className="card-body">
                <h5 className='mb-3'>Sizing</h5>
                <p>Add class <code>.pagination-sm</code>, <code>pagination-lg</code> for sizing.</p>

                {/* pagination small */}
                <nav aria-label="Page navigation">
                    <ul className="pagination pagination-sm">
                        <li className="page-item">
                        <Link className="page-link" to="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </Link>
                        </li>
                        <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                        <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                        <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                        <li className="page-item">
                        <Link className="page-link" to="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </Link>
                        </li>
                    </ul>
                </nav>

                {/* pagination normal */}
                <nav aria-label="Page navigation">
                    <ul className="pagination">
                        <li className="page-item">
                        <Link className="page-link" to="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </Link>
                        </li>
                        <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                        <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                        <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                        <li className="page-item">
                        <Link className="page-link" to="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </Link>
                        </li>
                    </ul>
                </nav>

                {/* pagination large */}
                <nav aria-label="Page navigation">
                    <ul className="pagination pagination-lg">
                        <li className="page-item">
                        <Link className="page-link" to="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </Link>
                        </li>
                        <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                        <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                        <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                        <li className="page-item">
                        <Link className="page-link" to="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Sizing
