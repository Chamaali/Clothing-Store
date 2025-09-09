import React, { useState } from 'react'
import NavBar from '../../components/navigationBar/NavBar'
import { useParams } from 'react-router-dom'
import ClothDetails from '../../components/cloth details/ClothDetails'
import { useGetBuCategoryAndTypeQuery, useGetByCategoryUserQuery } from '../../store/api/userApi'

function AllCloth() {
  const [seeDetail, setSeeDetail] = useState(false)
  const [clothId, setClothId] = useState(null)

  const {category, type} = useParams()
  const {data:categoryData, isLoading:categoryLoading} = useGetByCategoryUserQuery(category)
  const {data:typeData, isLoading:typeLoading } = useGetBuCategoryAndTypeQuery({category, type})
  
  if(categoryLoading || typeLoading){
    return <div className='flex items-center justify-center w-full h-[100vh]'>Loading...</div>
  }

  const handleSeeDetais = () =>{
    setSeeDetail(false)
  }
  
  return (
    <div>
      <NavBar />
      <div className='min-h-[92vh] px-10 py-10  max-md:px-5 bg-slate-50'>
   
        <div className='flex flex-wrap justify-center gap-10 max-md:justify-around max-lg:gap-5'>
          { type ? ( 
             typeData.clothByCategoryAndType.map((itemData)=>(
              <div key={itemData._id} className='flex flex-col gap-3 duration-300 bg-white rounded-md cursor-pointer h-max hover:scale-105 w-[200px]' onClick={()=> { setSeeDetail(true), setClothId(itemData._id) }}>
                <div className='flex justify-center'>
                  <img src={itemData.imgURL} alt={itemData.subTitle}  className='object-cover w-40 h-40 rounded-t-md max-sm:w-36 max-sm:h-36'/>
                </div>
                <div className='p-1 text-sm'>
                  <h3 className='text-red-700'>{itemData.title}</h3>
                  <h4 className='text-blue-800 '>{itemData.subTitle}</h4>
                  <h4 className='font-semibold '>$ {itemData.price}</h4>
                </div>
              </div>
              ))
          ) : (
          categoryData.clothsBycategory.map((itemData)=>(
          <div key={itemData._id} className='flex flex-col gap-3 duration-300 bg-white rounded-md cursor-pointer h-max hover:scale-105 w-[200px]' onClick={()=> { setSeeDetail(true), setClothId(itemData._id) }}>
            <div className='flex justify-center'>
              <img src={itemData.imgURL} alt={itemData.subTitle}  className='object-cover w-40 h-40 rounded-t-md max-sm:w-36 max-sm:h-36'/>
            </div>
            <div className='p-1 text-sm'>
              <h3 className='text-red-700'>{itemData.title}</h3>
              <h4 className='text-blue-800 '>{itemData.subTitle}</h4>
              <h4 className='font-semibold '>$ {itemData.price}</h4>
            </div>
          </div>
          ))
        )}
        </div> 
   
      { seeDetail && <ClothDetails seeDetails={handleSeeDetais} id={clothId}/> }
      </div>
    </div>
  )
}

export default AllCloth