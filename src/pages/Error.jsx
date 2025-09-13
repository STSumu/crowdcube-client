import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className='bg-cream-sage min-h-screen flex flex-col justify-center items-center'>

         <DotLottieReact
      src='/Error.lottie'
      loop
      autoplay
      className='w-full md:w-2/3'
    />
       <div className='text-center space-y-10'>
        <p className='text-4xl font-semibold text-eucalyptus'>Oops! Page Not Found</p>
            <Link to='/' className='btn bg-charcoal-green text-cream-sage'>Go Home</Link>
       </div>
    </div>
  );
};

export default Error;