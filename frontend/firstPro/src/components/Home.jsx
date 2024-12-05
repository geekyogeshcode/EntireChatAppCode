import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
const Home = () => {
    const navigate=useNavigate()
    let location=useLocation()
    const {username,image,id}=location.state || {}

    const [allUsers,setAllUsers]=useState([])
    const [chatUser,setChatUser]=useState("")
    const [imageChatUser,setImageChatUser]=useState('')

    const getData= async() =>{
        let response=await axios.get('http://localhost:3000/api/displaydata')

        setAllUsers(await response.data.allUsers) 
        console.log(await response.data.allUsers) 
        console.log(id);
        
        
    }

    useEffect(() =>{
        getData()
    },[])

    let currentUser=(e) =>{
        let user=e.currentTarget.getAttribute('data-username').split(',')[0]
        let userImage=e.currentTarget.getAttribute('data-username').split(',')[1]
        
        setChatUser(user)
        setImageChatUser(userImage)
        
    }
    
    
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
                          
                                <div className="user"  onClick={currentUser} data-username={[user.username,user.image]}  key={user.email}>
                                     <img src={`http://localhost:3000/${user.image}`} alt="" />
                                     <h3 >{user.username}</h3>
                                 </div>
                        ))
                    }
                
            </div>
            <div className="right">
                <div className="messages">
                        <h2>{chatUser}</h2> 
                     {imageChatUser?<img src={`http://localhost:3000/${imageChatUser}`} alt="" />:null}   
                </div>

                {
                    chatUser?<div className="sendMessage">
                    <input type="text" placeholder="Type a message..." />
                    <button>Send</button>
                </div>:null
                }
                
            </div>
        </div>
    </div>
  )
}

export default Home
