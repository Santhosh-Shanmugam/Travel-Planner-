import React, { useContext } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { LogInContext } from "@/Context/LogInContext/Login";

function Hero() {
  const { isAuthenticated } = useContext(LogInContext);

  return (
    <div
      className="relative flex flex-col items-center justify-center h-[85vh] sm:h-[90vh] md:h-[80vh] text-center bg-gradient-to-b from-gray-100 to-white py-10"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1650&q=80')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Content container */}
      <div className="relative z-10 px-6 sm:px-12 md:px-16 lg:px-24 flex flex-col items-center gap-6">
        <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-orange-500 drop-shadow-md">
          Embark on Thrilling Adventures with Plan It!
        </h1>

        <h3 className="font-extrabold text-lg sm:text-2xl md:text-3xl lg:text-4xl leading-tight opacity-80 text-white">
          Customized Itineraries for Every Explorer
        </h3>

        <h5 className="text-xs sm:text-sm md:text-lg font-semibold opacity-80 text-white">
          Your reliable travel planner and adventure companion, sparking unforgettable journeys.
        </h5>

        <Link to="/plan-a-trip">
          <Button
            className="mt-6 px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-base sm:text-lg md:text-xl bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg transition duration-300"
          >
            {isAuthenticated
              ? "Ready for Your Next Adventure?"
              : "Start Planning Your Trip for Free!"}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
