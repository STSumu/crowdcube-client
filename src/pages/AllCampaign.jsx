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
    <div className="overflow-x-auto py-20 px-4 md:px-8 lg:px-20">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Campaign</th>
        <th>Job</th>
        <th>Favorite Color</th>
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
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
          Zemlak, Daniel and Leannon
          <br />
          <span className="badge badge-ghost badge-sm">{camp.type}</span>
        </td>
        <td>Purple</td>
        <th>
          <Link key={idx} className="btn btn-ghost btn-xs" to={`/campaignDetails/${camp._id}`}>details</Link>
        </th>
      </tr>
      )
      }
      </tbody>
    <tfoot>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </tfoot>
  </table>
</div>
  )
}
export default AllCampaign;