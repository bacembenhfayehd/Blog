import React from 'react'
import loaderGif from '../images/loading.gif'

function Loader() {
  return (
    <div className='loader'>
        <div className='loader__image'>
            <img src={loaderGif} alt="" />

        </div>

    </div>
  )
}

export default Loader