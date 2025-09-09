import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { checkoutSliceSelector } from '../../store/slices/checkoutSlice'
import MessageBox from '../message box/MessageBox'
import { useGetUserAddressQuery, usePlaceOrderMutation } from '../../store/api/userApi';

function CheckOutProceed(props) {
  const [message, setMessage] = useState(null)
  const checkoutSlice = useSelector(checkoutSliceSelector)
  const subTotal = checkoutSlice.subTotal
  const deliveryCharge = checkoutSlice.deliveryCharge
  const grandTotal = checkoutSlice.grandTotal
  
  const [orderDetails] = usePlaceOrderMutation()

  const handlePlaceOrder = async() =>{
    try{
      const response = await orderDetails({address:props.address, items:props.items, grandTotal})
      console.log(response)
      if(response.error){
        setMessage(response.error.data.message)
      }
      else{
        setMessage(response.data.message)
      }
    }
    catch(error){
      setMessage(error.message)
    }
  }
  
  return (
    <div className='flex flex-col gap-5 p-5 border w-80'>
      <div className='flex justify-between pb-2 font-semibold border-b'>
        <h4>Sub Total</h4>
        <h4>${subTotal}</h4>
      </div>
      <div className='flex justify-between pb-2 border-b'>
        <h4>Delivery Charge</h4>
        <h4>${deliveryCharge}</h4>
      </div>
      <div className='flex justify-between font-semibold'>
        <h4>Grand Total</h4>
        <h4>${grandTotal}</h4>
      </div>
      <button className='py-2 mt-5 text-white duration-300 bg-black rounded-md hover:scale-95' onClick={handlePlaceOrder}>Place Order</button>
      { message !== null && <MessageBox messageTxt={message} onClick={()=>setMessage(null)} link='/my_orders' />}
    </div>
  )
}

export default CheckOutProceed