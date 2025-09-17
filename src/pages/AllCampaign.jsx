import React, { useEffect, useState } from 'react'
import { Typewriter } from 'react-simple-typewriter'
import Loading from './Loading';
import { Link } from 'react-router-dom';

const AllCampaign = () => {

 const [campaigns,setCampaings]=useState([]);
 const [loading,setLoading]=useState(true);
 useEffect(()=>{
    fetch('http://localhost:5000/campaigns')
    .then((res)=>res.json())
    .then((data)=>{
        setCampaings(data);
        setLoading(false);
    })
 })
  if(loading) return <Loading></Loading>
  return (
    <div className="overflow-x-auto min-h-screen py-20 px-4 md:px-8 lg:px-25 mt-10 mb-10" style={{backgroundImage:`url(/tablebg.png)`,
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover'
    }}>
  <table className="table bg-mint-matte/10 border border-charcoal-green/20 text-charcoal-green">
    {/* head */}
    <thead>
      <tr>
        <th>Campaign</th>
        <th>Category</th>
        <th>Organizer</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        campaigns.map((camp,idx)=>
        <tr key={idx}>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={camp.image}
                  alt="Campaign Image" />
              </div>
            </div>
            <div>
              <div className="font-bold">{camp.title}</div>
            </div>
          </div>
        </td>
        <td>
          <span className="text-lg font-semibold">{camp.type}</span>
        </td>
        <td>{camp.userName}</td>
        <th>
          <Link key={idx} className="btn btn-md hover:bg-charcoal-green text-cream-sage bg-eucalyptus" to={`/campaign/${camp._id}`}>See details</Link>
        </th>
      </tr>
      )
      }
      </tbody>
    <tfoot>
      <tr>
        <th><Link to='/'>Go Home</Link></th>
      </tr>
    </tfoot>
  </table>
</div>
  )
}
export default AllCampaign;