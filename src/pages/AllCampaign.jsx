import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const AllCampaign = () => {
  const [campaigns, setCampaings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:5000/campaigns")
      .then((res) => res.json())
      .then((data) => {
        setCampaings(data);
        setLoading(false);
      });
  }, []);
  if (loading) return <Loading></Loading>;
  return (
    <div
      className="overflow-x-auto min-h-screen py-20 px-4 md:px-8 lg:px-25 mt-10 mb-10"
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
            words={["All Campaigns", "Support a Cause", "Make a Difference"]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h1>
        <p className="text-forest-matte text-lg">
          Discover and support meaningful campaigns from our community
        </p>
      </div>
      <div className="overflow-x-auto bg-mint-matte/15 border border-charcoal-green/20 rounded-lg">
        <table className="table w-full">
          {" "}
          {/* head */}
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Category</th>
              <th>Progress</th>
              <th>Organizer</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {campaigns.map((camp, idx) => (
              <tr key={idx}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={camp.image} alt="Campaign Image" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold font-display text-forest-matte">
                        {camp.title}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-charcoal-green font-semibold text-lg">
                    {camp.type}
                  </span>
                </td>
                <td>
                  <div className="flex flex-col">
                    {Math.round((camp.raised * 100) / camp.goal)}%
                    <progress
                      className="progress w-20 bg-mint-matte text-charcoal-green"
                      value={Math.round((camp.raised * 100) / camp.goal)}
                      max="100"
                    ></progress>
                  </div>
                </td>
                <td>{camp.userName}</td>
                <td>
                  <div
                    className={`p-2 rounded-xl text-center font-bold ${
                      camp.raised >= camp.goal
                        ? "bg-eucalyptus text-cream-sage"
                        : new Date(camp.deadline) < new Date()
                        ? "bg-[#C85A54] text-cream-sage"
                        : "bg-forest-matte text-cream-sage"
                    }`}
                  >
                    {camp.raised >= camp.goal
                      ? "Completed"
                      : new Date(camp.deadline) < new Date()
                      ? "Expired"
                      : "Active"}
                  </div>
                </td>
                <th>
                  <Link
                    key={idx}
                    className="btn btn-md shadow-sm border-0 hover:bg-charcoal-green text-cream-sage bg-eucalyptus"
                    to={`/campaign/${camp._id}`}
                  >
                    See details
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>
                <Link to="/">Go Home</Link>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
export default AllCampaign;
