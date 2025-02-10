import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div >

      <div className='text-center text-2xl pt-10 text-[#707070]' >
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className=' font-semibold text-lg text-gray-600'>OUR OFFICE :- M3M SCO plot no. 70. 
                                                                            Sector 85 gurgaon. 
                                                                            Pin code - 122004</p>
         
          <p className=' font-semibold text-lg text-gray-600'>CAREERS AT SwasthyaPro</p>
          <p className=' text-gray-500'>At SwasthyaPro, we are pioneering the future of healthcare by seamlessly integrating cutting-edge technology with essential medical expertise.
             Our mission is to revolutionize the medical landscape, making healthcare more accessible, efficient, and effective for everyone. 
             With a robust platform powered by advanced algorithms and the latest in AI technology, SwasthyaPro provides medical professionals and patients with innovative tools designed to improve outcomes and personalize care.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
          <p>Learn more about our teams and job openings.</p>
        </div>
      </div>

    </div>
  )
}

export default Contact
