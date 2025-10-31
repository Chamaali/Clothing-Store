import React from 'react'
import { FaShopify } from "react-icons/fa6";
import { FiPhoneCall, FiMail  } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import LinksList from './LinksList';

function Footer() {
  return (
    <div className='flex flex-col gap-3 px-10 pt-10 pb-5 bg-black text-slate-200 max-md:px-5'>
      <div className='grid max-mdxl:grid-cols-2 xl:grid-cols-4 gap-y-10 max-xsmd:flex max-xsmd:flex-wrap max-xsmd:justify-between mdxl:grid-cols-3'>
        <ul className='flex flex-col gap-2 '>
          <li>
            <div className='flex items-center gap-1'>
              <FaShopify className='w-8 h-8 max-sm:w-6 max-sm:h-6'/>
              <h3 className='text-xl font-semibold max-sm:text-lg'>Svelte</h3>
            </div>
          </li>
          <li>
            <div className='flex items-center gap-1'>
              <FiPhoneCall />
              <p>+1 (555) 123-4567</p>
            </div>
          </li>
          <li></li>
          <li>
            <div className='flex items-center gap-1'>
              <FiMail />
              <p>support@clothingstore.com</p>
            </div>
          </li>
          <li>
            <div className='flex items-center gap-1'>
              <GrLocation />
              <p>123 Fashion Street, Style City</p>
            </div>
          </li>
          <li></li>
        </ul>

        <LinksList title='Shop by' allLinks={['Women', 'Men', 'Kids']}/>
        <LinksList title='Information' allLinks={['Contact us', 'Delivery Information', 'Privacy Policy', 'Terms & Conditions']}/>

        {/* Social Media Section */}
        <ul className='flex flex-col gap-3'>
          <h3 className='text-lg font-semibold'>Follow Us</h3>
          <div className='flex gap-4 text-lg'>
            <FaFacebookF className='cursor-pointer hover:text-blue-400'/>
            <FaInstagram className='cursor-pointer hover:text-pink-500'/>
            <FaTwitter className='cursor-pointer hover:text-blue-300'/>
            <FaYoutube className='cursor-pointer hover:text-red-500'/>
          </div>
        </ul>

      </div>
      <hr className='border-gray-300'></hr>
      <div className='text-sm text-center '>
        <p>&copy; 2024 Shop, All right reserved.</p>
      </div>
    </div>
  )
}

export default Footer
