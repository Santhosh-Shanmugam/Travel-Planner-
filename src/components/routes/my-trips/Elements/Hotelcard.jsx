import React, { useContext } from "react";
import { LogInContext } from "@/Context/LogInContext/Login";
import HotelCards from "../Cards/HotelCards";

function Hotelcard() {
  const { trip } = useContext(LogInContext);
  const hotels = trip?.tripData?.hotels;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {hotels?.map((hotel, idx) => (
        <div
          key={idx}
          className="transform transition-transform duration-300 hover:scale-105 p-4 rounded-lg shadow-lg bg-white" // Added padding, rounded corners, shadow, and background
        >
          <HotelCards hotel={hotel} />
        </div>
      ))}
    </div>
  );
}

export default Hotelcard;
