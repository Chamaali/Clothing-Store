import React from 'react'

function AdminButton(prop) {
  return (
    <div>
      <button className={`${prop.isActive ? 'bg-red-400 lg:hover:bg-black' : 'bg-black lg:hover:bg-red-400'} px-2 py-1 text-white duration-300  rounded-md min-w-20  hover:scale-95`} onClick={prop.onClick}>{prop.btnText}</button>
    </div>
  )
}

export default AdminButton