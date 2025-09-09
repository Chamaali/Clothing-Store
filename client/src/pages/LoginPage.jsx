import React, { useState } from 'react'
import SignupInput from '../components/signup input/SignupInput'
import NavBar from '../components/navigationBar/NavBar'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../store/api/userApi'
import MessageBox from '../components/message box/MessageBox'
import { useDispatch } from 'react-redux'
import { userLogin } from '../store/slices/authSlice'

function LoginPage() {
  const [loginUser] = useLoginUserMutation()
  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async(e) =>{
    e.preventDefault()
    const loginData = {
      email: e.target.email.value,
      password: e.target.password.value
    }
    
    try{
      const response = await loginUser(loginData)
      console.log(response)
      if(response.error) {
        setMessage(response.error.data.message)
      } 
      else{
        setMessage(response.data.message)
        document.cookie = `token=${response.data.token}`
        dispatch(userLogin())
        setTimeout(()=>{
        if(response.data.userRole === 'admin'){
          navigate('/dash_board')
        }
        else if(response.data.userRole === 'user'){
          navigate('/home')
        }
      },2000)
      }
      
    }
    catch(err){
      console.error('Login failed:', err)
    } 
  }

  return (
    <>
    <NavBar />
      <div className='flex flex-col gap-4 items-center justify-center w-full min-h-[92vh] '>
        <div action="" className='min-w-[450px] border flex flex-col items-center p-5 gap-5 shadow-lg rounded-md max-sm:min-w-[360px] max-xsm:min-w-[300px]'>
          <h3 className='text-2xl font-semibold'>Login</h3>
          <form onSubmit={handleLogin}  className='flex flex-col w-full gap-6'>
            <SignupInput inputType='text' labelText='Email' labelName='email'  />
            <SignupInput inputType='password' labelText='Password' labelName='password' type="password" />
            <div className='flex justify-center'>
              <button type="submit" className='self-center px-5 py-2 text-white duration-300 bg-black border rounded-lg hover:scale-95'>Login</button>
            </div>
          </form>
        </div>
        <Link to='/signup'><p className='text-base '>Don't have an account? <button className='text-base font-bold text-buttonColor'>Signup</button></p></Link>
      </div>
      { message !== null && <MessageBox messageTxt={message} onClick={()=>setMessage(null)}/>}
    </>
  )
}

export default LoginPage