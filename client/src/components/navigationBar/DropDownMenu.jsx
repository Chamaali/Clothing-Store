import React from 'react'
import { Link } from 'react-router-dom'

function DropDownMenu({toggleDropDown}) {
  return (
    <div onClick={toggleDropDown} className='fixed top-[8vh]  left-0 right-0 justify-center flex  max-mdxl:bg-black max-mdxl:backdrop-blur-sm h-full max-mdxl:items-center max-mdxl:bg-opacity-20 z-10'>
      <div className='flex justify-center gap-20 p-8 max-w-max max-md:gap-14 bg-gray-50 max-h-[300px]'>
      <ul className='flex flex-col gap-4'>
        <li className='font-semibold '>Men</li>
        {['T-Shirt', 'Casual Shirt', 'Formal Shirt', 'Jackets'].map((category, index)=>(
          <Link key={index} to={`/all_cloths/Men/${category}`}><li>{category}</li></Link>
        ))}
      </ul>
      <ul className='flex flex-col gap-4'>
        <li className='font-semibold '>Women</li>
        {['Saree', 'lehenga', 'Jackets'].map((category, index)=>(
          <Link key={index} to={`/all_cloths/Women/${category}`}><li>{category}</li></Link>
        ))}
      </ul>
      <ul className='flex flex-col gap-4'>
        <li className='font-semibold '>Kids</li>
        {['T-Shirt', 'Shirt', 'Jeans'].map((category, index)=>(
          <Link key={index} to={`/all_cloths/Kids/${category}`}><li>{category}</li></Link>
        ))}
      </ul>
      </div>
    </div>
  )
}

export default DropDownMenu