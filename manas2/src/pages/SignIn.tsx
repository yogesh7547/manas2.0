import React, { useState, type FormEvent } from "react";

import signInpageArt from "../assets/SignInPageArt.png";
import { useAuth } from "../contexts/authContext";
import { Link, Navigate } from "react-router";

const SignIn: React.FC = () => {
  const authContext = useAuth();

  //// Handle the case where context might be undefined
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { userLoggedIn, login } = authContext;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [signInSucess, setSignInSucess]= useState(false)

  // if (userLoggedIn) {
  //   return <Navigate to={"/layout/chat"} />;
  // }

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      setErrorMsg("");
      try {
        await login(email, password);
        setSignInSucess(true);
      } catch (error: any) {
        setErrorMsg(errorMsg || "an error occurred while signing In");
      }
      setIsSigningIn(false);
    }
  };

  if(signInSucess){
     return <Navigate to="/layout/chat" replace />;
  }


  return (
    <div className="border-2 mx-auto w-[320px] h-screen bg-gradient-to-t from-[#1C182E] to-[#DDD7FF] flex flex-col items-center justify-center gap-5">
      <img src={signInpageArt} alt="" className="w-[200px]" />
      <form
        action="submit"
        onSubmit={handleSignIn}
        className=" flex flex-col items-center gap-5 p-5 rounded-lg bg-white"
      >
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-2 rounded-md p-2 "
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-2 rounded-md p-2 "
          />
        </div>
        {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
        <button
          type="submit"
          disabled={isSigningIn}
          className="h-[50px] w-[100px] border-2 hover:bg-purple-950 hover:text-white rounded-md"
        >
          {isSigningIn ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <p className="text-white">
        Don't have an account?{" "}
        <Link to="/signUp" className="hover:text-purple-400">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
