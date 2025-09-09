import React, { useEffect, useState } from 'react'
import { AiFillPlusCircle } from "react-icons/ai";
import AdminNavBar from '../../components/admin navigation/AdminNavBar'
import AdminButton from '../../components/AdminButtons/AdminButton'
import ItemsCard from '../../components/AdminDashBoard/ItemsCard';
import { Link } from 'react-router-dom';
import { useGetByCategoryQuery } from '../../store/api/adminApi'

function AdminDashBoard() {
  const [activeBtn, setActiveBtn] = useState('Men')
  const {data:categoryData, isError, isLoading, isSuccess, error} = useGetByCategoryQuery(activeBtn)
  
  if(isLoading){
    return <div><AdminNavBar />
      <div className='flex items-center justify-center w-full h-[100vh] '>Loading...</div>
      </div>
  }
  
  if(isError){
    return <div className='flex items-center justify-center w-full h-[100vh] text-5xl max-md:text-3xl'>{error.data.message}</div>
  }
  
  return (
    <div>
      <AdminNavBar />
      <div className='flex flex-col gap-5 mt-[8vh]'>
        <div className='flex justify-center mt-10 gap-14 max-sm:gap-8'>
          <AdminButton btnText="Men" onClick={() => setActiveBtn('Men')} isActive={activeBtn === 'Men'}/>
          <AdminButton btnText="Women" onClick={() => setActiveBtn('Women')}  isActive={activeBtn === 'Women'}/>
          <AdminButton btnText="Kids" onClick={() => setActiveBtn('Kids')}  isActive={activeBtn === 'Kids'}/>
        </div>
        <div className='flex justify-end lg:px-20 max-sm:px-8 md:px-10'>
          <Link to='/add_new_cloth'>
            <button className='flex gap-1 px-2 py-1 duration-200 rounded-md bg-slate-100 hover:scale-95'>
              <p className='text-lg '>Add</p>
              <AiFillPlusCircle className='w-6 h-6 '/>
            </button>
          </Link>
        </div>
        { isSuccess && 
          <div className='grid grid-cols-2 gap-10 px-10 lg:px-20 xl:grid-cols-5 md:grid-cols-4 max-mdxl:gap-5 max-sm:px-4'>
            { categoryData.clothsBycategory.map(itemData => (
              <ItemsCard key={itemData._id} details={itemData} />
            ))}
          </div>
        }
      </div>
  
    </div>
  )
}

export default AdminDashBoard