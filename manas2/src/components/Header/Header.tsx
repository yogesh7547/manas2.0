import React from "react";
import RoboIcon from "../../assets/RoboIcon.png";
import NotificationIcon from "../../assets/NotificationIcon.png";

const Header: React.FC = () => {
  return (
    <div className=" mx-auto w-[100%] h-[13%] bg-[#45327F] flex items-center justify-between">
      <div className="flex items-center justify-around">
        <img src={RoboIcon} alt="RoboIcon" className="mt-4 w-[50%]" />
        <h2 className="font-bold text-[20px]">MANAS</h2>
      </div>
      <div>
        <img
          src={NotificationIcon}
          alt="NotificationIcon"
          className="mr-4 w-[50%]"
        />
      </div>
    </div>
  );
};

export default Header;
