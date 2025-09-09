import React from 'react'
import { FiMail  } from "react-icons/fi";
import { IoMdArrowRoundForward } from "react-icons/io";

function LinksList(prop) {
  return (
    <div>
      <ul className='flex flex-col gap-2 '>
        <li className='font-bold text-white'>{prop.title}</li>
        {prop.allLinks.map((link,index)=>(
          <li className='text-sm font-light text-slate-300' key={index}>{link}</li>
        ))}
        {prop.emailField && 
        <li>
          <div className='flex items-center justify-between px-2 py-1 mt-1 border rounded-md text-slate-300'>
            <FiMail/>
            <input type="email" name="email" placeholder='Your Email'  className='w-full mx-2 text-sm font-light text-center bg-black focus:outline-none'/>
            <IoMdArrowRoundForward />
          </div>
        </li>
        }
      </ul>
    </div>
  )
}

export default LinksList