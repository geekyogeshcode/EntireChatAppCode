import React from 'react'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'



const RegisterPage = () => {
  const navigate=useNavigate()
  const form=useForm()
  const{register,handleSubmit,formState:{errors},reset}=form

    async function formSubmitHandle(data){

      const response=await fetch('http://localhost:3000/api/register',{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
      })

      if(response.ok){
        console.log("Data send Successfully");
        navigate('/home') 
      }else{
        console.error("Faild to send data")
      }
      reset()
      
    }

  return (
    <div className='Register'>
        <h3>Register</h3>
        <div>
            <form onSubmit={handleSubmit(formSubmitHandle)}>
                <input type="text" placeholder='Username' {...register('username',
                {required:"Username is required",
                  minLength:{value:10,message:"Minimun Length is 10 Char"},
                  maxLength:{value:30,message:"Max length is 30"}
                }
                )} />
                {errors.username && <p> {errors.username.message} </p> }
                <input type="number" placeholder='Number' {
                  ...register('number',{required:"Number is Required",minLength:{value:10,message:"Minimun 10 number are required"}})
                } />
                {errors.number && <p>{errors.number.message}</p> }
                <input type="email" placeholder='Email' {
                  ...register('email',{
                    required:"Email is required",minLength:{value:15,message:"Minimun 20 char are needed"}
                  })
                } />
                {errors.email && <p>{errors.email.message}</p> }
                <input type="password" placeholder='Password' {...register("password",{required:"Password is required",minLength:{value:10,message:"password lenght should be greate than 10"}})} />
                {errors.password && <p>{errors.password.message}</p> }
                
                <button>Register</button>
            </form>
        </div>
    </div>
  )
}

export default RegisterPage