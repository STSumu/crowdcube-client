import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";

const UpdateCampaign = () => {
  const { user } = useContext(AuthContext);
  const [types, setTypes] = useState([]);
  const loadedData = useLoaderData();
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://crowdcube-server-plum-delta.vercel.app/types")
      .then((res) => res.json())
      .then((data) => setTypes(data));
  }, []);
  const {
    image,
    title,
    description,
    deadline,
    goal,
    type,
    minDonation,
  } = loadedData;
  const handleFormSubmit = (e) => {
    e.preventDefault();
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
      goal: Number(goal),
    };
    Swal.fire({
      title: "Are you sure you want to update the Campaign",
      html: `
    <div style="text-align:left;">
      <p><b>Title:</b> ${title}</p>
      <p><b>ImageURL:</b> ${image}</p>
      <p><b>Goal:</b> $${goal}</p>
      <p><b>Minimum Donation:</b> $${minDonation}</p>
      <p><b>Deadline:</b> ${deadline}</p>
      <p><b>Category:</b> ${type}</p>
      <p><b>Description:</b> ${description}</p>
    </div>
  `,
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#7FB069",
      cancelButtonColor: "#C85A54",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://crowdcube-server-plum-delta.vercel.app/updateCampaign/${loadedData._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(campaign),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              Swal.fire({
                title: "Congratulation",
                html: `<p>Your campaign is updated Successfully!</p>`,
                showConfirmButton: true,
                confirmButtonColor: "#7FB069",
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/myCampaign");
                }
              });
            } else if (data.matchedCount > 0 && data.modifiedCount == 0) {
              Swal.fire({
                icon: "info",
                title: "No changes detected",
                confirmButtonColor: "#7FB069",
                text: "Your campaign is already up to date.",
              });
            } else if (data.matchedCount == 0) {
              Swal.fire({
                icon: "error",
                title: "No data found",
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
      }
    });
  };
  return (
    <div
      className="px-2 md:px-8 lg:px-25 pb-10 pt-25 flex justify-center items-center"
      style={{
        backgroundImage: `url('/formBg.svg')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleFormSubmit}
        className="fieldset border border-charcoal-green/30 glass rounded-box w-full *:w-full lg:w-1/2 p-4 md:p-8 lg:p-16 text-charcoal-green text-xs lg:text-sm font-semibold *:focus:border-charcoal-green *:focus:border"
      >
        <div>
          <Link
            to="/myCampaign"
            className="flex items-center gap-1 text-charcoal-green"
          >
            <FaArrowLeft></FaArrowLeft>Go Back
          </Link>
        </div>
        <h1 className="text-center text-2xl font-bold">Update your campaign</h1>
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
          defaultValue={title}
        />

        <label className="label">Campaign Type</label>
        <input
          type="text"
          className="input input-bordered border-charcoal-green/30 focus:border-eucalyptus focus:outline-none bg-cream-sage"
          name="type"
          defaultValue={type}
          list="types"
        />
        <datalist id="types" className="w-full">
          {types.map((t, id) => (
            <option key={id} value={t}></option>
          ))}
          <option value="other"></option>
        </datalist>

        <label className="label">Campaign Image/thumbnail</label>
        <input
          type="text"
          className="input input-bordered border-charcoal-green/30 focus:border-eucalyptus focus:outline-none bg-cream-sage"
          name="image"
          defaultValue={image}
        />

        <div className="flex flex-col md:flex-row justify-between">
          <label className="label">Minimum Donation Amount</label>
          <input
            type="number"
            className="input input-bordered border-charcoal-green/30 focus:border-eucalyptus focus:outline-none bg-cream-sage validator"
            name="minDonation"
            defaultValue={minDonation}
            min="1"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <label className="label">Expected Donation</label>
          <input
            type="number"
            className="input input-bordered border-charcoal-green/30 focus:border-eucalyptus focus:outline-none bg-cream-sage validator"
            name="goal"
            defaultValue={goal}
            min="1"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <label className="label">Deadline</label>
          <input
            type="date"
            className="input input-bordered border-charcoal-green/30 focus:border-eucalyptus focus:outline-none bg-cream-sage"
            name="deadline"
            defaultValue={deadline}
          />
        </div>

        <label className="label">Campaign Description</label>
        <textarea
          className="textarea h-24 input-bordered border-charcoal-green/30 focus:border-eucalyptus focus:outline-none bg-cream-sage"
          name="description"
          defaultValue={description}
        ></textarea>
        <button className="btn bg-eucalyptus hover:bg-charcoal-green/90 text-cream-sage mt-4">
          Update Campaign
        </button>
      </form>
    </div>
  );
};

export default UpdateCampaign;
