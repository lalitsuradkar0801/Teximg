import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ FIX 5: loading state added

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ FIX 5: disable button during request

    try {
      const endpoint =
        state === "Login"
          ? `${backendUrl}/api/user/login`
          : `${backendUrl}/api/user/register`;

      const payload =
        state === "Login" ? { email, password } : { name, email, password };

      const { data } = await axios.post(endpoint, payload);

      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        setShowLogin(false);
        toast.success(
          state === "Login" ? "Login Successful" : "Account Created Successfully"
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    } finally {
      setLoading(false); // ✅ FIX 5: always re-enable button
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white p-10 rounded-2xl text-slate-500 min-w-[340px]" // ✅ FIX 3: min-width added
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state}
        </h1>

        {/* ✅ FIX 1: Dynamic subtitle based on state */}
        <p className="text-sm text-center text-gray-500">
          {state === "Login"
            ? "Welcome back! Please sign in to continue"
            : "Create an account to get started"}
        </p>

        {state !== "Login" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
            <img className="w-6" src={assets.profile_icon} alt="profile" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="outline-none text-sm"
              placeholder="Full Name"
              required
            />
          </div>
        )}

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img className="w-6" src={assets.email_icon} alt="email" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="outline-none text-sm"
            placeholder="Email ID"
            required
          />
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img className="w-5" src={assets.lock_icon} alt="password" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="outline-none text-sm"
            placeholder="Password"
            required
          />
        </div>

        {/* ✅ FIX 4: Only show "Forgot password?" on Login screen */}
        {state === "Login" && (
          <p className="text-sm text-blue-600 my-3 cursor-pointer hover:underline">
            Forgot password?
          </p>
        )}

        {/* ✅ FIX 5: Button disabled while loading */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded-full py-2 text-white mt-3 transition-colors ${
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Please wait..." : state === "Login" ? "Login" : "Create Account"}
        </button>

        {state === "Login" ? (
          <p className="mt-4 text-center text-gray-500">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-4 text-center text-gray-500">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}

        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt="close"
          className="absolute top-5 right-5 cursor-pointer"
        />
      </motion.form>
    </div>
  );
};

export default Login;