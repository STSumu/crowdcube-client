import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const DonatedCampaign = ({ donatedCampaign,flex }) => {
  const [campaign, setCampaign] = useState({});
  const { donationTime, amount } = donatedCampaign;
  useEffect(() => {
    fetch(`http://localhost:5000/campaigns/${donatedCampaign.campaignId}`)
      .then((res) => res.json())
      .then((data) => setCampaign(data));
  }, []);
  const { title, image, _id,raised,goal,deadline} = campaign;
  const date=new Date();
  let status='';
  if(deadline < date){
    status='Expired';
  }
  else if(raised === goal){
    status='Completed';
  }
  else{
    status='Active';
  }
  return (
    <div className={`card md:card-side border md:h-72 shadow-sm text-charcoal-green ${flex ? 'md:flex-row-reverse bg-gradient-to-r from-mint-matte to-eucalyptus border-eucalyptus/50' 
        : 'md:flex-row bg-gradient-to-r from-cream-sage to-eucalyptus/50 border-charcoal-green/30 '
    }`} data-aos={`${flex ? "fade-right" : "fade-left"}`}>
      <figure className="md:w-2/5 h-full p-2">
    <img
      src={image || '/bg4.png'}
      alt="Campaign"
      className="w-full h-full object-cover rounded-lg"
    />
  </figure>
      <div className="card-body md:w-3/5">
        <h2 className="card-title">{title}
            <span className={`px-2 py-1 rounded text-xs font-bold ${
      status === 'Completed' ? 'bg-eucalyptus text-cream-sage' :
      status === 'Expired' ? 'bg-[#C85A54] text-cream-sage' :
      'bg-forest-matte text-cream-sage'
    }`}>
      {status}
    </span>
        </h2>
        <div className="space-y-3">
  <div className="flex justify-between items-center">
    <span><strong>Donated:</strong> ${amount}</span>
    
  </div>
  
  <p><strong>Date:</strong> {new Date(donationTime).toLocaleDateString()}</p>
  
  <div className="space-y-1">
    <div className="flex justify-between text-sm">
      <span>Progress</span>
      <span>{Math.round((raised * 100) / goal)}%</span>
    </div>
    <progress 
      className={`progress w-full ${flex ? 'text-cream-sage' : 'text-charcoal-green'}`}
      value={Math.round((raised * 100) / goal)} 
      max={100}
    />
    <div className="flex justify-between text-xs opacity-50">
      <span>${raised} raised</span>
      <span>${goal} goal</span>
    </div>
  </div>
</div>

        <div className="card-actions justify-start">
          <Link to={`/campaign/${_id}`} className="btn btn-primary bg-eucalyptus text-cream-sage font-bold shadow-sm border-0 hover:bg-charcoal-green">See Details</Link>
        </div>
      </div>
    </div>
  );
};

export default DonatedCampaign;
