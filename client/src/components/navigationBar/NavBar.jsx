import React, { useEffect, useState } from 'react'
import { FaShopify } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import DropDownMenu from './DropDownMenu';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authSliceSelector, userLogOut } from '../../store/slices/authSlice';
import { useLogoutUserMutation } from '../../store/api/userApi';
import MessageBox from '../message box/MessageBox';

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [logoutUser] = useLogoutUserMutation()
  const navigate = useNavigate()
  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()
  
  const isLoggedIn = useSelector(authSliceSelector)
  const activeLink = 'text-red-400 font-bold '
  const inActiveLink = 'text-black hover:text-red-400'
  
  const toggleMenu = () =>{
    setIsMenuOpen(!isMenuOpen)
    setIsDropDownOpen(false)
  }
  const toggleDropDown = () =>{
    setIsDropDownOpen(!isDropDownOpen)
  }

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      setMessage(response.data.message);
      dispatch(userLogOut());
      document.cookie = 'token=; path=/;';
      navigate('/login');
      
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };
  
  
  
  return (
    <>
    <div className=' h-[8vh] flex justify-between items-center px-10  top-0  max-md:px-5 bg-white sticky z-10'>
      <Link to='/home'>
        <div className='flex items-center gap-1'>
          <FaShopify className='w-8 h-8 max-sm:w-6 max-sm:h-6'/>
          <h3 className='text-xl font-semibold max-sm:text-lg'>SHOP</h3>
        </div>
      </Link>
      <div className=' max-mdxl:hidden'>
        <ul className='flex gap-10'>
          <NavLink to='/home' className={({isActive}) => ( isActive ? activeLink : inActiveLink )}>
            <li>Home</li>
          </NavLink>
          <li onClick={toggleDropDown} className='flex items-center cursor-pointer'>Shop <FaAngleDown/></li>
          <li>Blog</li>
          <NavLink to='/contact' className={({isActive}) => ( isActive ? activeLink : inActiveLink )}>
            <li>Contact Us</li>
          </NavLink>
        </ul>
      </div>
      <div className='flex items-center gap-5 max-sm:gap-4'>
        <span className=" hover:text-red-500">
          <MdFavorite className="w-5 h-5 fill-current stroke6bla6k" />
        </span>
        <NavLink to='/cart' className={({isActive}) => ( isActive ? activeLink : inActiveLink )}>
          <IoCartOutline className='w-6 h-6 '/>
        </NavLink>
        
        { isLoggedIn ? 
          <button className='px-2 py-1 text-white duration-300 bg-black rounded-md max-sm:text-sm hover:scale-95' onClick={handleLogout}>Logout</button>:
          <NavLink to='/login'>
            <button className='px-2 py-1 text-white duration-300 bg-black rounded-md max-sm:text-sm hover:scale-95'>Login</button>
          </NavLink>
        }
        <div className={`${isMenuOpen ? 'hidden' : 'p-1 border-2 rounded-full mdxl:hidden'}`} onClick={toggleMenu}>
          <IoIosMenu />
        </div>
        <div className={`${isMenuOpen ? 'p-1 border-2 rounded-full mdxl:hidden' : 'hidden'}`} onClick={toggleMenu}>
          <IoMdClose />
        </div>
      </div>
      </div>
      <div>
      <ul className={`${isMenuOpen ? ' translate-x-0 ' : 'translate-x-full ' } fixed right-0 duration-500  flex flex-col h-full gap-16 px-20 py-16 bg-white max-md:px-10 mdxl:hidden z-10`}>
        <NavLink to='/home' className={({isActive}) => ( isActive ? activeLink : inActiveLink )} onClick={toggleMenu}><li>Home</li></NavLink>
        <li onClick={toggleDropDown} className='flex items-center'>Shop <FaAngleDown/></li>
        <li>Blog</li>
        <NavLink to='/contact' className={({isActive}) => ( isActive ? activeLink : inActiveLink )} onClick={toggleMenu}>
          <li>Contact Us</li>
        </NavLink>
      </ul>
    </div>
    {isDropDownOpen  && <DropDownMenu toggleDropDown={toggleDropDown}/> }
    { message !== null && <MessageBox messageTxt={message} onClick={()=>setMessage(null)}/>}
    </>
  )
}

export default NavBar