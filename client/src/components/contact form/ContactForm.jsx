import React, { useState } from 'react';

function ContactForm() {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = (formData) => {
    const newErrors = {};

    // Validate name
    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'Name is required';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || formData.email.trim() === '') {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate message
    if (!formData.message || formData.message.trim() === '') {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    // Validate form
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    // If no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);

      try {
        // Submit to Web3Forms
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: 'ec277385-3182-47dd-bced-266d7a4cfeec',
            name: formData.name,
            email: formData.email,
            message: formData.message,
          })
        });

        const result = await response.json();

        if (result.success) {
          // Success - Clear form
          e.target.reset();
          setSuccessMessage('Thank you for contacting us! We will get back to you soon.');
          setErrors({});
        } else {
          throw new Error('Form submission failed');
        }

      } catch (error) {
        console.error('Error submitting contact form:', error);
        alert('Something went wrong. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-6 w-full'
    >
      {successMessage && (
        <div className='p-4 bg-green-100 border border-green-400 text-green-700 rounded-md'>
          {successMessage}
        </div>
      )}

      <div className='flex flex-col gap-2'>
        <label className='font-medium text-gray-700 mb-1'>Full Name</label>
        <input
          name='name'
          type='text'
          placeholder='Enter your full name'
          className={`border focus:outline-none py-2 px-3 rounded-md ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.name && (
          <p className='text-sm text-red-500'>{errors.name}</p>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <label className='font-medium text-gray-700 mb-1'>Email</label>
        <input
          name='email'
          type='email'
          placeholder='Enter your email address'
          className={`border focus:outline-none py-2 px-3 rounded-md ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && (
          <p className='text-sm text-red-500'>{errors.email}</p>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <label className='font-medium text-gray-700'>Message</label>
        <textarea
          name='message'
          placeholder='Enter your message'
          rows={6}
          className={`border focus:outline-none py-2 px-3 rounded-md resize-none ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.message && (
          <p className='text-sm text-red-500'>{errors.message}</p>
        )}
      </div>

      <button
        type='submit'
        disabled={isSubmitting}
        className='px-5 py-2 text-white duration-300 bg-black border rounded-lg hover:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

export default ContactForm;
