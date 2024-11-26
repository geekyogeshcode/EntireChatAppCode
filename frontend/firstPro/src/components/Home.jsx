import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
const Home = () => {
    const navigate=useNavigate()
    let location=useLocation()
    const {username,image,id}=location.state || {}

    const [allUsers,setAllUsers]=useState([])

    const getData= async() =>{
        let response=await axios.get('http://localhost:3000/api/displaydata')

        setAllUsers(await response.data.allUsers) 
        console.log(await response.data.allUsers) 
        console.log(id);
        
        
    }

    useEffect(() =>{
        getData()
    },[])
    
    
  return (
    <div className='HomePage'> 
        <nav>
            <h3>{username}</h3>
            <img src={`http://localhost:3000/${image}`} alt="" />
        </nav>

        <div className="main-box">
            <div className="left">
                
                    {
                        allUsers.length>0 && allUsers.filter((user) =>(user._id !== id))
                        .map((user,index) =>(
                          
                                <div className="user" key={user.email}>
                                     <img src={`http://localhost:3000/${user.image}`} alt="" />
                                     <h3>{user.username}</h3>
                                 </div>
                                
                           
                        ))
                    }
                
            </div>
            <div className="right">
                <div className="messages">
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home