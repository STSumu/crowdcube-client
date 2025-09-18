import React, { useContext, useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import Loading from "./Loading";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FaPen, FaTrash } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import Swal from 'sweetalert2'

const MyCampaigns = () => {
  const [campaigns, setCampaings] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();
  useEffect(() => {
    fetch(`http://localhost:5000/myCampaign/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setCampaings(data);
        setLoading(false);
      });
  });
  const timeLeft=(date)=>{
    const now=new Date();
    const deadline=new Date(date);
 const remaining = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
  return remaining > 0 ? `${remaining} day(s)` : 'Expired';
  }
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete the campaign?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7FB069",
      cancelButtonColor: "#C85A54",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/campaign/${id}`, {
      method: "DELETE",
    })
    .then((result)=>{
      if(result.ok){
      Swal.fire({
          title: "Deleted!",
          text: "Your Campaign has been deleted.",
          icon: "success",
          confirmButtonColor:'#7FB069'
        });
      }
      else{
        Swal.fire({
          title: "Opps!",
          text: "Something went wrong.Please try again.",
          icon: "error",
        });
      }
    })
        
      }
    });

    
  };
  const handleUpdate=(id)=>{
    Swal.fire({
      title: "Update the campaign?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7FB069",
      cancelButtonColor: "#C85A54",
      confirmButtonText: "Yes",
    })
    .then((result) => {
      if (result.isConfirmed) {
          navigate(`/updateCampaign/${id}`)
      }})
  }
  if (loading) return <Loading></Loading>;
  return (
    <div
      className="min-h-screen py-20 px-4 md:px-8 lg:px-25 mt-10 mb-10 space-y-5"
      style={{
        backgroundImage: `url(/tablebg.png)`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="text-center mb-8">
  <h1 className="text-3xl lg:text-4xl font-bold text-charcoal-green mb-4">
    <Typewriter
      words={['Track Your Campaigns']}
      loop={0}
      cursor
      cursorStyle='|'
      typeSpeed={70}
      deleteSpeed={50}
      delaySpeed={1500}
    />
  </h1>
  <p className="text-forest-matte text-lg">Monitor and update your active fundraising campaigns</p>
</div>
                      <Tooltip id="my-tooltip" className="z-50"style={{ backgroundColor: "#2C3E2D", color: "#F4F6F0", font:'bold' }}/>
<div className="overflow-x-auto bg-mint-matte/15 border border-charcoal-green/20 rounded-lg">
    <table className="table w-full">
        <thead>
          <tr className="font-bold text-charcoal-green text-xl">
            <th>Campaign</th>
            <th>Category</th>
            <th>Progress</th>
            <th>Time Left</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {        
          campaigns.map((camp) => (
            <tr key={camp._id}>
              <td>
                <Link to={`/campaign/${camp._id}`}>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={camp.image} alt="Campaign Image" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold font-display text-xl text-forest-matte lg:text-2xl">
                        {camp.title}
                      </div>
                    </div>
                  </div>
                </Link>
              </td>
              <td ><span className="text-charcoal-green font-semibold text-lg">
  {camp.type}
</span>
              </td>
              <td><div className="flex flex-col">
                {Math.round((camp.raised*100)/camp.goal)}%
                <progress className="progress w-20 bg-mint-matte text-charcoal-green" value={Math.round((camp.raised*100)/camp.goal)} max="100"></progress>
</div></td>
              <td>{timeLeft(camp.deadline)}</td>
<td>
  <div className={`p-2 rounded-xl text-center font-bold ${
    camp.raised >= camp.goal 
      ? 'bg-eucalyptus text-cream-sage' 
      : new Date(camp.deadline) < new Date() 
        ? 'bg-[#C85A54] text-cream-sage' 
        : 'bg-forest-matte text-cream-sage'
  }`}>
    {camp.raised >= camp.goal ? 'Completed' : new Date(camp.deadline) < new Date() ? 'Expired' : 'Active'}
  </div>
</td>
              <th><div className="*:shadow-none *:border-0 space-x-4 flex items-center">
                <button
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Update"
                  className="btn btn-md bg-eucalyptus hover:bg-charcoal-green/90 shadow-sm text-cream-sage"
                  onClick={()=>handleUpdate(camp._id)}
                >
                  <FaPen></FaPen>
                </button>
                <button
                  onClick={() => handleDelete(camp._id)}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Delete"
                  className="btn btn-md bg-danger hover:bg-[#b0504b] shadow-sm text-cream-sage"
                >
                  <FaTrash></FaTrash>
                </button>
              </div></th>
            </tr>
          ))}
        </tbody>
        
      </table>
      </div>
            <div className="flex flex-col justify-center items-center gap-5 text-center">
            <h1 className="font-bold text-2xl text-forest-matte">Add new camapaign to start funding your idea or emergency now.</h1>
          <Link to='/addCampaign' className="btn bg-eucalyptus shadow-none border-0 text-white">Add Campaign</Link></div>
    </div>
  );
};
export default MyCampaigns;
