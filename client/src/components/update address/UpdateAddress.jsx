import React, { useEffect, useState } from 'react'
import SignupInput from '../signup input/SignupInput'
import MessageBox from '../message box/MessageBox'
import { IoClose } from "react-icons/io5";
import { useGetUserAddressQuery, useUpdateAddressMutation } from '../../store/api/userApi';

function UpdateAddress(prop) {
  const [message, setMessage] = useState(null)
  const [formData, setFormData] = useState({})
  const {data:addressData, isSuccess, isLoading} = useGetUserAddressQuery()
  const [updateAddress] = useUpdateAddressMutation()
  
  if(isLoading){
    return <div>Loading...</div>
  }
  useEffect(() => {
    if (isSuccess) {
      setFormData(addressData.userAddress)
    }
  }, [isSuccess, addressData])
  
  const handleChange = (e) =>{
    const {name, value} = e.target
    setFormData({...formData, [name]:value})
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    try{
      const response = await updateAddress({formData})
      if(response.error){
        setMessage(response.error.data.message)
      }
      else{
        setMessage(response.data.message)
      }
    }
    catch{
      setMessage(error.message)
    }
  }
 
  return (
    <>
      <div className='flex flex-col gap-4 items-center justify-center w-full min-h-[92vh] absolute top-0 bg-black bg-opacity-60 backdrop:blur-md'>
        <div className=' relative bg-white min-w-[450px] border flex flex-col items-center p-5 gap-5 shadow-lg rounded-md max-sm:min-w-[360px] max-xsm:min-w-[300px]'>
          <div className='absolute p-[1px] border rounded-full right-4 top-3'>
            <IoClose  className='text-lg cursor-pointer' onClick={prop.closeForm} /> 
          </div>
          <h3 className='text-2xl font-semibold'>Change Address</h3>
          <form onSubmit={handleSubmit}  className='flex flex-col w-full gap-6' >
            <SignupInput inputType='text' labelText='Address Line 1' labelName='addressLine1' value={formData?.addressLine1 || ''} onChange={handleChange}/>
            <SignupInput inputType='text' labelText='Address Line 2' labelName='addressLine2' value={formData?.addressLine2 || ''}onChange={handleChange}/>
            <SignupInput inputType='text' labelText='City' labelName='city'  value={formData?.city || ''}onChange={handleChange}/>
            <SignupInput inputType='text' labelText='Zip Code' labelName='zipCode'  value={formData?.zipCode || ''} onChange={handleChange}/>
            <SignupInput inputType='text' labelText='Country' labelName='country'  value={formData?.country || ''} onChange={handleChange}/>
            <div className='flex justify-center'>
              <button type="submit" className='self-center px-5 py-2 text-white duration-300 bg-black border rounded-lg hover:scale-95'>Change Address</button>
            </div>
          </form>
        </div>
      </div>
      { message !== null && <MessageBox messageTxt={message} onClick={()=>setMessage(null)}/>}
    </>
  )
}

export default UpdateAddress