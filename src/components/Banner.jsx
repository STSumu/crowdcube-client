import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import Marquee from "react-fast-marquee";
import "swiper/css";
import 'swiper/css/effect-fade';
import "swiper/css/navigation";
import "swiper/css/pagination";
import { GiHealthNormal } from "react-icons/gi";
import { RiGraduationCapLine } from "react-icons/ri";
import { FaFirstAid, FaHandsHelping, FaLeaf, FaMicrochip, FaPalette,FaPaw } from "react-icons/fa";
import Loading from './../pages/Loading';
import { Fade } from "react-awesome-reveal";
import { Link } from 'react-router-dom';

const Banner = () => {
  const [selectedIdx, setSelectedIdx] =useState(0);
  const [categories,setCategories]=useState([]);
  const [loading,setLoading]=useState(true);
  const iconMap = {
  RiGraduationCapLine: <RiGraduationCapLine />,
  GiHealthNormal: <GiHealthNormal />,
  FaMicrochip: <FaMicrochip />,
  FaPalette: <FaPalette />,
  FaHandsHelping: <FaHandsHelping />,
  FaLeaf: <FaLeaf />,
  FaPaw: <FaPaw />,
  FaFirstAid: <FaFirstAid />,
};
  const swiperRef = useRef(null);
useEffect(()=>{
  fetch('https://crowdcube-server-plum-delta.vercel.app/categories')
  .then((res)=>res.json())
  .then((data)=>{setCategories(data),
    setLoading(false);
  })
},[])
  if(loading) return <Loading></Loading>
  return (
    <div className="relative bg-charcoal-green">
      <Swiper
        modules={[EffectFade,Autoplay,Pagination]}
        effect={'fade'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setSelectedIdx(swiper.realIndex)}
       
      >
        {categories.map((cat, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="hero min-h-screen relative top-0 z-0 flex flex-col justify-center"
              style={{
                backgroundImage: `url(${cat.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="hero-overlay bg-black/40 absolute inset-0 z-10"></div>
              <div className="hero-content text-neutral-content text-center relative z-20">
                <div className="max-w-md">
                  <Fade key={selectedIdx} cascade damping={0.5} triggerOnce>
 <h1 className="mb-5 text-5xl font-bold text-cream-sage font-display">
                    {cat.headline}
                  </h1>
                  <p className="mb-5 text-mint-matte text-lg italic">{cat.subtitle}</p>
                  <Link to='/addCampaign' className="btn btn-lg bg-forest-matte text-cream-sage shadow-lg rounded-4xl border-none shadow-[#0b1515]">
                    Get Started
                  </Link>
</Fade>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Marquee as Thumbnails */}
      <div className="absolute bottom-0 w-full">
        <Marquee speed={100} gradient={false} pauseOnHover={true} className="bg-transparent">
          {categories.map((category, idx) => (
            <div
              key={idx}
              className={`stat text-cream-sage flex border-r border-white cursor-pointer px-4 py-2 transition-colors duration-300 ${
                idx === selectedIdx ? 'bg-forest-matte' : 'bg-transparent'
              }`}
              onClick={() => {
                setSelectedIdx(idx);
                swiperRef.current?.slideToLoop(idx, 500);
              }}
            >
              <div className="stat-figure text-lg md:text-4xl opacity-50">{iconMap[category.icon]}</div>
              <div className="stat-value opacity-80 text-lg md:text-3xl">{category.title}</div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Banner;
