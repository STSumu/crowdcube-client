import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SignUp = () => {
    return (
        <div className='w-full mt-6 bg-white flex flex-col justify-center items-center px-4 py-10 md:px-10 md:py-15 rounded-lg'>
            <form className="fieldset w-full *:w-full *:rounded-lg">
                <h1 className='text-forest-matte text-center font-bold text-2xl md:text-4xl'>Sign Up now to start your journey</h1>
          <label className="label text-charcoal-green font-semibold">Name</label>
          <input type="text" className="input border-charcoal-green text-charcoal-green focus:border-eucalyptus" placeholder="Name" />
          <label className="label text-charcoal-green font-semibold">Email</label>
          <input type="email" className="input border-charcoal-green text-charcoal-green focus:border-eucalyptus" placeholder="Email" />
          <label className="label text-charcoal-green font-semibold">Password</label>
          <input type="password" className="input border-charcoal-green text-charcoal-green focus:border-eucalyptus" placeholder="Password" />
          <label className="label text-charcoal-green font-semibold">Confirm Password</label>
          <input type="password" className="input border-charcoal-green text-charcoal-green focus:border-eucalyptus" placeholder="Password" />
          <button className="btn btn-neutral bg-eucalyptus text-white border-0 mt-4">Sign Up</button>
                    <p className='text-sm text-gray-500 text-center my-2'>or</p>
          <button className="btn btn-neutral border-charcoal-green bg-white text-charcoal-green">Continue with Google<FaGoogle></FaGoogle></button>
        </form>
        <p className='text-charcoal-green mt-7'>Already have an account?<Link to='/auth/login' className='text-eucalyptus'>Login</Link> here.</p>
        </div>
    );
};

export default SignUp;