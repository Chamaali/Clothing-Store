import React, { useRef } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import TestimonialCard from './TestimonialCard';
import CustomButtonGroup from './CustomButtonGroup';

const responsive = {
  superLargeDesktop: { breakpoint: { max: 5000, min: 1280 }, items: 3 },
  desktop: { breakpoint: { max: 1280, min: 920 }, items: 3 },
  tablet: { breakpoint: { max: 920, min: 564 }, items: 2 },
  mobile: { breakpoint: { max: 564, min: 0 }, items: 1 }
};

function CustomerTestimonial() {
  
  const carouselRef = useRef(null)

  const next = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  }

  const previous = () => {
    if (carouselRef.current) {
      carouselRef.current.previous();
    }
  }

  return (
    <div className='p-5 px-10 bg-gray-100 max-md:px-5'>
      <div className='flex justify-between max-md:flex-col'>
        <h3 className='text-3xl max-md:text-2xl'>What our Customers say</h3>
        <CustomButtonGroup next={next} previous={previous} />
      </div>
      <div>
        <Carousel
          ref={carouselRef}
          responsive={responsive}
          swipeable={false}
          draggable={false}
          showDots={false}
          autoPlay={false}
          keyBoardControl={true}
          ssr={true}
          arrows={false}
          className='flex w-full mt-10 '
        >
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
        </Carousel>
      </div>
    </div>
  );
}

export default CustomerTestimonial;