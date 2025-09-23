import React from 'react';
import { Fade } from "react-awesome-reveal";
import Banner from '../components/Banner';
import RunningCamp from '../sections/RunningCamp';
import HowItWorks from '../sections/HowItWorks';
import Review from '../sections/Review';

const Home = () => {
    return (
       <div className=''>
        <Banner></Banner>
        <HowItWorks></HowItWorks>
        <RunningCamp></RunningCamp>
        <Review></Review>
       </div>
    );
};

export default Home;