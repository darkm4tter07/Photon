import React, {useState} from 'react';
import {useAuthStore} from '../store/useAuthStore.js';
import {Link} from 'react-router-dom';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const {login, isLoggingIn} = useAuthStore();

  const validateDetails = () => {
    const emailreg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!loginData.email || !loginData.password) {
      return toast.error("Please fill all fields");
    }
    if (!emailreg.test(loginData.email)) {
      return toast.error("Please enter a valid email address");
    }
    return true;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const success = validateDetails();
    if(success === true){
      login(loginData);
    }
  }

  const handleChange = (e) => {
    setLoginData({...loginData, [e.target.name]: e.target.value});
  }

  const togglePassword = () => setShowPassword((prev) => !prev);

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
          <h1 className="text-3xl font-semibold">Login</h1>
          <div className="font-light text-sm text-center">
            Login to enter the world of light speed chat
          </div>
          <form className="flex flex-col gap-3 w-full md:py-4" onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="flex flex-col justify-between gap-2 items-start">
              <label className="font-bold">Email:</label>
              <input
                type="email"
                name="email"
                value={loginData.email}
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
                value={loginData.password} 
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className={`rounded-lg p-2 w-3/4 mx-auto transition cursor-pointer bg-[#df0a0aa6] hover:bg-[#a50c0c] text-white}`}
            >
              <span>{isLoggingIn? "Logging in": "Submit"}</span>
            </button>
          </form>

          <div className="font-light">
            Not registered?{" "}
            <Link to="/signup" >
              <span className="hover:underline cursor-pointer text-[#b80808] font-semibold">
                Signup
              </span>
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login