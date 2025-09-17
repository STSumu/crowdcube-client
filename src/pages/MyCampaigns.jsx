import React, { useContext, useEffect, useState } from 'react'
import { Typewriter } from 'react-simple-typewriter'
import Loading from './Loading';
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { FaPen, FaTrash } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip'


const MyCampaigns = () => {

 const [campaigns,setCampaings]=useState([]);
 const {user}=useContext(AuthContext);
 const [loading,setLoading]=useState(true);
 useEffect(()=>{
    fetch(`http://localhost:5000/myCampaign/${user?.email}`)
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
  <table className="table bg-mint-matte/10 border border-charcoal-green/20">
    {/* head */}
    <thead>
      <tr className='font-bold text-charcoal-green text-xl'>
        <th>Campaign</th>
        <th>Category</th>
        <th>Fund Raised</th>
        <th>Deadline</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        campaigns.map((camp,idx)=>
        <tr key={idx}>
        <td>
          <Link to={`/campaign/${camp._id}`}>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={camp.image}
                  alt="Campaign Image" />
              </div>
            </div>
            <div>
              <div className="font-bold font-display text-2xl">{camp.title}</div>
            </div>
          </div>
          </Link>
        </td>
        <td>
          <span className="badge badge-md bg-charcoal-green text-cream-sage border-0 shadow-none text-xl p-2">{camp.type}</span>
        </td>
        <td>${camp.raised}</td>
        <td>{camp.deadline}</td>
        <th className='*:shadow-none *:border-0 space-x-4 flex'>
          <Link key={idx} data-tooltip-id="my-tooltip" data-tooltip-content="Update" className="btn btn-md bg-eucalyptus text-cream-sage" to={`/campaign/${camp._id}`}><FaPen></FaPen></Link>
          <Link key={idx} data-tooltip-id="my-tooltip" data-tooltip-content="Delete" className="btn btn-md bg-red-700 text-cream-sage" ><FaTrash></FaTrash></Link>
          <Tooltip id="my-tooltip" />
        </th>
        
      </tr>
      )
      }
      </tbody>
    <tfoot>
      <tr>
        <th><Link to='/' className='btn bg-eucalyptus text-white shadow-none border-0'>Go Home</Link></th>
      </tr>
    </tfoot>
  </table>
</div>
  )
}
export default MyCampaigns;