import React from "react";
import { Fade } from "react-awesome-reveal";


const Review = () => {
    const reviews = [
  {
    name: "Sarah Johnson",
    role: "Campaign Creator",
    avatar: "https://i.ibb.co.com/Y7qGc92t/user1.png",
    text: "I raised $15,000 for my daughter's medical treatment in just 30 days. The platform made it so easy to share our story and connect with supporters.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Nonprofit Director",
    avatar: "https://i.ibb.co.com/vxbrm6pJ/micheal.png", 
    text: "As a nonprofit, we've used many platforms. This one stands out for its transparency and the genuine community it creates around each cause.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Regular Donor",
    avatar: "https://i.ibb.co.com/rR7j8qXz/emily.png",
    text: "I love how I can easily track the impact of my donations and stay connected with the campaigns I support. It feels personal and meaningful.",
    rating: 5
  }
];
  return (
    <div className="px-2 py-5 md:px-10 lg:px-25 mb-20">
      <Fade cascade damping={0.5} className="flex flex-col justify-center items-center gap-2 mb-5">
        <h2 className="text-forest-matte font-bold text-2xl md:text-4xl">
          Stories from Our Community
        </h2>
        <p className="text-eucalyptus text-sm md:text-lg">
           Real experiences from changemakers who've transformed lives through our platform
        </p>
      </Fade>

    <div>
        {
            reviews.map((review,idx)=>
                <div className={`chat ${idx %2 ===0 ? 'chat-start' : 'chat-end'}`} data-aos={`${idx %2 ===0 ? "slide-right" : 'slide-left'}` }>
  <div className="chat-image avatar">
    <div className="w-30 border border-charcoal-green rounded-full">
      <img className="rounded-full"
        alt="User"
        src={review.avatar}
      />
    </div>
  </div>
  <div className="chat-header ">

  </div>
  <div className="chat-bubble bg-charcoal-green text-cream-sage glass">{review.text}</div>
  <div className="chat-footer text-eucalyptus flex flex-col md:flex-row items-center mt-0"><span className="text-lg font-semibold text-charcoal-green">{review.name},</span><p className="text-sm">{review.role}</p></div>
</div>

            )
        }
    </div>

    </div>
  );
};

export default Review;
