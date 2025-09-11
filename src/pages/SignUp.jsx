import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const SignUp = () => {
    const [error, setError] = useState('');
    const [showPass,setShow]=useState(false);
    const [showPass2,setShow2]=useState(false);
    const {emailSignUp,googleSignIn}=useContext(AuthContext);
    const navigate=useNavigate();
    const handleSignUp = (e) => {
        e.preventDefault();
        setError('');
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmpass = e.target.confirmpass.value;
        console.log(name, email, password, confirmpass);
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        if (password !== confirmpass) {
            setError("Password don't match");
            return;
        }

        if (!passwordRegex.test(password)) {
            setError('Password must contain at least one lowercase,one uppercase,one digit,one character(@,$,!,%,*,?,&) and must be of at least 6 character');
            return;
        }
        emailSignUp(email,password)
        .then((result)=>{
             navigate('/auth/login');
        })
        .catch((err)=>{
            setError(err.message);
        })
    }
    const handleGoogleSignUp=()=>{
        googleSignIn()
          .then((result)=>{

          })
          .catch((err)=>{})
    }
    return (
        <div className='w-full bg-white flex flex-col justify-center items-center px-4 py-10 md:px-10 md:py-10 rounded-lg'>
            <form onSubmit={handleSignUp} className="fieldset w-full *:w-full *:rounded-lg">
                <h1 className='text-forest-matte text-center font-bold text-2xl md:text-4xl'>Sign Up now to start your journey</h1>
                <label className="label text-charcoal-green font-semibold">Name</label>
                <input type="text" name='name' className="input border-charcoal-green text-charcoal-green focus:border-eucalyptus" placeholder="Name" />
                <label className="label text-charcoal-green font-semibold">Email</label>
                <input type="email" name='email' className="input border-charcoal-green text-charcoal-green focus:border-eucalyptus" placeholder="Email" required />
                    <label className="label text-charcoal-green font-semibold">Password</label>
                    <div className="relative">
                        <input 
                            type={showPass ? "text" : "password"} 
                            name='password' 
                            className="input w-full pr-12 border-charcoal-green text-charcoal-green focus:border-eucalyptus rounded-lg" 
                            placeholder="Confirm Password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShow(!showPass)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-charcoal-green hover:text-eucalyptus transition-colors *:w-8 *:h-4"
                        >
                            {showPass ? <FaEyeSlash/> : <FaEye/>}
                        </button>
                    </div>
                    <label className="label text-charcoal-green font-semibold">Confirm Password</label>
                    <div className="relative">
                        <input 
                            type={showPass2 ? "text" : "password"} 
                            name='confirmpass' 
                            className="input w-full pr-12 border-charcoal-green text-charcoal-green focus:border-eucalyptus rounded-lg" 
                            placeholder="Confirm Password" 
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShow2(!showPass2)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-charcoal-green hover:text-eucalyptus transition-colors *:w-8 *:h-4"
                        >
                            {showPass2 ? <FaEyeSlash/> : <FaEye/>}
                        </button>
                    </div>
                <button className="btn btn-neutral bg-eucalyptus hover:bg-charcoal-green text-white border-0 mt-4">Sign Up</button>
                
            </form>
            <p className='text-sm text-gray-500 text-center my-2'>or</p>
                <button className="btn btn-neutral w-full border-charcoal-green bg-white text-charcoal-green hover:bg-eucalyptus hover:text-white" onClick={handleGoogleSignUp}>Continue with Google<FaGoogle></FaGoogle></button>
            {error && <p className='text-red-700 text-sm mt-4'>{error}</p>}
            <p className='text-charcoal-green mt-4'>Already have an account?<Link to='/auth/login' className='text-eucalyptus'>Login</Link> here.</p>
        </div>
    );
};

export default SignUp;