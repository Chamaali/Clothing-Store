import React, { useState } from 'react';
import NavBar from '../components/navigationBar/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import UserDetailsForm from '../components/user details form/UserDetailsForm';
import { useSignupUserMutation } from '../store/api/userApi';
import MessageBox from '../components/message box/MessageBox';
import SignupInput from '../components/signup input/SignupInput';

function SignupPage() {
  const [userData, setUserData] = useState(null);
  const [signupDetails] = useSignupUserMutation();
  const [message, setMessage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate(); // 🔑 for redirect

  const handleUserData = (userFormData) => {
    setUserData(userFormData);
  };

  // 🟢 Address form submit
  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      addressLine1: e.target.addressLine1.value,
      addressLine2: e.target.addressLine2.value,
      city: e.target.city.value,
      zipCode: e.target.zipCode.value,
      country: e.target.country.value,
    };

    const newErrors = {};
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address Line 1 is required';
    if (!formData.addressLine2.trim()) newErrors.addressLine2 = 'Address Line 2 is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip Code is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';

    setValidationErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const userAllDetails = { ...userData, address: { ...formData } };
      const response = await signupDetails(userAllDetails);

      if (response.error) {
        setMessage(response.error.data.message);
      } else {
        setMessage(response.data.message);

        // 🔑 Redirect to login after success
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className='flex flex-col gap-4 items-center justify-center w-full min-h-[92vh] '>
        <div className='min-w-[450px] border flex flex-col items-center p-5 gap-5 shadow-lg rounded-md max-sm:min-w-[360px] max-xsm:min-w-[300px]'>
          <h3 className='text-2xl font-semibold'>Signup</h3>

          {userData ? (
            <form onSubmit={handleAddressSubmit} className='flex flex-col w-full gap-6'>
              <SignupInput inputType='text' labelText='Address Line 1' labelName='addressLine1' errMsg={validationErrors.addressLine1} />
              <SignupInput inputType='text' labelText='Address Line 2' labelName='addressLine2' errMsg={validationErrors.addressLine2} />
              <SignupInput inputType='text' labelText='City' labelName='city' errMsg={validationErrors.city} />
              <SignupInput inputType='text' labelText='Zip Code' labelName='zipCode' errMsg={validationErrors.zipCode} />
              <SignupInput inputType='text' labelText='Country' labelName='country' errMsg={validationErrors.country} />
              <div className='flex justify-center'>
                <button type="submit" className='self-center px-5 py-2 text-white duration-300 bg-black border rounded-lg hover:scale-95'>
                  Signup
                </button>
              </div>
            </form>
          ) : (
            <UserDetailsForm onSubmitData={handleUserData} />
          )}
        </div>

        <Link to='/login'>
          <p className='text-base'>
            Already have an account? <button className='text-base font-bold text-buttonColor'>Login</button>
          </p>
        </Link>
      </div>

      {message !== null && <MessageBox messageTxt={message} onClick={() => setMessage(null)} />}
    </>
  );
}

export default SignupPage;
