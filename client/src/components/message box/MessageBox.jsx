import React from 'react'
import { Link } from 'react-router-dom'

function MessageBox(prop) {
  return (
    <div className='fixed w-[100vw] h-[100vh] top-0 flex justify-center items-center bg-white  bg-opacity-50 backdrop:blur-lg left-0'  >
      <div className='flex  w-[400px] h-[250px] rounded-xl relative items-end justify-end  shadow-xl max-md:w-[300px] max-md:h-[200px] bg-black '>
        <div className='absolute flex items-center justify-center w-full h-full px-2 text-xl font-semibold text-center text-white'>
          <h3>{prop.messageTxt}</h3>
        </div>
        <div className='relative flex m-5 '>
          <Link to={prop.link}><button className='px-3 py-1 font-medium duration-200 border rounded-md bg-slate-50 hover:scale-95' onClick={prop.onClick}>Ok</button></Link>
        </div>
      </div>
    </div>
  )
}

export default MessageBox