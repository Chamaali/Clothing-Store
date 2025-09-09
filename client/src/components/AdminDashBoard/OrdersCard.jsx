import React from 'react'
import testImg from '../../assets/main.png'
function OrdersCard() {
  return (
    <div className='flex items-center justify-between p-2 rounded-md shadow-lg lg:p-2 bg-slate-100 md:p-6'>
      <div>
        <img src={testImg} alt="test" className='h-36 w-36 max-sm:h-24 max-sm:w-24'/>
      </div>
      <div className='text-sm '>
        <h4>Dayawasa</h4>
        <p>Bibilegame</p>
        <p>Passara</p>
        <p>90500</p>
      </div>
      <div className='text-sm '>
        <h4>Total : $50</h4>
        <p>Items : 2</p>
      </div>
      <div className=' max-md:text-sm'>
        <button className='px-2 py-1 text-white duration-200 bg-green-600 rounded-md hover:scale-95 '>Done</button>
        <p>Pending...</p>
      </div>
    </div>
  )
}

export default OrdersCard