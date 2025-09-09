import React, { useState } from 'react'
import SignupInput from '../signup input/SignupInput';


function UserDetailsForm({onSubmitData}) {
    const [validationErrors, setValidationErrors] = useState({})

    const handleSignup = (e) => {
      e.preventDefault();
      const formData = {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        email: (e.target.email.value).toLowerCase(),
        phoneNumber: e.target.phoneNumber.value,
        password: e.target.password.value,
        confirmPassword: e.target.confirmPassword.value
      };
  
      const newErrors = {};
  
      if(!formData.firstName.trim()){
        newErrors.firstName = 'First name is required'
      }
  
      if(!formData.lastName.trim()){
        newErrors.lastName = 'Last name is required'
      }
  
      if(!formData.email.trim()){
        newErrors.email = 'Email  is required'
      }else if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)){
        newErrors.email = 'Email is not valid'
      }
  
      if (!formData.phoneNumber.trim()) {
        newErrors.phoneNumber = 'Phone number is required';
      } else if (!/^\d+$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = 'Phone number must contain only numbers';
      } else if (formData.phoneNumber.length !== 10) {
        newErrors.phoneNumber = 'Phone number must be 10 digits long';
      }
      
      if(!formData.password.trim()) {
        newErrors.password = 'Password is required'
      }else if(formData.password.length < 8) {
        newErrors.password = 'Use at least 8 characters, one uppercase letter, one lowercase letter, one number, and one symbol in your password'
      }
      else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{"':;?/>.<,])/.test(formData.password)) {
        newErrors.password = 'Use at least 8 characters, one uppercase letter, one lowercase letter, one number, and one symbol in your password';
      }
  
      if(!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = 'Confirm password is required'
      }else if(formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
  
      setValidationErrors(newErrors)
  
      if (Object.keys(newErrors).length === 0) {
        onSubmitData(formData)
      }
    }
    
  return (
    <form onSubmit={handleSignup} className='flex flex-col w-full gap-6'>
      <SignupInput inputType='text' labelText='First Name' labelName='firstName' errMsg={validationErrors.firstName} />
      <SignupInput inputType='text' labelText='Last Name' labelName='lastName' errMsg={validationErrors.lastName} />
      <SignupInput inputType='text' labelText='Email' labelName='email' errMsg={validationErrors.email} />
      <SignupInput inputType='text' labelText='Phone Number' labelName='phoneNumber' errMsg={validationErrors.phoneNumber} />
      <SignupInput inputType='password' labelText='Password' labelName='password' type="password" errMsg={validationErrors.password} />
      <SignupInput inputType='password' labelText='Confirm Password' labelName='confirmPassword' type="password" errMsg={validationErrors.confirmPassword} />
      <div className='flex justify-end'>
        <button type="submit" className='self-center px-5 py-2 text-white duration-300 bg-black border rounded-lg hover:scale-95'>Next</button>
      </div>
    </form>
  )
}

export default UserDetailsForm