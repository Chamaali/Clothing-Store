import React, { useState } from 'react'
import { useDeleteByIdMutation } from '../../store/api/adminApi'
import MessageBox from '../message box/MessageBox'
import { Link } from 'react-router-dom'

function ItemsCard({details}) {
  const [message, setMessage] = useState(null)
  const  [deleteById] = useDeleteByIdMutation()
  
  const handleDelete = async(id) =>{
    try {
      const response = await deleteById(id)
      if (response.error) {
        setMessage(response.error.data.message)
      } else {
        setMessage(response.data.message)
      }
    } catch (error) {
      setMessage(error.message)
    }
  }
  
  return (
    <>
    <div className='flex flex-col justify-between gap-2 p-4 rounded-md shadow-lg bg-slate-50 max-lg:p-2'>
      <div className='flex justify-center'>
        <img src={details.image} alt={details.subTitle} className='object-cover w-40 h-40 rounded-md'/>
      </div>
      <div className='text-sm '>
        <h3>{details.title}</h3>
        <h4>{details.subTitle}</h4>
        <h4 className='font-semibold '>${details.price}</h4>
      </div>
      <div className='flex items-end justify-between text-sm text-white '>
        <Link to={`/update_cloth/${details._id}`}><button className='px-2 py-1 bg-green-600 rounded-[4px] hover:scale-105 duration-300'>Update</button></Link>
        <button className='px-2 py-1 bg-red-600 rounded-[4px] hover:scale-105 duration-300' onClick={()=>{handleDelete(details._id)}}>Delete</button>
      </div>
    </div>
    { message !== null && <MessageBox messageTxt={message} onClick={()=>setMessage(null)} /> }
    </>
  )
}

export default ItemsCard