import React from 'react'
import dynamic from 'next/dynamic'
const Map =  dynamic(() => import ('../components/Map'));

function demo3() {
  return (
    <div>
      <Map />
    </div>
  )
}

export default demo3