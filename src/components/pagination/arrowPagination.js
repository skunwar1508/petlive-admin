import React from 'react';
import {Link} from 'react-router-dom';

const ArrowPagination = () => {
    return (
        <div className="main-card mb-4 border-0 shadow-sm card">
            <div className="card-body">
                <h5 className='mb-3'>Arrow Pagination</h5>
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

                {/* To show active/current page */}
                <div className='d-block'>
                <p>Use <code>.disabled</code> for links that appear un-clickable and <code>.active</code> to indicate the current page.</p>
                </div>
                <nav aria-label="Page navigation">
                    <ul className="pagination">
                        <li className="page-item disabled">
                        <Link className="page-link" to="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </Link>
                        </li>
                        <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                        <li className="page-item active"><Link className="page-link" to="#">2</Link></li>
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

export default ArrowPagination
