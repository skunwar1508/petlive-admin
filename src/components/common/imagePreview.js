import React from 'react'

const ImagePreview = ({src, size}) => {
  return (
    <>
        <img src={src || '/assets/images/default_img.jpg'} width={size} height={size}  />
    </>
  )
}

export default ImagePreview