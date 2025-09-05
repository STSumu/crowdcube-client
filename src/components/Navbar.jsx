import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const links=<>
       <li><NavLink to='/'>Home</NavLink></li>
       <li><NavLink to='/allCampaign'>All Campaign</NavLink></li>
       <li><NavLink to='/newCampaign'>Add new Campaign</NavLink></li>
       <li><NavLink to='/mydonation'>My Donations</NavLink></li>
    </>
    const [bg,setbg]=useState('');
      useEffect(() => {
    const handleScroll = () => {
      const scrollStatus = window.scrollY > 300;

      if (!scrollStatus) {
         setbg("bg-transparent");
      } else {
         setbg("bg-forest-matte");
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);
    return (
        <div className={`z-50 navbar shadow-sm ${bg} text-white fixed top-0 w-full`}>
  <div className="navbar-start"> 
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
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
    <button className={`btn btn-md md:btn-lg bg-cream-sage text-forest-matte rounded-4xl md:px-8 shadow-none border-0`}>Login</button>
  </div>
</div>
    );
};

export default Navbar;