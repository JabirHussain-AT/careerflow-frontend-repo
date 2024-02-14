import React from 'react'
import bannerImage from '../../../assets/BannerImg].png'

const BannerImage  : React.FC = () => {
  return (
    <div className="">
    <img className="mb-5" src={`${bannerImage}`} alt="" />
  </div>
  )
}

export default BannerImage