import React from 'react';
import { Fade } from "react-awesome-reveal";
import Banner from '../components/Banner';
import RunningCamp from '../sections/RunningCamp';

const Home = () => {
    return (
       <div className='space-y-20'>
        <Banner></Banner>
        <RunningCamp></RunningCamp>
       </div>
    );
};

export default Home;