import React, { useContext, useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FaPen, FaTrash } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import Swal from 'sweetalert2'

const MyCampaigns = () => {
  const [campaigns, setCampaings] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`http://localhost:5000/myCampaign/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setCampaings(data);
        setLoading(false);
      });
  });
  const handleDelete = (id) => {
    console.log(id)
    Swal.fire({
      title: "Are you sure you want to delete the campaign?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7FB069",
      cancelButtonColor: "#b22424",
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
<div className="overflow-x-auto bg-mint-matte/10 border border-charcoal-green/20 rounded-lg">
    <table className="table w-full">
        <thead>
          <tr className="font-bold text-charcoal-green text-xl">
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
                      <div className="font-bold font-display text-2xl">
                        {camp.title}
                      </div>
                    </div>
                  </div>
                </Link>
              </td>
              <td ><div className="rounded-lg bg-charcoal-green text-cream-sage border-0 shadow-none text-xl p-2">
                  {camp.type} </div>
              </td>
              <td>${camp.raised}</td>
              <td>{camp.deadline}</td>
              <th className="*:shadow-none *:border-0 space-x-4 flex">
                <Link
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Update"
                  className="btn btn-md bg-eucalyptus text-cream-sage"
                  to={`/campaign/${camp._id}`}
                >
                  <FaPen></FaPen>
                </Link>
                <button
                  onClick={() => handleDelete(camp._id)}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Delete"
                  className="btn btn-md bg-red-700 text-cream-sage"
                >
                  <FaTrash></FaTrash>
                </button>
                <Tooltip id="my-tooltip" />
              </th>
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
