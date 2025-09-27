import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "./../provider/AuthProvider";
import bg from "../assets/addBg.jpg";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "@lottiefiles/lottie-player";

const AddCampaign = () => {
  const [types, setTypes] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://crowdcube-server-plum-delta.vercel.app/types")
      .then((res) => res.json())
      .then((data) => setTypes(data));
  });
  const handleformSubmit = (e) => {
    e.preventDefault();
    const userEmail = user.email;
    const userName = user?.name || "User";
    const title = e.target.title.value;
    const deadline = e.target.deadline.value;
    const type = e.target.type.value;
    const minDonation = e.target.minDonation.value;
    const description = e.target.description.value;
    const image = e.target.image.value;
    const goal = e.target.goal.value;
    const campaign = {
      image,
      title,
      type,
      description,
      minDonation: Number(minDonation),
      deadline,
      userEmail,
      userName,
      createdAt: new Date(),
      goal: Number(goal),
      raised: Number(0),
    };

    fetch("https://crowdcube-server-plum-delta.vercel.app/campaign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(campaign),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Congratulation",
            html: `
    <lottie-player 
      src="/Rocket.json"
      background="transparent"  
      speed="1"  
      style="width: 200px; height: 200px; margin: auto;"  
      autoplay>
    </lottie-player>
    <p>Your campaign is live! Let's start raising support 🚀</p>
  `,
            showConfirmButton: true,
            confirmButtonColor: "#2F4F4F",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/myCampaign");
            }
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };
  return (
    <div
      className="bg-mint-matte/30 join min-h-screen px-4 md:px-10 lg:px-20 flex flex-col pt-30 pb-20 justify-between items-center"
      style={{
        backgroundImage: `url('/formBg.svg')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-transparent shadow-lg glass w-full flex flex-col lg:flex-row">
        <div className="bg-mint-matte/30 flex flex-col justify-center items-center p-4 md:p-8 lg:p-16 lg:w-1/2 md:gap-10">
          <p className="text-lg text-charcoal-green font-semibold">
            Have an idea or facing an emergency but short on funds? Don’t
            worry—fill out the form and we’ll help you raise the support you
            need
          </p>
          <img src={bg} alt="" />
        </div>
        <form
          onSubmit={handleformSubmit}
          className="fieldset  border-base-300 rounded-box w-full *:w-full lg:w-1/2 border p-4 md:p-8 lg:p-16 text-charcoal-green text-xs lg:text-sm font-semibold *:focus:border-charcoal-green *:focus:border"
        >
          <label className="label">User Email</label>
          <input
            type="text"
            placeholder={user?.email}
            className="input input-bordered border-charcoal-green/30 disabled:text-charcoal-green disabled:bg-mint-matte disabled:border-0"
            disabled
          />
          <label className="label">User Name</label>
          <input
            type="text"
            placeholder={user?.name}
            className="input input-bordered border-charcoal-green/30 disabled:text-charcoal-green disabled:bg-mint-matte disabled:border-0"
            disabled
          />
          <label className="label">Campaign title</label>
          <input
            type="text"
            className="input input-bordered border-charcoal-green/30 focus:border-eucalyptus focus:outline-none bg-cream-sage"
            name="title"
            placeholder="Enter Campaign title"
            required
          />

          <label className="label">Campaign Type</label>
          <input
            type="text"
            className="input input-bordered border-charcoal-green/30 focus:border-eucalyptus focus:outline-none bg-cream-sage"
            name="type"
            placeholder="What type of campaign is it?"
            list="types"
            required
          />
          <datalist id="types" className="w-full">
            {types.map((type, id) => (
              <option key={id} value={type}></option>
            ))}
            <option value="other"></option>
          </datalist>

          <label className="label">Campaign Image/thumbnail</label>
          <input
            type="text"
            className="input input-bordered border-charcoal-green/30 focus:border-eucalyptus focus:outline-none bg-cream-sage"
            name="image"
            placeholder="Image/thumbnail URL"
            required
          />

          <div className="flex flex-col md:flex-row justify-between">
            <label className="label">Minimum Donation Amount</label>
            <input
              type="number"
              className="input input-bordered border-charcoal-green/30 focus:border-eucalyptus focus:outline-none bg-cream-sage validator"
              required
              name="minDonation"
              placeholder="Enter Minimum Donation amount"
              min="1"
              title=""
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <label className="label">Expected Donation</label>
            <input
              type="number"
              className="input input-bordered border-charcoal-green/30 focus:border-eucalyptus focus:outline-none bg-cream-sage validator"
              required
              name="goal"
              placeholder="Expected Raise"
              min="1"
              title=""
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <label className="label">Deadline</label>
            <input
              type="date"
              className="input input-bordered border-charcoal-green/30 focus:border-eucalyptus focus:outline-none bg-cream-sage"
              name="deadline"
              required
            />
          </div>

          <label className="label">Campaign Description</label>
          <textarea
            className="input input-bordered border-charcoal-green/30 focus:border-eucalyptus focus:outline-none bg-cream-sage textarea h-24"
            name="description"
            placeholder="Describe your campaign"
          ></textarea>
          <button className="btn bg-eucalyptus hover:bg-charcoal-green/90 text-cream-sage mt-4">
            Add Campaign
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCampaign;
