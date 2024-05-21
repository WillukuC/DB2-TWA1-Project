import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function HomePage() {

  const navigate = useNavigate()

  const navSelection = () => {
    navigate('/selection')
  }

  return (
    <div className='container-fluid p-2' style={{ maxWidth: '50%', fontFamily: 'serif' }}>
      <div className="container px-1 d-flex justify-content-center text-center">
        <div className="col p-1">
          <div className=''>
            <h1>AtlasCharted</h1>
            <img src="/map.png" alt="Map" />
          </div>
          <p className='fs-5'>AtlasCharted is your premier destination for visually exploring comprehensive data sets about countries worldwide. Our intuitive platform offers dynamic graphs and charts that effortlessly convey complex information, empowering users to gain insightful perspectives on various aspects of each nation's demographics, economics, and more.</p>
          <button onClick={navSelection} className='btn bg-light text-dark btn-outline-primary border-3 mt-4' style={{ fontFamily: 'sans-serif' }}>Explore Data</button>
        </div>
      </div>
    </div>
  )
}

export default HomePage