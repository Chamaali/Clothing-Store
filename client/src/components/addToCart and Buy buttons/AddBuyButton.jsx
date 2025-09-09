import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAddToCartMutation } from '../../store/api/userApi';
import MessageBox from '../message box/MessageBox';


function AddBuyButton(prop) {
  const Icon = prop.icon;
  const [clothData] = useAddToCartMutation()
  const [message, setMessage] = useState(null)
  
  const handleClick = async() => {
    if (prop.isAddTocart) {
      try{
        const response = await clothData(prop.body)
        console.log(response)
        if(response.error){
          setMessage(response.error.data.message)
        }
        else{
          setMessage(response.data.message)
        }
      }
      catch(error) {
        setMessage(error.message);
      }
    } else {
      prop.onClick()
    }
  }
  
  return (
    <>
    <Link to={prop.link}>
      <div className={`flex items-center p-1 text-white bg-blue-600 rounded-full`} onClick={handleClick}>
        <div className={`p-1 text-pink-600 bg-white border rounded-full`}>
          {Icon && <Icon />}
        </div>
        <div className='w-full text-center max-md:text-sm'>
          <p>{prop.btnTxt}</p>
        </div>
      </div>
      { message !== null && <MessageBox messageTxt={message} onClick={()=>setMessage(null)}/>}
    </Link>
    </>
  )
}

export default AddBuyButton;
