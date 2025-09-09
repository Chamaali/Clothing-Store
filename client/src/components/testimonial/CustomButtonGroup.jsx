import React from 'react'
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

function CustomButtonGroup({ next, previous }) {
  return (
    <div className='flex justify-end gap-2 '>
      <button className='p-3 text-xl duration-200 bg-white rounded-md hover:bg-black hover:text-white max-md:p-1' onClick={() => previous()}><IoMdArrowRoundBack /></button>
      <button className='p-3 text-xl duration-200 bg-white rounded-md hover:bg-black hover:text-white max-md:p-1' onClick={() => next()}><IoMdArrowRoundForward /></button>
    </div>
  )
}

export default CustomButtonGroup