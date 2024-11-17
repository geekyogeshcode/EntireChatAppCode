import React, { useRef } from 'react'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const RegisterPage = () => {
  const navigate=useNavigate()
  const form=useForm()
  const{register,handleSubmit,formState:{errors},reset}=form 
  const fileInputRef=useRef(null)

    async function formSubmitHandle(data){
      try {
            let formData=new FormData()

            formData.append("username",data.username)
            formData.append("password",data.password)
            formData.append("email",data.email)
            formData.append("image",data.image[0])
            
            const response=await axios.post("http://localhost:3000/api/register",formData)

            if(response.status === 200){
              console.log("User Registered successfuly");
              console.log(response.data.message);
              navigate('/login',)
            }
      } catch (error) {
        if(error.response && error.response.data.message){
          alert(error.response.data.message)
        }else{
          alert("Server error please try agian.") 
        }

        if(fileInputRef.current){
          fileInputRef.current.value="" 
        }
      }
      
    }

  return (
    <div className='Register'>
      <div className="registerContainer">
        <h3>Register</h3>
        <div>
            <form onSubmit={handleSubmit(formSubmitHandle)}>
                <input type="text" placeholder='Username' {...register('username',
                {required:"Username is required",
                  minLength:{value:7,message:"Minimun Length is 7 Char"},
                  maxLength:{value:30,message:"Max length is 30"}
                }
                )} />
                {errors.username && <p> {errors.username.message} </p> }
              
                {errors.number && <p>{errors.number.message}</p> }
                <input type="email" placeholder='Email' {
                  ...register('email',{
                    required:"Email is required",minLength:{value:10,message:"Minimun 10 char are needed"}
                  })
                } />
                {errors.email && <p>{errors.email.message}</p> }
                <input type="password" placeholder='Password' {...register("password",{required:"Password is required",minLength:{value:8,message:"password lenght should be greate than 8"}})} />
                {errors.password && <p>{errors.password.message}</p> }

                <input type="file" ref={fileInputRef} {...register('image',{required:"Chose image"})} accept='image/jpeg, image/png' />
                {errors.image && <p> {errors.image.message} </p> }
                <div className='ReButton' >
                  <button>Register</button>
                  <button onClick={() => navigate('/login') } >Login</button>
                </div>
            </form>
        </div>
      </div>  
    </div>
  )
}

export default RegisterPage