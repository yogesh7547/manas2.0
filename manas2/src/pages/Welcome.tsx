import React from "react";
import WelcomePageArt from "../assets/WelcomePageArt.png";

const Welcome: React.FC = () => {
  return (
    <div className="border-2 mx-auto w-[320px] h-screen bg-gradient-to-t from-[#1C182E] to-[#DDD7FF] flex flex-col items-center justify-around">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="font-bold text-3xl">Welcome to Manas</h1>
        <p className="mx-2 text-center">Your mind's safe space — anytime, anywhere</p>
        <img
          src={WelcomePageArt}
          alt="Landing Page Art"
          className="w-[75%] h-auto max-w-xs"
        />
      </div>
      <p className="text-white">Already have an account? Sign In.</p>
    </div>
  );
};

export default Welcome;
