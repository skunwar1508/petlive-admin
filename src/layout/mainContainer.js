import React from 'react'

const Main = (props) => {
    return (
        <div className="mainContent px-3 mt-4">
            <div className="container-fluid">
                {props.children}
             </div>
        </div>
    )
}

export default Main

