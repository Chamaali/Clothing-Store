import React from 'react'
import { FaShopify } from "react-icons/fa6";
import { FiPhoneCall, FiMail  } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import LinksList from './LinksList';

function Footer() {
  return (
    <div className='flex flex-col gap-3 px-10 pt-10 pb-5 bg-black text-slate-200 max-md:px-5'>
      <div className='grid max-mdxl:grid-cols-2 xl:grid-cols-4 gap-y-10 max-xsmd:flex max-xsmd:flex-wrap max-xsmd:justify-between mdxl:grid-cols-3'>
        <ul className='flex flex-col gap-2 '>
          <li>
            <div className='flex items-center gap-1'>
              <FaShopify className='w-8 h-8 max-sm:w-6 max-sm:h-6'/>
              <h3 className='text-xl font-semibold max-sm:text-lg'>SHOP</h3>
            </div>
          </li>
          <li>
            <div className='flex items-center gap-1'>
              <FiPhoneCall />
              <p>+94 764009627</p>
            </div>
          </li>
          <li></li>
          <li>
            <div className='flex items-center gap-1'>
              <FiMail />
              <p>avishkas97@gmail.com</p>
            </div>
          </li>
          <li>
            <div className='flex items-center gap-1'>
              <GrLocation />
              <p>Bibilegama, Passara, Badulla</p>
            </div>
          </li>
          <li></li>
        </ul>
        <LinksList title='Information' allLinks={['My Account', 'Login', 'My Cart', 'My Wishlist', 'Checkout']}/>
        <LinksList title='Service' allLinks={['About Us', 'Careers', 'Delivery Information', 'Privacy Policy', 'Terms & Conditions']}/>
        <LinksList title='Subscribe' allLinks={['Enter your email below to the first to know about new collections and product launches.']} emailField/>
      </div>
      <hr className='border-gray-300'></hr>
      <div className='text-sm text-center '>
        <p>&copy; 2024 Shop, All right reserved.</p>
      </div>
    </div>
  )
}

export default Footer