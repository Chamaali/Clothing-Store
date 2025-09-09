import React, { useState } from 'react'
import SignupInput from '../signup input/SignupInput'


function AddressForm({onSubmitData}) {
  const [validationErrors, setValidationErrors] = useState({})
  const handleSubmit = (e) =>{
    e.preventDefault()
    const formData = {
        addressLine1: e.target.addressLine1.value,
        addressLine2: e.target.addressLine2.value,
        city: e.target.city.value,
        zipCode: e.target.zipCode.value,
        country: e.target.country.value,
    }

    const newErrors = {}

    if(!formData.addressLine1.trim()){
        newErrors.addressLine1 = 'Address Line 1  is required'
    }

    if(!formData.addressLine2.trim()){
        newErrors.addressLine2 = 'Address Line 2  is required'
    }
    
    if(!formData.city.trim()){
        newErrors.city = 'City is required'
    }
    
    if(!formData.zipCode.trim()){
        newErrors.zipCode = 'Zip Code is required'
    }

    if(!formData.country.trim()){
        newErrors.country = 'Country is required'
    }

    setValidationErrors(newErrors)
    
    if(Object.keys(newErrors).length === 0){
        console.log('formData', formData)
        onSubmitData(formData)
    }
  }
  return (
    <>
    <form onSubmit={handleSubmit}  className='flex flex-col w-full gap-6' >
      <SignupInput inputType='text' labelText='Address Line 1' labelName='addressLine1' errMsg={validationErrors.addressLine1} />
      <SignupInput inputType='text' labelText='Address Line 2' labelName='addressLine2' errMsg={validationErrors.addressLine2}  />
      <SignupInput inputType='text' labelText='City' labelName='city' errMsg={validationErrors.city}  />
      <SignupInput inputType='text' labelText='Zip Code' labelName='zipCode' errMsg={validationErrors.zipCode}/>
      <SignupInput inputType='text' labelText='Country' labelName='country' errMsg={validationErrors.country}/>
      <div className='flex justify-center'>
        <button type="submit" className='self-center px-5 py-2 text-white duration-300 bg-black border rounded-lg hover:scale-95'>Signup</button>
      </div>
    </form>
    </>
  )
}

export default AddressForm