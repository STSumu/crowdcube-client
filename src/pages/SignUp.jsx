import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [error,setError]=useState('');
    const handleSignUp=(e)=>{
         e.preventDefault();
         const name=e.target.name.value;
         const email=e.target.email.value;
         const password=e.target.password.value;
         const confirmpass=e.target.confirmpass.value;
         console.log(name,email,password,confirmpass);
         const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
         if(password !== confirmpass)
            return;
         if(!passwordRegex.test(password))
            setError('Password must contain at least one lowercase,one uppercase,one digit,one character(@,$,!,%,*,?,&) and must be of at least 6 character')
    }
    return (
        <div className='w-full mt-6 bg-white flex flex-col justify-center items-center px-4 py-10 md:px-10 md:py-15 rounded-lg'>
            <form onSubmit={handleSignUp} className="fieldset w-full *:w-full *:rounded-lg">
                <h1 className='text-forest-matte text-center font-bold text-2xl md:text-4xl'>Sign Up now to start your journey</h1>
          <label className="label text-charcoal-green font-semibold">Name</label>
          <input type="text" name='name' className="input border-charcoal-green text-charcoal-green focus:border-eucalyptus" placeholder="Name" />
          <label className="label text-charcoal-green font-semibold">Email</label>
          <input type="email" name='email' className="input border-charcoal-green text-charcoal-green focus:border-eucalyptus" placeholder="Email" />
          <label className="label text-charcoal-green font-semibold">Password</label>
          <input type="password" name='password' className="input border-charcoal-green text-charcoal-green focus:border-eucalyptus" placeholder="Password" />
          <label className="label text-charcoal-green font-semibold">Confirm Password</label>
          <input type="password" name='confirmpass' className="input border-charcoal-green text-charcoal-green focus:border-eucalyptus" placeholder="Password" />
          <button className="btn btn-neutral bg-eucalyptus text-white border-0 mt-4">Sign Up</button>
                    <p className='text-sm text-gray-500 text-center my-2'>or</p>
          <button className="btn btn-neutral border-charcoal-green bg-white text-charcoal-green">Continue with Google<FaGoogle></FaGoogle></button>
        </form>
        <p className='text-charcoal-green mt-7'>Already have an account?<Link to='/auth/login' className='text-eucalyptus'>Login</Link> here.</p>
        </div>
    );
};

export default SignUp;