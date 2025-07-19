import React from 'react'
import {Link} from 'react-router-dom';

const Basic = () => {
    return (
        <div className="main-card mb-4 border-0 shadow-sm card">
        <div className="card-body">
            <h5 className='mb-3'>Basic</h5>
            <nav aria-label="Page navigation mb-5">
                <ul className="pagination">
                    <li className="page-item"><Link className="page-link" to="#">Previous</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                    <li className="page-item"><Link className="page-link" to="#">Next</Link></li>
                </ul>
            </nav>

            {/* To show active/current page */}
                <div className='d-block'>
                <p>Use <code>.disabled</code> for links that appear un-clickable and <code>.active</code> to indicate the current page.</p>
                </div>
                <nav>
                    <ul className="pagination">
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

export default Basic
