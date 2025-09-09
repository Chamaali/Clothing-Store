import React, { useState } from 'react'
import { FaShopify } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";
import {  NavLink, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '../../store/api/userApi';
import MessageBox from '../message box/MessageBox';

function AdminNavBar() {
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()
  const activeLink = 'text-red-400 font-bold text-lg'
  const inActiveLink = 'text-white'
  const [logoutUser] = useLogoutUserMutation()
  
  const handleLogout = async() =>{
    try{
      const response = await logoutUser()
      setMessage(response.data.message)
      document.cookie = 'token=; path=/;'
      navigate('/login')
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <>
    <div className='flex bg-black h-[8vh] text-white items-center justify-between lg:px-20 sm:px-10 px-5 fixed top-0 left-0 right-0 z-10'>
      <div className='flex items-center gap-1'>
        <FaShopify className='w-8 h-8 max-sm:w-5 max-sm:h-5'/>
        <h3 className='text-xl font-semibold max-sm:text-lg'>SHOP</h3>
      </div>
      <ul className='flex gap-10'>
        <NavLink to='/dash_board' className={({isActive}) => ( isActive ? activeLink : inActiveLink )}><li>Items</li></NavLink>
        <NavLink to='/orders' className={({isActive}) => ( isActive ? activeLink : inActiveLink )}><li>Orders</li></NavLink>
      </ul>
      <AiOutlineLogout className='w-5 h-5 cursor-pointer' onClick={handleLogout} />
    </div>
    { message !== null && <MessageBox messageTxt={message} onClick={()=>setMessage(null)}/>}
    </>
  )
}

export default AdminNavBar