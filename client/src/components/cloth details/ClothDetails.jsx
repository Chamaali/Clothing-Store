import React from 'react'
import AddBuyButton from '../addToCart and Buy buttons/AddBuyButton'
import { GoGift } from "react-icons/go";
import { BsCart3 } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useGetByIdQuery } from '../../store/api/adminApi';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/slices/checkoutSlice';

function ClothDetails(prop) {
  const buyIcon = GoGift
  const cartIcon = BsCart3
  const dispatch = useDispatch()
  const {data, isSuccess, isLoading} = useGetByIdQuery(prop.id)
  
  if(isLoading){
    return <div className='flex items-center justify-center w-[100vw] h-[100vh] bg-black bg-opacity-40 top-0 absolute left-0 text-white text-xl'>Loading...</div>
  }
  const clothData = data.clothDetails
  
  return (
    <div className='fixed left-0 right-0 flex items-center justify-center w-full h-full bg-gray-200 top-[3vh] bg-opacity-30 backdrop-blur-sm' >
      { isSuccess && 
      <div className=' p-1 bg-white  max-w-[350px] rounded-lg '>
        <div className='flex justify-end pr-2 text-lg '>
            <div className='p-[2px] border rounded-full cursor-pointer' onClick={prop.seeDetails}>
            <IoClose />
            </div>
        </div>
        <div  className='flex flex-col gap-3 px-5 pt-2 pb-5'>
          <div className='flex gap-5'>
            <img src={clothData.image} alt={clothData.subTitle} className='w-40 h-40 rounded-md' />
            <div className='font-semibold '>
              <h3 className='text-red-700'>{clothData.title}</h3>
              <h4 className='text-blue-800 '>{clothData.subTitle}</h4>
              <h4>$ {clothData.price}</h4>
            </div>
          </div>
          <div>
            <p className='text-gray-700 '>{clothData.clothDiscription}</p>
          </div>
          <div className='grid grid-cols-2 gap-8 max-md:gap-5'>
            <AddBuyButton color='blue' icon={buyIcon} btnTxt='Buy Now' onClick={()=>dispatch(addItem([{...clothData, total:clothData.price, quantity:1} ]))} link='/checkout'/>
            <AddBuyButton color='pink' icon={cartIcon} btnTxt='Add To Cart' body={{clothId:clothData._id, image:clothData.image, title:clothData.title, subTitle:clothData.subTitle, price:clothData.price}} isAddTocart={true}/>
          </div>
        </div> 
      </div>
      }
    </div> 
  )
}

export default ClothDetails