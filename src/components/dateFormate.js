import React from 'react'
import Moment from 'react-moment'

const DateFormate = ({children, format}) => {
  return (
    <>
        <Moment format={format || 'DD/MM/YYYY'}>{children}</Moment>
    </>
  )
}

export default DateFormate