import React from 'react';
import NavBar from '../components/navigationBar/NavBar';
import ContactForm from '../components/contact form/ContactForm';

function ContactPage() {
  return (
    <div>
      <NavBar />
      <div className='flex flex-col gap-12 px-6 py-16 max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>Contact Us</h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Have a question or feedback? We'd love to hear from you. Send us a
            message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Two Column Layout - Image Left, Form Right */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch'>
          {/* Left Side - Image */}
          <div className='relative h-full min-h-[600px] rounded-lg overflow-hidden shadow-md'>
            <img
              src='https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=1000&fit=crop'
              alt='Contact Us - Fashion Store'
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-black bg-opacity-20 flex items-end p-8'>
              <div className='text-white'>
                <h3 className='text-3xl font-bold mb-2'>We're Here to Help</h3>
                <p className='text-lg'>Our team is ready to assist you with any questions about our clothing collection.</p>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className='bg-white p-8 rounded-lg shadow-md h-full flex flex-col'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>Get in Touch</h2>
            <ContactForm />
          </div>
        </div>

        {/* Additional Contact Info */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-8'>
          <div className='text-center'>
            <h3 className='text-xl font-semibold mb-2'>Email</h3>
            <p className='text-gray-600'>support@clothingstore.com</p>
          </div>
          <div className='text-center'>
            <h3 className='text-xl font-semibold mb-2'>Phone</h3>
            <p className='text-gray-600'>+1 (555) 123-4567</p>
          </div>
          <div className='text-center'>
            <h3 className='text-xl font-semibold mb-2'>Address</h3>
            <p className='text-gray-600'>123 Fashion Street, Style City, ST 12345</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
