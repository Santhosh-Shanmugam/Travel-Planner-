import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Payments() {
  const location = useLocation();
  const { pricePerPerson, placeName } = location.state || {};
  const [numPeople, setNumPeople] = useState(1); // Default to 1 person

  // Calculate total cost
  const totalCost = pricePerPerson * numPeople;

  const handlePayment = () => {
    alert(`You are paying ₹${totalCost}. Your payment is successful!`);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">{`Payment for ${placeName}`}</h1>

      {/* Number of persons input */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Number of Persons:</label>
        <input
          type="number"
          min="1"
          value={numPeople}
          onChange={(e) => setNumPeople(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />
      </div>

      {/* Total Cost */}
      <div className="mb-4">
        <span className="text-lg font-bold text-gray-800">{`Total Cost: ₹${totalCost}`}</span>
      </div>

      {/* Payment Options */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Select Payment Method:</label>
        <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
          <option value="upi">UPI</option>
          <option value="card">Credit/Debit Card</option>
          <option value="netbanking">Net Banking</option>
        </select>
      </div>

      {/* Book Now button */}
      <button
        onClick={handlePayment}
        className="w-full p-3 text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Pay ₹{totalCost}
      </button>
    </div>
  );
}

export default Payments;
