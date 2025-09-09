import React, { useEffect, useReducer, useState } from 'react'
import AdminNavBar from '../../components/admin navigation/AdminNavBar'
import AdminInputFields from '../../components/AdminDashBoard/AdminInputFields'
import { useGetByIdQuery, useUpdateByIdMutation } from '../../store/api/adminApi'
import { useParams } from 'react-router-dom'
import MessageBox from '../../components/message box/MessageBox'

function UpdateCloth() {
  const {id} = useParams()
  const {data:clothData} = useGetByIdQuery(id)
  const [updateData] = useUpdateByIdMutation()
  const [message, setMessage] = useState(null)

  useEffect(()=>{
    if(clothData){
      dispatch({ type: 'setCategory', payload: clothData.clothDetails.category });
      dispatch({ type: 'setSubCategory', payload: clothData.clothDetails.subCategory });
      dispatch({ type: 'setTitle', payload: clothData.clothDetails.title });
      dispatch({ type: 'setSubTitle', payload: clothData.clothDetails.subTitle });
      dispatch({ type: 'setPrice', payload: clothData.clothDetails.price });
      dispatch({ type: 'setDescription', payload: clothData.clothDetails.clothDiscription });
    }
  },[clothData])

  const reducer = (state, action)=>{
    switch(action.type){
      case 'setCategory' : return {...state, category:action.payload}
      case 'setSubCategory' : return {...state, subCategory:action.payload}
      case 'setTitle' : return {...state, title:action.payload}
      case 'setSubTitle' : return {...state, subTitle:action.payload}
      case 'setPrice' : return {...state, price:action.payload}
      case 'setDescription' : return {...state, clothDiscription:action.payload}
      default :  return state;
    }
  }
  
  const [state, dispatch] = useReducer(reducer, {
    category: "",
    subCategory: "",
    title: "",
    subTitle: "",
    price: 0,
    clothDiscription: "",
  })

  const handleUpdate = async(e) =>{
    e.preventDefault();
    try{
      const response = await updateData({id:id,body:state})
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
    <>
    <AdminNavBar/>
    <div className='relative min-h-[92vh] mt-[8vh] ' >
      <div className='absolute w-full h-full bg-cover opacity-70 bg-adminBg' ></div>
      <div className='relative flex items-center justify-center min-h-[92vh] '  >
        <form onSubmit={handleUpdate}  action="" className='bg-slate-200 lg:w-[700px] flex flex-col p-5 gap-5 rounded-lg md:w-[500px] w-[320px]'>
          <div className='flex justify-center text-2xl font-semibold'>
            <h3>Update Cloth</h3>
          </div>
          <AdminInputFields value={state.category} onChange={(e)=>dispatch({type:'setCategory', payload:e.target.value})}  inputType='text' lblName="Category" name="category" example="Men"/>
          <AdminInputFields value={state.subCategory} onChange={(e)=>dispatch({type:'setSubCategory', payload:e.target.value})}  inputType='text' lblName="Sub Category" name="subCategory" example="T-Shirt"/>
          <AdminInputFields value={state.title} onChange={(e)=>dispatch({type:'setTitle', payload:e.target.value})}  inputType='text' lblName="Title" name="title" example="YK Disney"/>
          <AdminInputFields value={state.subTitle} onChange={(e)=>dispatch({type:'setSubTitle', payload:e.target.value})}  inputType='text' lblName="Sub Title" name="subTitle" example="Red Printed T-Shirty"/>
          <AdminInputFields value={state.price} onChange={(e)=>dispatch({type:'setPrice', payload:e.target.value})}  inputType='number' lblName="Price" name="price" example="$30.00"/>
          <div className='flex flex-col '>
            <label htmlFor='clothDescription'>Description</label>
            <textarea value={state.clothDiscription} onChange={(e)=>dispatch({type:'setDescription', payload:e.target.value})}  name="clothDescription" id='clothDescription'   rows="2" className='border-b-2 border-black border-opacity-40 focus:outline-none' />
          </div>
          <div>
            <button className='px-4 py-1 text-white duration-200 bg-black border rounded-md hover:scale-95'>Update</button>
          </div>
        </form>
      </div>
    </div>
    { message !== null && <MessageBox messageTxt={message} onClick={()=>setMessage(null)} />}
    </>
  )
}

export default UpdateCloth