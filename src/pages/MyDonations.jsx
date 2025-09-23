import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import DonatedCampaign from '../components/DonatedCampaign';
import { Typewriter } from 'react-simple-typewriter';

const MyDonations = () => {
    const [campaigns,setCampaigns]=useState([]);
    const {user}=useContext(AuthContext);
     useEffect(()=>{
        fetch(`http://localhost:5000/donation/${user.email}`)
        .then(res=>res.json())
        .then(data=>setCampaigns(data))
    },[])
    return (
        <div className='min-h-screen px-4 md:px-8 lg:px-25 pb-10 pt-25 flex flex-col items-center' style={{
        backgroundImage: `url(/tablebg.png)`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}>
            <div className="text-center mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-charcoal-green mb-4">
                      <Typewriter
                        words={["Your Donations", "Keep it Up", "Support a cause"]}
                        loop={0}
                        cursor
                        cursorStyle="|"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                      />
                    </h1>
                    <p className="text-forest-matte text-lg">
                      Be the reason of someones happiness
                    </p>
                  </div>
            <div className='space-y-5 lg:w-4/5 *:w-full '>
                {
                campaigns.map((campaign,idx)=><DonatedCampaign donatedCampaign={campaign} flex={idx % 2 === 1} key={campaign._id}></DonatedCampaign>)
            }
            </div>
        </div>
    );
};

export default MyDonations;