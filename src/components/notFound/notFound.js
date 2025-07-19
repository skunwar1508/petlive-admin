import React, { useEffect, useState } from 'react'

export default function NotFound() {
  const [isNotFound, setIsNotFound] = useState(false)
  useEffect(() => {
    setIsNotFound(false)
    setTimeout(()=>{
      setIsNotFound(true)
    },2000)
  }, []);
  return (
    <div className='notFoundWrp'>
      {isNotFound? (
        <img src='/assets/images/404.webp' className='img-fluid' alt='404' />
      ):(
        'Loading...'
      )}
    </div>
  )
}
