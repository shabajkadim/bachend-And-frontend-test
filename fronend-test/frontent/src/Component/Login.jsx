import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const router=useNavigate()

  const[data , setData]=useState({email:"" , password:""})

    async function handleSubmit(e){
      e.preventDefault();
      try{
      const respones=await axios.post('http://localhost:8000/api/v1/auth/login',{data})
      if(respones.data.message){
        alert(respones.data.message)
        setData({email:"" , password:""})
        router('/')
      }

      }catch(error){
        console.log(error,"error")
        return alert(error.response.data.message)
      }
    }
    function handleChange(e){
      setData({...data,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:-</label><br/>
        <input type='email' onChange={handleChange} name='email' value={data.email} /><br/>
        <label>Password:-</label><br/>
        <input type='password' onChange={handleChange} name='password' value={data.password} />
        <input type='submit' value='login' />
      </form>
    </div>
  )
}

export default Login
