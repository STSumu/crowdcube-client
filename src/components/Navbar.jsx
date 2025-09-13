import React, { useContext, useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const Navbar = () => {
    const links=<>
       <li><NavLink to='/'>Home</NavLink></li>
       <li><NavLink to='/allCampaign'>All Campaign</NavLink></li>
       <li><NavLink to='/addCampaign'>Add new Campaign</NavLink></li>
       <li><NavLink to='/mydonation'>My Donations</NavLink></li>
    </>
    const {user,logOut}=useContext(AuthContext);
    const [bg,setbg]=useState('');
    const location=useLocation();
      useEffect(() => {
    const handleScroll = () => {
      const scrollStatus = window.scrollY > 300;

      if (!scrollStatus & location.pathname==='/') {
         setbg("bg-transparent");
      } else {
         setbg("bg-forest-matte");
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);
  const handleSignOut=()=>{
     logOut()
     .then((result)=>{

     })
     .catch((err)=>{
          
     })
  }
    return (
        <div className={`z-50 navbar shadow-sm ${bg} text-white fixed top-0 w-full px-4 md:px-10 lg:px-20`}>
  <div className="navbar-start"> 
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-cream-sage text-forest-matte *:hover:bg-forest-matte rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Crowdcube</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 font-semibold">
      {links}
    </ul>
  </div>
  <div className="navbar-end">
    {user ? <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className={`btn m-1 ${bg} shadow-none border-none`}>{user.photoURL ? <img className='w-8 h-8 rounded-full' src={user.photoURL} />:<FaUser className='w-8 h-8 text-cream-sage rounded-full'></FaUser>}</div>
  <ul tabIndex={0} className="dropdown-content menu text-forest-matte *:hover:bg-forest-matte *:hover:text-cream-sage bg-cream-sage rounded-box z-1 w-52 p-2 shadow-sm">
    <li className='flex flex-row gap-5 justify-between items-center border-b border-forest-matte'>
      {user.photoURL ? <img className="w-4 h-4 rounded-full" src={user.photoURL} alt="" />: <FaUser></FaUser>}
      <div className='flex flex-col'>
        <h3 className='font-bold'>{user.displayName}</h3>
        <p>{user.email}</p>
      </div>
    </li>
    <li><button onClick={handleSignOut}>Sign Out</button></li>
  </ul>
</div>:
<div className='space-x-2'>
   <Link to='/auth/login' className={`btn btn-xs md:btn-md bg-cream-sage text-forest-matte rounded-lg md:px-8 shadow-none border-0`}>Login</Link>
    <Link to='/auth/signUp' className={`btn btn-xs md:btn-md bg-cream-sage text-forest-matte rounded-lg md:px-8 shadow-none border-0`}>Register</Link>
</div>
}
  </div>
</div>
    );
};

export default Navbar;