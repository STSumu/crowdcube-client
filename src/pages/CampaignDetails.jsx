import { useLoaderData } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import moneyIcon from "../assets/money.png";
import { useContext, useRef, useState } from "react";
import { AuthContext } from './../provider/AuthProvider';
import Swal from "sweetalert2";
import "@lottiefiles/lottie-player";

const CampaignDetails = () => {
  const campaign = useLoaderData();
  const isValidUrl = (str) => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};
  const {
    _id,
    image,
    title,
    description,
    deadline,
    raised,
    goal,
    userName,
    userEmail,
    type,
    minDonation,
  } = campaign;
  console.log(campaign);
  const {user}=useContext(AuthContext);
  const [newRaised,setRaised]=useState(raised);
  const [error,setError]=useState("");
  
  const donationRef=useRef();
  
  const percentage = (newRaised * 100) / goal;
  const handleDonate = () => {
    setError('');
     const donationAmount=donationRef.current.value;
     const donation={
      campaignId : _id,
      userEmail : user?.email,
      userName : user?.name,
      amount: donationAmount,
     }
     if(donationAmount < minDonation){
      setError(`Minimum Donation Amount $${minDonation}`)
      return;
     }
    donationRef.current.value = "";
    setError(""); 
        document.getElementById("my_modal_5").close();
 Swal.fire({
    title: "Confirm Donation",
    text: `Are you sure you want to donate $${donationAmount}?`,
    color:'#2C3E2D',
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#7FB069",
    cancelButtonColor: "#C85A54",
    confirmButtonText: "Yes, donate!",
  }).then((result) => {
    if (result.isConfirmed) {
      // if donation confirmed
      
      fetch(`http://localhost:5000/donation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donation),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            setRaised(prev => prev + Number(donationAmount));
            Swal.fire({
              title: "Thank You!",
              html: `
    <lottie-player 
      src="/success.json"
      background="transparent"  
      speed="1"  
      style="width: 200px; height: 200px; margin: auto;"  
      autoplay>
    </lottie-player>
    <p>Your donation was successful</p>
  `,
confirmButtonColor: "#7FB069",
            });
          } else {
            Swal.fire({
              title: "Oops!",
              text: "Something went wrong. Please try again.",
              icon: "error",
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            title: "Server Error",
            text: "Unable to process donation right now.",
            icon: "error",
          });
        });
    }
  });
};
  const handleCancel=()=>{
      donationRef.current.value='';
      setError('');
      document.getElementById("my_modal_5").close()
  }
  return (
    <div className="relative">
      <div
        className="hero min-h-screen"
         style={
    isValidUrl(image)
      ? {
          backgroundImage: `url(${image})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : {
        backgroundImage: `url(/bg4.png)`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
     }
  }
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-center w-full *:w-full *:lg:w-4/5 text-white z-10 flex flex-col gap-10 p-2 md:p-8 lg:p-16 mt-20 mb-10">
          {/* title div  */}
          <div className="bg-cream-sage/10 border backdrop-blur-xs rounded-lg border-cream-sage/20 p-4 lg:p-8 flex flex-col justify-center items-center gap-4">
            <h1 className="text-3xl md:text-4xl font-bold font-display">
              {title}
            </h1>
            <div className="text-lg badge border-0 shadow-2xl shadow-black font-semibold text-cream-sage bg-forest-matte rounded-2xl">
              {type}
            </div>
            {/* progress  */}
            <div className="bg-white/20 backdrop-blur-sm p-6 space-y-4 rounded-lg w-full lg:w-4/7">
              {/* progress top  */}
              <div className="flex justify-between items-center font-semibold text-lg">
                <span>${newRaised.toLocaleString()}</span>
                <span>${goal.toLocaleString()}</span>
              </div>
              {/* progress slider  */}
              <div className="w-full">
                <Slider
                  value={percentage}
                  disabled
                  className="w-full"
                  trackStyle={{ backgroundColor: "#7FB069", height: 12 }}
                  railStyle={{
                    backgroundColor: "rgba(255,255,255,0.3)",
                    height: 12,
                  }}
                  handleStyle={{
                    backgroundImage: `url(${moneyIcon})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    border: "none",
                    width: 30,
                    height: 30,
                    marginTop: -15,
                  }}
                />
              </div>
              {/* progress down  */}
              <div className="text-start text-sm">
                <span>{percentage.toFixed(1)}% funded</span>
              </div>
            </div>
          </div>
          {/* about campaign div  */}
          <div className="bg-cream-sage/10 border backdrop-blur-xs rounded-lg border-cream-sage/20 p-4 lg:p-8 space-y-4 flex flex-col justify-center items-center">
            <h1 className="text-xl md:text-2xl font-bold font-display">
              About this Campaign
            </h1>
            <p className="text-lg">{description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:w-4/5 text-charcoal-green">
              <div className="stat shadow bg-cream-sage/80 rounded-lg p-4">
                <div className="stat-title text-lg font-semibold">
                  Minimum Donation
                </div>
                <div className="stat-value">${minDonation}</div>
              </div>

              <div className="stat shadow bg-cream-sage/80 rounded-lg p-4">
                <div className="stat-title text-lg font-semibold">Deadline</div>
                <div className="stat-value text-2xl">
                  {new Date(deadline).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* user info div  */}

          <div className="bg-cream-sage/10 border backdrop-blur-xs rounded-lg border-cream-sage/20 p-4 lg:p-8 space-y-4 flex flex-col justify-center items-center">
            <h1 className="text-xl md:text-2xl font-bold font-display text-white">
              Organizer Info
            </h1>
            <div className="flex justify-center items-center gap-2 w-full md:w-1/3">
              <span className="rounded-full bg-forest-matte text-cream-sage px-4 py-2 text-4xl font-bold">
                {userName.charAt(0).toUpperCase()}
              </span>
              <div className="text-start">
                <h1 className="text-xl lg:text-2xl font-bold">{userName}</h1>
                <p className="text-sm">{userEmail}</p>
              </div>
            </div>
            <div className="bg-cream-sage/20 backdrop-blur-sm p-4 w-full md:w-1/3 rounded-lg">
              <h4 className="font-semibold mb-2">Contact Information</h4>
              <p>{userEmail}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 z-50 shadow-2xl">
        <div className="bg-forest-matte text-cream-sage">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h3 className="text-lg md:text-xl font-semibold">
                  Help Make This Campaign a Success
                </h3>
                <p className="text-cream-sage/80 text-sm">
                  Every donation brings us closer to our goal.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    document.getElementById("my_modal_5").showModal()
                  }
                  className="btn btn-lg bg-cream-sage text-charcoal-green hover:bg-cream-sage/90 px-8 shadow-lg border-none font-bold"
                >
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* donate amount modal  */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle" >
        <div className="modal-box flex flex-col text-center justify-center items-center text-charcoal-green">
          <h3 className="font-bold text-lg">Please Enter a Donation Amount</h3>

          <div className="modal-action">
            <form method="dialog">
                <input
                  type="number"
                  className="input"
                  required
                  ref={donationRef}
                  placeholder="Donation Amount"
                  min={minDonation}
                  title="Enter Donation Amount"
                />
                <p className="m-0 p-0 mb-4 text-xs text-red-700">
                  {error}
                </p>
            </form>

          </div>
          <div>
              <button 
  className="btn mr-4 bg-white border-charcoal-green text-charcoal-green" 
 onClick={handleCancel}>Cancel
</button>
              <button onClick={handleDonate} className="btn bg-charcoal-green text-cream-sage">
                Donate
              </button>
</div>
        </div>
      </dialog>
    </div>
  );
};

export default CampaignDetails;
