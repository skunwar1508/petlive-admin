import React from 'react'
import { Oval } from 'react-loader-spinner'

export default function Loader() {
  return (
    <div className="pageloaderWrp">
      <div className="pageLoadr">
        <Oval color="#1160c1" height={70} width={70} />
      </div>
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="pageloaderWrp active">
      <div className="pageLoadr">
        <Oval color="#1160c1" height={70} width={70} />
      </div>
    </div>
  )
}
