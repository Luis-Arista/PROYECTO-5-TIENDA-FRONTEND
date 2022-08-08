import React from 'react'
import './Banner.css'
import imgBanner from '../../assets/img/stuffy_banner.jpeg'

const Banner = () => {

  return (
   <section>
      <div className="contendor_banner">
        <img src={imgBanner} alt="Banner" />
      </div>
   </section>
  )
}

export default Banner