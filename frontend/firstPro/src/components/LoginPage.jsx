import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  let form=useForm()
  let navigate=useNavigate()
  let {register,handleSubmit,formState:{errors}} = form

  let handleForm=async(data) =>{

    try {
      
        const response=await axios.post("http://localhost:3000/api/login",data)

        if(response.data.success){
          localStorage.setItem("authToken",response.data.authToken)
          navigate('/home',{state:{...response.data.userData}})

        } else{
          alert(response.data.message || "Login Failed")
        }
    } catch (error) {
        if(error.response && error.response.data.message) {
          alert(error.response.data.message)
        }else{
          alert("An unexpected error occurred. Please try again later.")
        }
    }

  }


  return (
    <div className='LoginPage'>
      <div className="LoginContainer">
        <h3>Login</h3>
        <form onSubmit={handleSubmit(handleForm)}> 
          <label htmlFor="email">Email:</label>
          <input placeholder='Email' type="email" {...register('email',{required:true})} />

          <label htmlFor="password">Password:</label>
          <input placeholder='Password' type="password" {...register('password',{required:true})} />
          <button style={{marginTop:"10px"}} >Login</button> 
        </form>
      </div>
    </div>
  )
}

export default LoginPage