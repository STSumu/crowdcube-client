import React from "react";
import { Outlet } from "react-router-dom";
import Lottie from "lottie-react";
import loginAnimation from "../assets/Login.json";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivateLayout = () => {
  return (
    <div className="bg-cream-sage min-h-screen flex flex-col">
      <header className="bg-forest-matte">
        <Navbar />
      </header>
      
      <main className="lg:min-h-screen flex-1 px-4 md:px-10 lg:px-20 flex flex-col lg:flex-row justify-between items-center pt-12 md:pb-10 md:pt-20">

        <div data-aos='fade-right' className="w-full md:w-4/5 lg:w-1/2 py-8 lg:py-5 lg:px-20 flex justify-center items-center">
          <Outlet />
        </div>
        
        <div data-aos='fade-left' className="hidden md:flex w-full lg:w-1/2 justify-center items-center p-8">
          <div className="max-w-lg w-full">
            <Lottie 
              animationData={loginAnimation} 
              loop={true}
              className="w-full h-auto"
            />
          </div>
        </div>
      </main>
      
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default PrivateLayout;