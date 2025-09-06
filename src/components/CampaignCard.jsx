import React from 'react';
import Category from './Category';

const CampaignCard = ({campaign}) => {
    const {deadline,image,title,description,raised,goal,type}=campaign;
    const perchantage=(raised*100)/goal;
    return (
        <div className="card h-110 text-forest-matte bg-white w-full md:w-84 lg:w-96 shadow-sm hover:bg-mint-matte/30 hover:shadow-2xl hover:shadow-green-950 hover:z-50 transition-all duration-300">
  <figure className='h-2/5 w-full'>
    <img
      src={image} className='object-cover w-full h-full' />
  </figure>
  <div className="card-body h-3/5">
    <h2 className="card-title">{title}
       <div className="badge bg-eucalyptus text-white border-0 font-semibold">{type}</div>
    </h2>
    <p className='text-charcoal-green'>{description}</p>
    <p className='text-charcoal-green'>Deadline: 
        <span className='text-forest-matte font-semibold ml-1'>
            {new Date(deadline).toLocaleDateString('en-GB')}
        </span>
    </p>
    <div>
        <progress className="progress w-full bg-mint-matte text-eucalyptus" value={raised < goal ? raised : goal} max={goal}></progress>
        <div className='font-semibold text-lg flex justify-between'>
            <h5>Raised:{raised}$</h5>
            <h5 className='text-eucalyptus font-bold'>{Number(perchantage > 100 ? 100 : perchantage).toFixed(2)}%</h5>
        </div>
    </div>
    <div className="card-actions justify-start">
      <button className="btn btn-lg text-white bg-eucalyptus hover:bg-forest-matte border-0 shadow-md hover:shadow-lg transition-all duration-200">
        Donate Now
      </button>
      </div>
  </div>
</div>
    );
};

export default CampaignCard;