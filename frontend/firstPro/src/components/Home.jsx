import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom';

const Home = () => {
    const [currenUserData,setCurrentUserData]=useState([])
    const navigate=useNavigate()
    const loadData = async () => {
        let response = await fetch("http://localhost:3000/api/home", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        response = await response.json();
        setCurrentUserData(response.userData || []) 
        
      }; 
      useEffect(() => {
        loadData();
      }, []);
    
  return (
    <div> 
        <button onClick={ () => navigate('/')} >Register</button>
        <table>
            <thead>
                <tr>

                <th style={{ padding: "60px" }}>Name</th>
                <th style={{ padding: "60px" }}>Email</th>
                <th style={{ padding: "60px" }}>Number</th>
                </tr>
            </thead>
            <tbody>
                {
                    currenUserData.length > 0 ? (currenUserData.map((data,index) =>(
                        <tr key={index}>
                            <td>{data.username}</td>
                            <td>{data.email}</td>
                            <td>{data.number}</td>
                        </tr>
                    ))) : (
                        <tr>
                            <td colSpan="3"  style={{ textAlign: "center" }}>No Data Available</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default Home