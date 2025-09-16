import React, { useState, type FormEvent } from "react";
import { useAuth } from "../contexts/authContext";
import { Link, Navigate } from "react-router";
import signUppageArt from "../assets/SignUpPageArt.png";

const SignUp: React.FC = () => {
  const authContext = useAuth();
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { signUp } = authContext;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    if (!isSigningUp) {
      setIsSigningUp(true);
      setErrorMsg("");
      if (!email.trim() || !password.trim()) {
        setErrorMsg("Please fill in all required fields");
        return;
      }

      try {
        await signUp(email, password);
        setSignupSuccess(true);
      } catch (error: any) {
        setErrorMsg(errorMsg || "an error occurred while signing Up");
      }
      setIsSigningUp(false);
    }
  };

  if (signupSuccess) {
    return <Navigate to="/signIn" replace />; // or whatever route you want
  }

  return (
    <div className="border-2 mx-auto w-[320px] h-screen bg-gradient-to-t from-[#1C182E] to-[#DDD7FF] flex flex-col items-center justify-center gap-5">
      <img src={signUppageArt} alt="" className="w-[200px] mr-10" />
      <form
        action="submit"
        onSubmit={handleSignUp}
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
          disabled={isSigningUp}
          className="h-[50px] w-[100px] border-2 hover:bg-purple-950 hover:text-white rounded-md"
        >
          {isSigningUp ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      <p className="text-white">
        Already have an account?{" "}
        <Link to="/signIn" className="hover:text-purple-400">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
