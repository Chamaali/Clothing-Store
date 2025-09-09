import React, { useReducer, useState } from 'react'
import AdminNavBar from '../../components/admin navigation/AdminNavBar'
import AdminInputFields from '../../components/AdminDashBoard/AdminInputFields'
import { useAddClothMutation } from '../../store/api/adminApi'
import MessageBox from '../../components/message box/MessageBox'

function AddCloth() {
  const [message, setMessage] = useState(null)
  const [addData] = useAddClothMutation()
  const reducer = (state, action)=>{
    switch(action.type){
      case 'setCategory' : return {...state, category:action.payload}
      case 'setSubCategory' : return {...state, subCategory:action.payload}
      case 'setTitle' : return {...state, title:action.payload}
      case 'setSubTitle' : return {...state, subTitle:action.payload}
      case 'setPrice' : return {...state, price:action.payload}
      case 'setDescription' : return {...state, clothDiscription:action.payload}
      case 'setImgURL' : return {...state, imgURL:action.payload}
      case 'resetForm':
        return {
          category: "",
          subCategory: "",
          title: "",
          subTitle: "",
          price: 0,
          imgURL: "",
          clothDiscription: "",
        };
      default :  return state;
    }
  }
  
  const [state, dispatch] = useReducer(reducer, {
    category: "",
    subCategory: "",
    title: "",
    subTitle: "",
    price: 0,
    imgURL: "",
    clothDiscription: "",
  })


  const handleImgChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload = () => {
      dispatch({ type: 'setImgURL', payload: reader.result });
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  
  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      const response = await addData(state)
      if(response.error){
        setMessage(response.error.data.message)
      } else {
        setMessage(response.data.message)
        dispatch({type: 'resetForm'})
      }
    }catch(error) {
      setMessage(error.message);
    }
  }
  
  
  return (
    <>
    <AdminNavBar/>
    <div className='relative min-h-[92vh] mt-[8vh] ' >
      <div className='absolute w-full h-full bg-cover opacity-70 bg-adminBg' ></div>
      <div className='relative flex items-center justify-center min-h-[92vh] '  >
        <form  onSubmit={handleSubmit} action="" className='bg-slate-200 lg:w-[700px] flex flex-col p-5 gap-5 rounded-lg md:w-[500px] w-[320px]'>
          <div className='flex justify-center text-2xl font-semibold'>
            <h3>Add New Cloth</h3>
          </div>
          <AdminInputFields onChange={(e)=>dispatch({type:'setCategory', payload:e.target.value})} inputType='text' lblName="Category" name="category" example="Men" value={state.category} />
          <AdminInputFields onChange={(e)=>dispatch({type:'setSubCategory', payload:e.target.value})} inputType='text' lblName="Sub Category" name="subCategory" example="T-Shirt" value={state.subCategory} />
          <AdminInputFields onChange={(e)=>dispatch({type:'setTitle', payload:e.target.value})} inputType='text' lblName="Title" name="title" example="YK Disney" value={state.title} />
          <AdminInputFields onChange={(e)=>dispatch({type:'setSubTitle', payload:e.target.value})} inputType='text' lblName="Sub Title" name="subTitle" example="Red Printed T-Shirty" value={state.subTitle} />
          <AdminInputFields onChange={(e)=>dispatch({type:'setPrice', payload:e.target.value})} inputType='number' lblName="Price" name="price" example="$30.00" value={state.price} />
          <AdminInputFields  onChange={handleImgChange}  placeholder='Image' labelName='Cloth Image' name='imgURL' inputType='file' accept='image/*' />
          <div className='flex flex-col '>
            <label htmlFor='clothDescription'>Description</label>
            <textarea onChange={(e)=>dispatch({type:'setDescription', payload:e.target.value})} name="clothDescription" id='clothDescription'   rows="2" className='border-b-2 border-black border-opacity-40 focus:outline-none' />
          </div>
          <div>
            <button className='px-4 py-1 text-white duration-200 bg-black border rounded-md hover:scale-95'>Add</button>
          </div>
        </form>
      </div>
    </div>
    { message !== null && <MessageBox messageTxt={message} onClick={()=>setMessage(null)}/>}
    </>
  )
}

export default AddCloth