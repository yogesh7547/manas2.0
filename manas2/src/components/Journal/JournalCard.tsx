import React from "react";

const JournalCard: React.FC = () => {
  return (
    <div className="w-full  p-1 ">
      <div className="w-[90%] border-2 border-purple-950 bg-white rounded-md mx-auto p-2 max-h-[100px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex justify-between p-1">
          <div className="font-bold">{Date.now()}</div>
          <div>delte{/* <img src="" alt="" />put delte icon here */}</div>
        </div>
        <div>
          <p className="line-clamp-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore esse
            commodi nemo minus reiciendis repellat magnam quasi ex est ab!
          </p>
        </div>
      </div>
    </div>
  );
};

export default JournalCard;
