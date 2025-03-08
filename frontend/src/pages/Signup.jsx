import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signUp, isSigningUp } = useAuthStore();

  // Function to check if all fields are filled
  const validateForm = () => {
    const emailreg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.fullName || !formData.email || !formData.password) {
      return toast.error("Please fill all fields");
    }
    if (!emailreg.test(formData.email)) {
      return toast.error("Please enter a valid email address");
    }
    if (formData.password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }
    return true;
  };

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if(success === true){
      signUp(formData);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center p-4 text-[#f0f0f0bb]">
      <div className="bg-black flex flex-col md:flex-row p-4 rounded-lg w-full max-w-3xl">
        
        {/* Image Section */}
        <div className="hidden md:flex items-center md:relative overflow-hidden rounded-lg p-2 flex-shrink-0">
          <img src="/photon.jpg" className="w-full md:w-96" />
          <div className="absolute inset-0 w-full h-full z-10 flex flex-col p-4 justify-between">
            <div className="font-bold text-3xl text-[#b80808]">Photon</div>
            <div className="font-normal text-lg text-amber-100">
              Chat with friends with the speed of light
            </div>
          </div>
        </div>

        <div className="md:hidden pb-6 w-full justify-between p-2 flex items-center gap-4">
          <div>
            <div className=" font-bold text-3xl text-[#b80808]">Photon</div>
            <div className="font-normal text-sm text-amber-100">
              Chat with friends with the speed of light
            </div>
          </div>
          <img src="/photon.jpg" className="w-1/4" />
        </div>

        {/* Form Section */}
        <div className="flex flex-col p-4 items-center justify-center gap-4 w-full">
          <h1 className="text-3xl font-semibold">Create Account</h1>
          <div className="font-light text-sm text-center">
            Join our lightning-fast chatting app by signing up
          </div>

          <form className="flex flex-col gap-3 w-full md:py-4" onSubmit={handleSubmit}>
            <div className="flex flex-col justify-between gap-2 items-start">
              <label className=" font-bold">Full Name:</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="bg-[#ffffff15] rounded-lg outline-none p-2 text-sm w-full placeholder:opacity-30"
                placeholder="Rick Sanchez"
              />
            </div>

            <div className="flex flex-col justify-between gap-2 items-start">
              <label className="font-bold">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-[#ffffff15] rounded-lg outline-none p-2 text-sm w-full placeholder:opacity-30"
                placeholder="ricksanchez@wubbalubbadub"
              />
            </div>

            {/* Password Input with Eye Button */}
            <div className="relative w-full">
              <label className="font-bold">Password:</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password} 
                onChange={handleChange}
                placeholder="********"
                className="bg-[#ffffff15] rounded-lg outline-none p-2 text-sm w-full placeholder:opacity-30"
              />
              {/* Eye Icon */}
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-11 transform -translate-y-1/2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-gray-400 opacity-30">
                  {showPassword ? "visibility" : "visibility_off"}
                </span>
              </button>
            </div>

            {/* Confirm Password Input with Eye Button */}
            <div className="relative w-full">
              <label className="font-bold">Confirm Password:</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="********"
                className="bg-[#ffffff15] rounded-lg outline-none p-2 text-sm w-full placeholder:opacity-30"
              />
              {/* Eye Icon */}
              <button
                type="button"
                onClick={toggleConfirmPassword}
                className="absolute right-3 top-11 transform -translate-y-1/2 cursor-pointer opacity-30"
              >
                <span className="material-symbols-outlined text-gray-400">
                  {showConfirmPassword ? "visibility" : "visibility_off"}
                </span>
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSigningUp}
              className={`rounded-lg p-2 w-3/4 mx-auto transition cursor-pointer bg-[#df0a0aa6] hover:bg-[#a50c0c] text-white}`}
            >
              <span>{isSigningUp? "Signing in": "Submit"}</span>
            </button>
          </form>

          <div className="text-md font-light">
            Already a user?{" "}
            <Link to="/login" >
              <span className="text-[#b80808] hover:underline cursor-pointer font-semibold">
                Login
              </span>
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
