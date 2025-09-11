import React from 'react'
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeItem } from '../../store/slices/checkoutSlice';

function CheckOutItems(prop) {
  const dispatch = useDispatch()
  
  const handleIncrease = (id) => {
    dispatch(increaseQuantity({itemId:id}))
  }
  
  const handleDecrease = (id) =>{
    dispatch(decreaseQuantity({itemId:id}))
  }
  
  return (
    <div >
    <table className=' max-md:text-sm'>
      <tr className='border-b '>
        <th>Products</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Subtotal</th>
        <th></th>
      </tr>
      {prop.items.map((item,index) => (
      <tr key={index} className='my-1 border-b'>
        <td className='flex gap-4 px-5 py-2 max-sm:flex-col max-sm:px-4'>
          <img src={item.image} alt={item.subTitle} className='object-fill w-20 h-20 max-md:w-10 max-md:h-10'/>
          <div className='flex flex-col gap-2'>
            {/* <p>Moose</p> */}
            <p>{item.subTitle}</p>
          </div> 
        </td>
        <td className='px-5 max-sm:px-4'>${item.price}</td>
        <td className='px-5 '>
          <div className='flex items-center gap-1 px-1 border rounded-full'>
            <CiCircleMinus className='text-2xl text-gray-400 cursor-pointer' onClick={()=>{handleDecrease(item._id)}}  />
              {item.quantity}
            <CiCirclePlus className='text-2xl text-gray-400 cursor-pointer' onClick={()=>{handleIncrease(item._id)}}  />
          </div>
        </td>
        <td className='px-5 max-sm:px-4'>${item.total}</td>
      </tr>
      ))}
    </table>
    </div>
  )
}

export default CheckOutItems