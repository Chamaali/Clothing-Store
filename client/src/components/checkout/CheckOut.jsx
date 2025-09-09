import React, { useState } from 'react'
import NavBar from '../../components/navigationBar/NavBar'
import CheckOutItems from './CheckOutItems';
import CheckOutProceed from './CheckOutProceed';
import Footer from '../footer/Footer'
import { FaEdit } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { checkoutSliceSelector } from '../../store/slices/checkoutSlice';
import { useGetUserAddressQuery, usePlaceOrderMutation } from '../../store/api/userApi';
import UpdateAddress from '../update address/UpdateAddress';
import MessageBox from '../message box/MessageBox';

function CheckOut() {
  const [message, setMessage] = useState(null)
  const [showChangeAddress, setShowChangeAddress] = useState(false)
  const checkoutItems = useSelector(checkoutSliceSelector)
  const itemsArray = checkoutItems.items[0]
  const {data:addressData, isSuccess, isError, error} = useGetUserAddressQuery()
  
  const handleChangeAddress = () =>{
    setShowChangeAddress(!showChangeAddress)
  }
  
  if(isError){
    return <>
    <NavBar /> 
    <div className=' h-[92vh] flex flex-col justify-between '>
      <div className='flex items-center justify-center w-full h-full text-2xl'>
        {error.data.message}
      </div>
      <Footer />
      </div>
    </>
  }
  
  return (
    <>
      <NavBar />
      <div className='flex flex-col justify-between min-h-[92vh]  gap-10'>
      <div className='flex flex-col gap-8 px-10 py-10'>
        <h2 className='text-3xl font-semibold'>Checkout</h2>
        <div className='flex justify-between max-lg:flex-col max-lg:gap-10 max-lg:items-center'>
          <CheckOutItems items={itemsArray}/>
          <div className='flex flex-col gap-5'>
            {isSuccess && (
            <div className='flex justify-between p-2 border'>
              <div className=''>
                <p>{addressData.userAddress.addressLine1}</p>
                <p>{addressData.userAddress.addressLine2}</p>
                <p>{addressData.userAddress.city}, {addressData.userAddress.country}</p>
                <p>{addressData.userAddress.zipCode}</p>
              </div>
              <FaEdit onClick={handleChangeAddress} className='cursor-pointer '/>
            </div>
            )}
            {isSuccess && (
            <CheckOutProceed address={addressData.userAddress} items={itemsArray}/>
          )}
          </div>
        </div>
      </div>
      <Footer />
      </div>
      { showChangeAddress && <UpdateAddress closeForm={handleChangeAddress}/>}
      { message !== null && <MessageBox messageTxt={message} onClick={()=>setMessage(null)} />}
    </>
  )
}

export default CheckOut
