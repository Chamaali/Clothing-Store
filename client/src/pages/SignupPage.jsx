import React, { useState } from 'react';
import NavBar from '../components/navigationBar/NavBar';
import { Link } from 'react-router-dom';
import UserDetailsForm from '../components/user details form/UserDetailsForm';
import AddressForm from '../components/address form/AddressForm';
import { useSignupUserMutation } from '../store/api/userApi';
import MessageBox from '../components/message box/MessageBox';

function SignupPage() {
  const [userData, setUserData] = useState(null)
  const [signupDetails] = useSignupUserMutation()
  const [message, setMessage] = useState(null)
  
  const handleUserData = (userFormData) => {
     setUserData(userFormData)
  }

  const handleAddressData = async(address) =>{
    const userAllDetails = {...userData, address:{...address}}
    const response = await signupDetails(userAllDetails)
    if(response.error){
      setMessage(response.error.data.message)
    }
    else {
      setMessage(response.data.message)
    }
  }
  
  return (
    <>
      <NavBar />
      <div className='flex flex-col gap-4 items-center justify-center w-full min-h-[92vh] '>
        <div className='min-w-[450px] border flex flex-col items-center p-5 gap-5 shadow-lg rounded-md max-sm:min-w-[360px] max-xsm:min-w-[300px]'>
          <h3 className='text-2xl font-semibold'>Signup</h3>
          { userData ? <AddressForm onSubmitData={handleAddressData}/> : <UserDetailsForm onSubmitData={handleUserData}/>}
        </div>
        <Link to='/login'><p className='text-base '>Already have an account? <button className='text-base font-bold text-buttonColor'>Login</button></p></Link>
      </div>
      { message !== null && <MessageBox messageTxt={message} onClick={()=>setMessage(null)}/>}
    </>
  );
}

export default SignupPage;
