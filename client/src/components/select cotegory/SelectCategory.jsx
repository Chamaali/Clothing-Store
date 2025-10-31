import React from 'react';
import { selectData } from './selectData';
import { Link } from 'react-router-dom';

function SelectCategory() {
  return (
    <div className='flex flex-col items-center gap-10 px-10 py-20 bg-slate-50 max-md:px-5'>
      <h3 className='text-3xl max-md:text-2xl'>Select By Category</h3>
      <div className='flex flex-wrap justify-center gap-20 max-mdxl:gap-5'>
        {selectData.map((select, index) => (
          <div
            key={index}
            className='relative duration-300 group w-52 h-62 max-mdxl:w-44 max-mdxl:h-56 hover:scale-105'
          >
            <img
              src={select.image}
              alt={select.btnText}
              className='object-cover w-full h-full rounded-md'
            />
            <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full duration-500 bg-black bg-opacity-0 rounded-md group-hover:bg-opacity-35'>
              <Link
                to={`/all_cloths/${select.endpoint}`}
                className='flex items-center justify-center w-full h-full'
              >
                <button className='px-5 py-1 bg-white rounded-md'>{select.btnText}</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectCategory;
