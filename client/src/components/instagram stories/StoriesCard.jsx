import React from 'react'

function StoriesCard(prop) {
  const Icon = prop.icon
  return (
    <div className='flex flex-col gap-10 rounded-md shadow-md max-w-max bg-slate-50'>
      <img src={prop.imgUrl} alt={prop.hedingText} className='object-fill w-64 h-64 max-w-full border rounded-t-md max-md:w-60 max-md:h-60'/>
      <div className='flex flex-col gap-2 p-3 max-md:p-2'>
        <Icon className='text-3xl '/>
        <h4 className='font-semibold '>{prop.hedingText}</h4>
        <p className='text-sm '>{prop.descText}</p>
      </div>
    </div>
  )
}

export default StoriesCard