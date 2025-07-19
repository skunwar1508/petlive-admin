import React from 'react'

const TableImage = ({src, radius}) => {
  return (
    <>
        <img src={src || '/assets/images/default_img.jpg'} className={`tableimg ${radius ? 'img-circle' : 'img-rectangle'}`} />
    </> 
  )
}

export default TableImage