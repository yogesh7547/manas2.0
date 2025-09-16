import React, { useState, type FormEvent } from "react";
import { useAuth } from "../contexts/authContext";
import { Link, Navigate } from "react-router";

const Profile: React.FC = () => {
  const [NotificationToggle, setNotificationToggle] = useState<boolean>(false);
  const [CheckInsToggle, setCheckInsToggle] = useState<boolean>(false);
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  const [logoutSucess, setLogoutSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const authContext = useAuth();

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { userLoggedIn, logout } = authContext;

  const handleLogout = async (e: FormEvent) => {
    e.preventDefault();
    if (!isSigningOut) {
      try {
        await logout();
        setLogoutSuccess(true);
      } catch (error: any) {
        setErrorMsg(errorMsg || "an error occurred while signing out");
      }
      setIsSigningOut(false);
    }
  };

  if(logoutSucess){
    return <Navigate to="/signIn" replace />;
  }

  return (
    <div className="h-[75%] w-full flex flex-col gap-3 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="m-2 flex items-center justify-between ">
        <div>
          <h2 className="font-bold text-2xl">Settings</h2>
          <p className="font-lightt-">Manage Your preferences</p>
        </div>
        <form action="submit" onSubmit={handleLogout}>
          <button
          type="submit"
          disabled={isSigningOut}
          className="h-[50px] w-[100px] border-2 hover:bg-purple-950 hover:text-white rounded-md border-purple-950"
        >
          {isSigningOut ? "Signing out..." : "Sign Out"}
        </button>
        </form>
      </div>
      <div className="w-[96%] bg-white mx-auto rounded-md p-3 border-0">
        <h2 className="font-semibold">Profile:</h2>
        <input
          type="text"
          className="border-2 rounded-sm w-[80%] bg-white border-purple-950 p-1"
        />
        <button
          onClick={() => console.log("name saved")}
          className="border-2 w-[20%]  bg-purple-950 text-white hover:bg-white hover:text-purple-950 rounded-sm h-[37px]"
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
              NotificationToggle ? "bg-purple-950" : "bg-gray-300"
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
              CheckInsToggle ? "bg-purple-950" : "bg-gray-300"
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
        <p>
          Manas is your personal AI companion for mental wellness . I'm here to
          provide emotional support , hep you process your thoughts and offer a
          safe space for reflection. <br />{" "}
          <span className="font-semibold">Remember:</span> I'm not a replacement
          fro proffessional mental health care. if you are in crisis , please
          contant emergency services or a mental health proffessional.
        </p>
      </div>
    </div>
  );
};

export default Profile;
