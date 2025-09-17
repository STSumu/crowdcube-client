import React from 'react';
import Category from './Category';
import { Link } from 'react-router-dom';

const CampaignCard = ({campaign}) => {
    const {_id,deadline,image,title,description,raised,goal,type}=campaign;
    const percentage=(raised*100)/goal;
    
    return (
        <div className="card text-forest-matte bg-white w-full md:w-84 lg:w-96 shadow-sm hover:bg-mint-matte/30 hover:shadow-2xl hover:shadow-green-950 hover:z-50 transition-all duration-300 h-full flex flex-col">
            <figure className='flex-shrink-0 h-48 w-full'>
                <img src={image} className='object-cover w-full h-full' />
            </figure>
            
            <div className="card-body flex-1 flex flex-col p-6">
                <h2 className="card-title text-forest-matte mb-2">{title}
                    <div className="badge bg-eucalyptus text-white border-0 font-semibold">{type}</div>
                </h2>
                
                <p className='text-charcoal-green mb-3 flex-1'>{description}</p>
                
                <p className='text-charcoal-green mb-4'>Deadline: 
                    <span className='text-forest-matte font-semibold ml-1'>
                        {new Date(deadline).toLocaleDateString('en-GB')}
                    </span>
                </p>
                
                <div className='mb-4'>
                    <progress className="progress w-full bg-mint-matte text-eucalyptus mb-2" value={raised < goal ? raised : goal} max={goal}></progress>
                    <div className='font-semibold text-lg flex justify-between'>
                        <h5 className="text-forest-matte">Raised: ${raised.toLocaleString()}</h5>
                        <h5 className='text-eucalyptus font-bold'>{Number(percentage > 100 ? 100 : percentage).toFixed(1)}%</h5>
                    </div>
                </div>
                
                <div className="card-actions justify-start mt-auto">
                    <Link to={`/campaignDetails/${_id}`} className="btn btn-lg text-white bg-eucalyptus hover:bg-forest-matte border-0 shadow-md hover:shadow-lg transition-all duration-200">
                        See More
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CampaignCard;