import React from 'react'

function AdminInputFields(prop) {
  return (
    <div className='flex flex-col '>
      <label htmlFor={prop.lblName}>{prop.lblName}</label>
      <input type={prop.inputType}  id={prop.lblName}  placeholder={prop.example} name={prop.name} onChange={prop.onChange} value={prop.value} className='border-b-2 border-black border-opacity-40 focus:outline-none' required/>
    </div>
  )
}

export default AdminInputFields