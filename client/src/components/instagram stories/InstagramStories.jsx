import React from 'react'
import { storyData } from './storyData'
import StoriesCard from './StoriesCard'

function InstagramStories() {
  return (
    <div className='flex flex-col gap-10 px-10 max-md:items-center max-md:px-5'>
      <h3 className='text-3xl text-center max-md:text-2xl'>Our Instagram Stories</h3>
      <div className='flex flex-wrap justify-around gap-y-10 lg:justify-between xl:justify-around'>
        {storyData?.map((story,index)=>(
            <StoriesCard key={index} {...story}/>
        ))}
      </div>
    </div>
  )
}

export default InstagramStories