import React, { useContext, useRef, useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2'
const Login = () => {
    const [showPass, setShow] = useState(false);
    const [error, setError] = useState('');
    const emailRef = useRef();
    const navigate = useNavigate();
    const errorMessages = {
  "auth/user-not-found": "No account found with this email",
  "auth/invalid-credential": "Incorrect password or Invalid email address",
};
    const { googleSignIn, emaillogin, forgetPassword } = useContext(AuthContext);
    const handleGoogleLogin = () => {
        googleSignIn()
            .then((result) => {
                Swal.fire({
                    icon: "success",
                    title: `Welcome, ${result.user.displayName || result.user.email}`,
                    showConfirmButton: false,
                    timer: 1500
                })
                    .then(() => {
                        navigate('/');
                    })

            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: errorMessages[err.code] || err.message,
                });
            })
    }
    const handleForgetPass = () => {
        const email = emailRef.current.value;
        forgetPassword(email)
            .then((result) => {
                console.log(result)
                Swal.fire({
                    icon: "success",
                    title: "Password Reset Email Sent",
                    text: "Please check your email",
                    showConfirmButton: false,
                    timer: 1500
                })

                    .then(() => {

                    })
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: errorMessages[err.code] || err.message,
                });
            })
    }
    const handlelogin = (e) => {
        e.preventDefault();
        setError('');
        const email = e.target.email.value;
        const password = e.target.password.value;
        emaillogin(email, password)
            .then((result) => {
                e.target.reset();
                setError('');
                Swal.fire({
                    icon: "success",
                    title: `Welcome ${result.user?.name || result.user?.email}`,
                    showConfirmButton: false,
                    timer: 1500
                })
                    .then(() => {
                        navigate('/');
                    })
            })
            .catch((err) => {
                console.log(err.code);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: errorMessages[err.code] || err.message,
                });
            })
    }
    return (
        <div className='w-full bg-white flex flex-col justify-center items-center px-4 py-10 md:px-10 md:py-10 rounded-lg'>
            <form onSubmit={handlelogin} className="fieldset w-full *:w-full *:rounded-lg">
                <h1 className='text-forest-matte text-center font-bold text-2xl md:text-4xl'>Log in now to continue your journey</h1>
                <label className="label text-charcoal-green font-semibold">Email</label>
                <input type="email" ref={emailRef} name='email' className="input border-charcoal-green text-charcoal-green focus:border-eucalyptus" placeholder="Email" />
                <label className="label text-charcoal-green font-semibold">Password</label>
                <div className="relative">
                    <input
                        type={showPass ? "text" : "password"}
                        name='password'
                        className="input w-full pr-12 border-charcoal-green text-charcoal-green focus:border-eucalyptus rounded-lg"
                        placeholder="Password"
                    />
                    <button
                        type="button"
                        onClick={() => setShow(!showPass)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-charcoal-green hover:text-eucalyptus transition-colors *:w-8 *:h-4"
                    >
                        {showPass ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                <div><a className="link link-hover text-eucalyptus" onClick={handleForgetPass}>Forgot password?</a></div>
                <button className="btn btn-neutral bg-eucalyptus hover:bg-charcoal-green text-white border-0 mt-4">Login</button>
            </form>
            <p className='text-sm text-gray-500 text-center my-2'>or</p>
            <button onClick={() => handleGoogleLogin()} className="w-full btn btn-neutral hover:bg-eucalyptus hover:text-white border-charcoal-green bg-white text-charcoal-green">Continue with Google <FaGoogle></FaGoogle></button>
            {error && <p className='text-red-700 text-sm mt-4'>{error}</p>}
            <p className='text-charcoal-green mt-4'>Dont have an account?<Link to='/auth/signUp' className='text-eucalyptus'>Sign Up.</Link></p>
        </div>
    );
};

export default Login;