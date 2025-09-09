import React from 'react'
import { TiStarFullOutline } from "react-icons/ti";
import testImg from '../../assets/story/story1.jpg'

function TestimonialCard() {
  return (
    <div className='flex flex-col gap-2 p-4 mx-5 bg-white rounded-lg'>
      <div className='flex text-2xl text-yellow-500'>
        <TiStarFullOutline/>
        <TiStarFullOutline/>
        <TiStarFullOutline/>
        <TiStarFullOutline/>
        <TiStarFullOutline/>
      </div>
      <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem ipsum</p>
      <div className='flex gap-3 mt-2'>
        <img src={testImg} alt="" className='object-cover w-10 h-10 rounded-full '/>
        <div>
          <h3 className='text-sm font-semibold'>Leslie Alexander</h3>
          <p className='text-xs '>Model</p>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard