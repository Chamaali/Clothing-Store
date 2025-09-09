import React from 'react'
import NavBar from '../components/navigationBar/NavBar'
import InstagramStories from '../components/instagram stories/InstagramStories'
import CustomerTestimonial from '../components/testimonial/CustomerTestimonial'
import Footer from '../components/footer/Footer'
import SelectCategory from '../components/select cotegory/SelectCategory'

function HomePage() {
  return (
    <div>
      <NavBar />
      <div className='flex flex-col gap-40'>
        <SelectCategory />
        <InstagramStories />
        <CustomerTestimonial />
        <Footer />
      </div>
    </div>
  )
}

export default HomePage