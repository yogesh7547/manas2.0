import React, { useState } from "react";

const Profile: React.FC = () => {
  const [NotificationToggle, setNotificationToggle] = useState<boolean>(false);
  const [CheckInsToggle, setCheckInsToggle] = useState<boolean>(false);

  return (
    <div className="h-[75%] w-full flex flex-col gap-3 overflow-y-auto">
      <div className="m-2">
        <h2 className="font-bold text-2xl">Settings</h2>
        <p className="font-lightt-">Manage Your preferences</p>
      </div>
      <div className="w-[96%] bg-white mx-auto rounded-md p-3 border-0">
        <h2 className="font-semibold">Profile:</h2>
        <label htmlFor="Your Name" className="font-semibold"></label>
        <input
          type="text"
          className="border-0 rounded-sm w-[80%] bg-gray-400 p-1"
        />
        <button
          onClick={() => console.log("name saved")}
          className="border-2 w-[20%] bg-black text-white rounded-sm h-[35px]"
        >
          Save
        </button>
      </div>
      <div className="w-[96%] bg-white mx-auto rounded-md p-3 border-0">
        <h2 className="font-semibold">Notifications:</h2>
        <div className="flex justify-between items-center m-3">
          <div>
            <h2 className="font-medium">Enable Notifications:</h2>
          </div>

          <button
            onClick={() => setNotificationToggle(!NotificationToggle)}
            className={`relative w-11 h-6 rounded-full  ${
              NotificationToggle ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`block w-4 h-4 bg-white rounded-full mt-1 transition-transform ${
                NotificationToggle ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        <hr />
        <div className="flex justify-between items-center m-3">
          <div>
            <h2 className="font-medium">Enable Check-Ins:</h2>
          </div>

          <button
            onClick={() => setCheckInsToggle(!CheckInsToggle)}
            className={`relative w-11 h-6 rounded-full ${
              CheckInsToggle ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`block  w-4 h-4 bg-white rounded-full mt-1 transition-transform ${
                CheckInsToggle ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
      <div className="w-[96%] bg-white mx-auto rounded-md p-3 border-0 mb-15">
         <h2 className="font-semibold">About Manas:</h2>
         <p>Manas is your personal AI companion for mental wellness . I'm here to provide emotional support , hep you process your thoughts and offer a safe space for reflection. <br /> <span className="font-semibold">Remember:</span> I'm not a replacement fro proffessional mental health care. if you are in crisis , please contant emergency services or a mental health proffessional.</p>
      </div>
    </div>
  );
};

export default Profile;
