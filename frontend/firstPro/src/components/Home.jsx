import React from 'react'
import {useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate=useNavigate()
    let location=useLocation()
    const {username,image}=location.state || {}
    
    
  return (
    <div className='HomePage'> 
        <nav>
            <h3>{username}</h3>
            <img src={`http://localhost:3000/${image}`} alt="" />
        </nav>
    </div>
  )
}

export default Home