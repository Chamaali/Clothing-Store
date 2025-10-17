import React from 'react'
// NavBar is provided by RootLayout
import InstagramStories from '../components/instagram stories/InstagramStories'
import CustomerTestimonial from '../components/testimonial/CustomerTestimonial'
import Footer from '../components/footer/Footer'
import SelectCategory from '../components/select cotegory/SelectCategory'

function HomePage() {
  return (
    <div>
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