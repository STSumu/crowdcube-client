import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import Marquee from "react-fast-marquee";
import "swiper/css";
import 'swiper/css/effect-fade';
import "swiper/css/navigation";
import "swiper/css/pagination";
import edu from '../assets/education.jpg'
import emergency from '../assets/emergency.jpg'
import animal from '../assets/animals.avif'
import community from '../assets/community.jpeg'
import environment from '../assets/environment.jpg'
import health from '../assets/health.jpg'
import tech from '../assets/tech.jpg'
import art from '../assets/art.jpeg'
import { GiHealthNormal } from "react-icons/gi";
import { RiGraduationCapLine } from "react-icons/ri";
import { FaFirstAid, FaHandsHelping, FaLeaf, FaMicrochip, FaPalette,FaPaw } from "react-icons/fa";

const Banner = () => {
  const [selectedIdx, setSelectedIdx] =useState(0);
const swiperRef = useRef(null);
  const categories=[
        {
            idx:1,
            title:'Education',
            headline: 'Empower Learning',
            subtitle: 'Support scholarships and school projects to unlock brighter futures.',
            image:edu,
            icon:<RiGraduationCapLine></RiGraduationCapLine>,
        },
        {
            idx:2,
            title:'Health',
            headline: 'Give the Gift of Healing',
            subtitle: 'Fund medical treatments and health campaigns that save lives.',
            image:health,
            icon:<GiHealthNormal />
,
        },
        {
            idx:3,
            title:'Technology',
    headline: 'Back Innovation',
    subtitle: 'Support gadgets, startups, and tech shaping tomorrow’s world.',
            image:tech,
            icon:<FaMicrochip></FaMicrochip>,
        },
        {
            idx:4,
            title:'Art & Culture',
                headline: 'Fuel Creativity',
    subtitle: 'Bring films, music, and cultural projects to life with your support.',
            image:art,
            icon:<FaPalette></FaPalette>,
        },
        {
            idx:5,
            title:'Community & Social Causes',
                  headline: 'Stronger Together',
    subtitle: 'Support local development and NGOs building better communities.',
            image:community,
            icon:<FaHandsHelping></FaHandsHelping>,
        },
        {
            idx:6,
            title:'Environment',
    headline: 'Protect Our Planet',
    subtitle: 'Join sustainability and green initiatives for a cleaner future.',
            image:environment,
            icon:<FaLeaf></FaLeaf>,
        },
        {
            idx:7,
            title:'Animals & Wildlife',
            headline: 'Care for Animals',
    subtitle: 'Protect wildlife and provide rescue and care for animals in need.',
            image:animal,
            icon:<FaPaw></FaPaw>,
        },
        {
            idx:8,
            title:'Emergency Relief',
            headline: 'Act in Crisis',
    subtitle: 'Bring urgent relief to communities facing disasters and emergencies.',
            image:emergency,
            icon:<FaFirstAid></FaFirstAid>,
        },
    ]
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
                  <h1 className="mb-5 text-5xl font-bold text-cream-sage font-display">
                    {cat.headline}
                  </h1>
                  <p className="mb-5 text-mint-matte text-lg italic">{cat.subtitle}</p>
                  <button className="btn btn-lg bg-forest-matte text-cream-sage shadow-lg rounded-4xl border-none shadow-[#0b1515]">
                    Get Started
                  </button>
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
              <div className="stat-figure text-lg md:text-4xl opacity-50">{category.icon}</div>
              <div className="stat-value opacity-80 text-lg md:text-3xl">{category.title}</div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Banner;
