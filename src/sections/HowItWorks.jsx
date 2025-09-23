import React, { useEffect, useState } from "react";
import Threads from "../assets/Threads";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import AOS from "aos";
import "aos/dist/aos.css";
import { Slide, Fade } from "react-awesome-reveal";
import { Autoplay, Mousewheel, Navigation, Pagination } from "swiper/modules";

const HowItWorks = () => {
  const [selectedStep, setSelectedStep] = useState(0);

  const steps = [
    {
      title: "Register",
      description:
        "Create your free account in seconds. Just enter your basic details and verify your email to unlock the full potential of our fundraising platform.",
      images: [
        "https://i.ibb.co.com/1GpMJyHw/register1.png",
        "https://i.ibb.co.com/hxSpvqHM/register2.png",
      ],
    },
    {
      title: "Login",
      description:
        "Securely access your personal dashboard with your credentials. Your campaigns, donations, and progress are all waiting for you in one organized space.",
      images: [
        "https://i.ibb.co.com/QvV2qTpt/login1.png",
        "https://i.ibb.co.com/0phRLbdd/login2.png",
      ],
    },
    {
      title: "Start a Campaign",
      description:
        "Bring your cause to life! Add compelling images, write your story, set your fundraising goal, and launch your campaign to start making a difference.",
      images: [
        "https://i.ibb.co.com/zTg82HPN/add1.png",
        "https://i.ibb.co.com/2Ycb8zNn/add2.png",
        "https://i.ibb.co.com/ymKzRyJZ/add3.png",
      ],
    },
    {
      title: "Track your Campaigns",
      description:
        "Monitor your campaign's success in real-time. View donation progress, see supporter messages, and watch as you get closer to achieving your goal.",
      images: [
        "https://i.ibb.co.com/zWjnNtgb/my-Campaign1.png",
        "https://i.ibb.co.com/N21rN1K4/my-Campaign2.png",
      ],
    },
    {
      title: "Update",
      description:
        "Keep your supporters engaged with regular updates. Share progress photos, thank donors, or adjust your campaign details whenever needed.",
      images: [
        "https://i.ibb.co.com/XfxG7gpq/update1.png",
        "https://i.ibb.co.com/N2HWCxJm/update2.png",
      ],
    },
    {
      title: "Delete",
      description:
        "Have complete control over your campaigns. Easily remove campaigns that are no longer active or relevant with just a few clicks.",
      images: ["https://i.ibb.co.com/KcTRd7J3/delete1.png"],
    },
    {
      title: "Explore",
      description:
        "Discover inspiring campaigns from your community. Browse different causes, find campaigns that resonate with you, and see how others are making an impact.",
      images: [
        "https://i.ibb.co.com/0jmWFVcD/all-Campaign1.png",
        "https://i.ibb.co.com/zHFrYT0K/all-Campaign2.png",
      ],
    },
    {
      title: "See Details",
      description:
        "Get the full story behind each campaign. View detailed information, read updates from campaigners, and see exactly how your donation will be used.",
      images: [
        "https://i.ibb.co.com/GvTqxSLS/details1.png",
        "https://i.ibb.co.com/kV9kVfSY/details2.png",
      ],
    },
    {
      title: "Donate",
      description:
        "Make a difference with secure, easy donations. Choose your amount, add a personal message, and contribute to causes that matter to you.",
      images: [
        "https://i.ibb.co.com/V0qvvKMk/donate1.png",
        "https://i.ibb.co.com/vC0VHmT5/donate2.png",
        "https://i.ibb.co.com/TxRJjNrH/donate3.png",
      ],
    },
    {
      title: "Track Your Donations",
      description:
        "Keep track of your generosity. View all your past donations, see campaign updates from causes you've supported, and watch your impact grow over time.",
      images: [
        "https://i.ibb.co.com/q3CHH0hx/my-Donation1.png",
        "https://i.ibb.co.com/wZdYhHjN/my-Donation2.png",
      ],
    },
  ];
  return (
    <div className="px-2 pt-5 md:px-10 lg:px-25 mt-20">
      <Fade
        cascade
        damping={0.5}
        className="flex flex-col justify-center items-center gap-2 mb-5"
      >
        <h2 className="text-forest-matte font-bold text-2xl md:text-4xl">
          Running Campaigns
        </h2>
        <p className="text-eucalyptus text-sm md:text-lg">
          Engage with our currently running Campaigns
        </p>
      </Fade>
      <div className="min-h-screen bg-transparent flex flex-col lg:flex-row items-center gap-20 lg:justify-between ">
        {/* steps*/}
        <div data-aos="slide-right" className="w-full lg:w-1/3 z-20 flex flex-col items-center justify-center">
          <ul className="steps steps-horizontal w-full lg:steps-vertical">
            {steps.map((step, index) => (
              <li
                key={index}
                className={`step transition-all duration-300 text-lg italic ${
                  index < selectedStep
                    ? "step-custom text-charcoal-green after:!bg-eucalyptus before:!bg-eucalyptus"
                    : index === selectedStep
                    ? "step-custom text-eucalyptus before:!bg-eucalyptus after:!bg-eucalyptus font-bold"
                    : " text-mint-matte before:!bg-mint-matte/30 after:!bg-mint-matte/30"
                }`}
              >
                {step.title}
              </li>
            ))}
          </ul>
        </div>

        {/* carousel*/}
        <div data-aos="slide-left" className="w-full lg:w-2/3 z-20 flex flex-col items-center justify-center">
          <Swiper
            direction={"vertical"}
            autoHeight={true}
            pagination={{
              clickable: true,
            }}
            spaceBetween={30}
            centeredSlides={true}
            mousewheel={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Autoplay, Mousewheel, Pagination]}
            className="mySwiper w-full"
            onSlideChange={(swiper) => {
              let currentSlideindex = swiper.activeIndex;
              let count = 0;
              for (let i = 0; i < steps.length; i++) {
                if (currentSlideindex < count + steps[i].images.length) {
                  setSelectedStep(i);
                  break;
                }
                count += steps[i].images.length;
              }
            }}
          >
            {steps.map((step, idx) =>
              step.images.map((img, imgIdx) => (
                <SwiperSlide key={`${idx}-${imgIdx}`}>
                  <div className="h-full w-full p-2">
                    <img
                      src={img}
                      alt={`${step.title}-${imgIdx}`}
                      className="rounded-xl shadow-lg h-full object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))
            )}
          </Swiper>

          <Slide
            key={`${selectedStep}-${Date.now()}`}
            direction="up"
            triggerOnce={false}
            className="mt-8 text-sm md:text-xl text-eucalyptus font-semibold"
          >
            {steps[selectedStep].description}
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
