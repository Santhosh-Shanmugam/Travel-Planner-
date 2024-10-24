import React from "react";
import Hotelcard from "./Hotelcard";

function Hotels() {
  return (
    <div className="bg-gray-100 p-5 rounded-lg shadow-lg mt-3">
      <h2 className="mt-5 sm:mt-7 text-3xl sm:text-4xl font-extrabold text-black-700 text-center sm:text-left">
        Hotels
      </h2>
      <div className="main-info mt-2 md:mt-4 flex flex-wrap justify-center gap-4">
        <Hotelcard />
      </div>
    </div>
  );
}

export default Hotels;
