import React, { useEffect, useState } from 'react'
// NavBar is provided by RootLayout
import Footer from '../../components/footer/Footer'
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from 'react-router-dom'
import { LuPackage } from "react-icons/lu";
import { useGetCartItemsQuery, useRemoveItemMutation } from '../../store/api/userApi';
import MessageBox from '../../components/message box/MessageBox';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/slices/checkoutSlice';

function CartPage() {
  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()
  const {data:cartItems, isError, isLoading, error, isSuccess } = useGetCartItemsQuery()
  const [removeItem] = useRemoveItemMutation()
  if(isLoading){
    return <div className='flex items-center justify-center w-full h-[100vh]'>Loading...</div>
  }
 
  if(isError || !cartItems.cartDetails){
    return (
      <div className=' h-[92vh] flex flex-col justify-between '>
        <div className='flex items-center justify-center w-full h-full text-2xl'>
          {error.data.message}
        </div>
        <Footer />
      </div>
    )
  }
  
  const handleRemoveItem = async(id) =>{
    try{
      const response =  await removeItem(id)
      if(response.error){
        setMessage(response.error.data.message)
      }
      else{
        setMessage(response.data.message)
      }
    }
    catch(err){
      setMessage(err.message)
    }
  }
  
  return (
    <>
      <div className='flex flex-col justify-between min-h-[92vh]  gap-10'>
        <div className='relative flex flex-col items-center gap-8 px-10 py-10'>
          <h2 className='text-3xl font-semibold'>Cart</h2>
          <div className='p-8 border rounded-md max-sm:p-5 w-[500px] max-sm:w-[360px]'>
            <table className='w-full max-md:text-sm'>
              <tr className='border-b '>
                <th>Products</th>
                <th>Price</th>
                <th>Quantity</th>
                <th></th>
              </tr>
              {isSuccess && (
              cartItems.cartDetails.map((item,index) =>(
                <tr key={index} className='border-b '>
                  <td className='flex flex-col gap-4 px-5 py-2 max-sm:px-4'>
                    <img src={item.image} alt={item.subTitle} className='object-fill w-20 h-20 max-md:w-10 max-md:h-10'/>
                    <div className='flex flex-col gap-2'>
                      {/* <p>{item.title} </p> */}
                      <p>{item.subTitle} </p>
                    </div> 
                  </td>
                  <td className='px-5 max-sm:px-4'>${item.price}</td>
                  <td className='px-5 '>{item.quantity}</td>
                  <td className='px-5 text-red-400 '><RiDeleteBin6Line onClick={()=>handleRemoveItem(item._id)} className='cursor-pointer hover:scale-110' /></td>
                </tr>
                ))
              )}
              <tr >
                <td colSpan={4} className='pt-10 duration-300 hover:scale-95' onClick={()=>dispatch(addItem(cartItems.cartDetails))}> 
                  <Link  to='/checkout' className='block w-full py-2 text-center text-white bg-black'>Checkout</Link>
                </td>
              </tr>
            </table>
          </div>
          <div className='absolute flex justify-end w-full px-10 '>
            <Link to='/my_orders'>
            <div className='flex items-center gap-1 px-2 py-1 text-red-400 duration-300 border rounded-3xl hover:scale-95 bg-slate-50'>
              <LuPackage />
              <p className='font-medium'>My Orders</p>
            </div>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
      { message !== null && <MessageBox messageTxt={message} onClick={()=>setMessage(null)} /> }
    </>
  )
}

export default CartPage