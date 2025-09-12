import React from 'react';
import CampaignCard from '../components/CampaignCard';
import { useState } from 'react';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';

const RunningCamp = () => {
    const [campaigns,setCampaigns]=useState([]);
    useEffect(()=>{
          fetch('http://localhost:5000/runningCampaigns')
          .then(res=>res.json())
          .then(data=>{
            setCampaigns(data)})
    },[])
    
    return (
        <div className='container mx-auto px-2 md:px-8 lg:px-16 py-20'>
            <div className='flex flex-col justify-center items-center'>
              <h1 className='text-forest-matte font-bold text-2xl md:text-4xl'>Running Campaigns</h1>
              <p className='text-eucalyptus text-sm md:text-lg'>Engage with our currently running Campaigns</p>
            </div>
<Swiper 
                className='w-full'
                modules={[Autoplay, Navigation, Pagination, Scrollbar]}
                slidesPerView={3}
                loop={true}
                pagination={{type:'bullets',
                   clickable: true,
                   dynamicBullets: true,
                   
                }}
                breakpoints={{
                   320: { slidesPerView: 1, spaceBetween: 20 },
                    640: { slidesPerView: 2, spaceBetween: 25 },
                    1024: { slidesPerView: 3, spaceBetween: 50},
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
            >
                {campaigns.length === 0 ?
                    <div className='flex justify-center items-center'>
                        <h1 className='text-4xl text-gray-500'>
                            No campaigns to show.
                        </h1>
                    </div>
                    :
                    campaigns.map((campaign, idx) => (
                        <SwiperSlide key={idx} className='h-auto'>
                            <div className="pt-6 pb-6 h-full"> 
                                <CampaignCard campaign={campaign} />
                            </div>
                        </SwiperSlide>
                    ))
}
            </Swiper>
        </div>
    );
};

export default RunningCamp;