import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const router=useNavigate()
    const [userData,setUserData]=useState({name:"", email:"",password:"",confirmPassword:""})
    

   async function handleSubmit(e){
        e.preventDefault();
        if(userData.name && userData.email && userData.password && userData.confirmPassword){
            if(userData.password === userData.confirmPassword){
                try{
                    const response =await axios.post('http://localhost:8000/api/v1/auth/register',{userData});
                    console.log(response,"response");
                
                    if(response.data.success === true){
                        alert(response.data.message)
                        setUserData({name:"", email:"",password:"",confirmPassword:""})
                        router('/user-login')
                    }

                }catch(error){
                    // return res.satus(500).json({error})
                    console.log(error.response.data.message)
                }
            }else{
                 alert("password and confirm password not match")

            }
        }else{
            alert("all feild are require")
        }
    }

    function handelChange(e){
        setUserData({...userData,[e.target.name]:e.target.value})
    }

  return (
    <div>
        <h1>Register page</h1>
        <form onSubmit={handleSubmit}>
            <label>Name:-</label><br/>
            <input type='text' onChange={handelChange} name='name' value={userData.name} /><br/>
            <label>Email:-</label><br/>
            <input type='email' onChange={handelChange} name='email' value={userData.email} /><br/>
            <label>Password:-</label><br/>
            <input type='password' onChange={handelChange} name='password' value={userData.password} /><br/>
            <label>confrimPassword:-</label><br/>
            <input type='password' onChange={handelChange} name='confirmPassword' value={userData.confirmPassword} /><br/>
            <input type='submit' value='Register' />
        </form>
      
    </div>
  )
}

export default Register
