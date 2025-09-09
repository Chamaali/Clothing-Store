import React from 'react'
import landingImg from '../../assets/main.png'
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

function LandingPageBody() {
  return (
    <div className=' h-[92vh] p-8  '>
      <div className='flex items-center justify-between h-full bg-gray-100 max-md:pt-14 xl:w-full max-mdxl:flex-col max-mdxl:px-2 max-xsm:pt-8 max-mdxl:items-start max-mdxl:pt-32'>
        <div className='flex flex-col gap-4 pl-8 lg:pl-20'>
          <h3 className='text-3xl font-medium max-mdxl:text-2xl '>Classic Exclusive</h3>
          <h2 className='text-5xl font-semibold max-mdxl:text-4xl'>Women's Collection</h2>
          <h4 className='text-2xl font-medium max-mdxl:text-xl'>UPTO 40% OFF</h4>
          <Link to='/home'>
            <div>
              <button className='flex items-center flex-grow-0 gap-2 px-2 py-1 text-white duration-300 bg-black rounded-md hover:scale-95'>Shop Now <FaLongArrowAltRight/></button>
            </div>
          </Link>
        </div>
        <div className='h-full  max-lg:w-[450px] max-md:h-[400px] flex max-md:justify-center  max-md:w-[300px] max-mdxl:h-[550px] max-lg:h-[500px] max-xsm:h-[250px] '>
          <img src={landingImg} alt="landing" className='object-fill w-full h-full' />
        </div>
      </div>
    </div>
  )
}

export default LandingPageBody