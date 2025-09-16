import React from "react";
import { Link } from "react-router";
import LandingPageArt from "../assets/LandingPageArt.png";
import Button from "../components/Ui/Button";
const Landing: React.FC = () => {

  return (
    <div className="border-2 mx-auto w-[320px] h-screen bg-gradient-to-t from-[#1C182E] to-[#DDD7FF] flex flex-col items-center justify-center">
      <img
        src={LandingPageArt}
        alt="Landing Page Art"
        className="w-[50%] h-auto max-w-xs"
      />
      <h1 className="font-extrabold text-4xl">MANAS</h1>
      <Link
        to="/signUp"
        className="rounded-md flex justify-center items-center"
      >
        <Button onClick={()=>console.log(import.meta.env.VITE_API_URL)} disabled={false}>
          
        Get Started
      </Button>
      </Link>
    </div>
  );
};

export default Landing;
