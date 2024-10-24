import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTree, FaBus, FaBicycle, FaHotel, FaUtensils, FaHandsWash } from "react-icons/fa";

function PlaceDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { place, address, location: googleMapUrl, photos, rating, pricing } = location.state || {};

  useEffect(() => {
    console.log("Location state:", location.state); // Debugging log
    console.log("Pricing:", pricing); // Debugging log
  }, [location]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-yellow-500 ${i <= rating ? "fas fa-star" : "far fa-star"}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  const handleBookNow = () => {
    navigate("/payment", {
      state: {
        pricePerPerson: pricing,
        placeName: place?.name,
      },
    });
  };

  const isPricingValid = (pricing) => {
    return pricing && pricing !== "Free";
  };

  const ecoFriendlyFeatures = [
    { text: "Use public transportation like buses or trains to reduce your carbon footprint.", icon: <FaBus className="text-green-500 text-2xl mr-2" /> },
    { text: "Consider walking or renting a bike to explore the area.", icon: <FaBicycle className="text-green-500 text-2xl mr-2" /> },
    { text: "Stay at eco-friendly accommodations that are certified for sustainability.", icon: <FaHotel className="text-green-500 text-2xl mr-2" /> },
    { text: "Dine at local restaurants that source their ingredients sustainably.", icon: <FaUtensils className="text-green-500 text-2xl mr-2" /> },
    { text: "Participate in local clean-up events to help maintain the beauty of the area.", icon: <FaHandsWash className="text-green-500 text-2xl mr-2" /> }
  ];

  const tripIdeas = [
    { text: "Explore local markets to experience the culture and cuisine.", icon: <FaUtensils className="text-blue-500 text-xl mr-2" /> },
    { text: "Plan a visit to nearby natural landmarks for scenic views and hiking.", icon: <FaTree className="text-green-500 text-xl mr-2" /> },
    { text: "Check out local festivals or events that might be happening during your stay.", icon: <FaHandsWash className="text-yellow-500 text-xl mr-2" /> },
    { text: "Look for eco-friendly transportation options to reduce your carbon footprint.", icon: <FaBus className="text-red-500 text-xl mr-2" /> },
    { text: "Research the best time to visit famous landmarks to avoid crowds.", icon: <FaHotel className="text-purple-500 text-xl mr-2" /> }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {photos && (
          <div className="relative overflow-hidden h-64">
            <img
              src={photos}
              alt={place?.name}
              className="h-full w-full object-cover transform transition-transform duration-500 hover:scale-110"
            />
          </div>
        )}

        <div className="p-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{place?.name}</h1>
          <div className="flex items-center mb-4">
            <span className="text-xl font-medium text-gray-700">Rating:</span>
            <div className="flex ml-2">{renderStars(rating || 0)}</div>
          </div>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <span className="inline-block p-2 bg-blue-100 text-blue-500 rounded-full">📍</span>
              <span className="ml-3 text-gray-700 text-lg font-medium">Address:</span>
            </div>
            <p className="text-gray-600">{address || "Not available"}</p>
          </div>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <span className="inline-block p-2 bg-yellow-100 text-yellow-500 rounded-full">🕒</span>
              <span className="ml-3 text-gray-700 text-lg font-medium">Timings:</span>
            </div>
            <p className="text-gray-600">{place?.timings || "Not available"}</p>
          </div>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <span className="inline-block p-2 bg-green-100 text-green-500 rounded-full">💵</span>
              <span className="ml-3 text-gray-700 text-lg font-medium">Price:</span>
            </div>
            <p className="text-gray-600">{place?.pricing || "Not available"}</p>
          </div>
          {isPricingValid(pricing) && (
            <div className="mt-6">
              <button
                onClick={handleBookNow}
                className="inline-block px-6 py-3 text-white bg-green-500 rounded-lg shadow-lg hover:bg-green-600 transition-colors duration-300"
              >
                Book Now
              </button>
            </div>
          )}
          <div className="mt-6">
            <a
              href={googleMapUrl || `https://www.google.com/maps/search/${place?.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300"
            >
              See in Google Maps
            </a>
          </div>
        </div>

        {/* Eco-Friendly Features section */}
        <div className="bg-green-50 p-4 mt-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-green-800 mb-4 mt-10">Eco-Friendly Travel Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ecoFriendlyFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex items-start transform hover:scale-105"
              >
                <div className="text-2xl mr-3">{feature.icon}</div>
                <span className="ml-3 text-gray-700">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* General Trip Ideas section */}
        <div className="bg-blue-50 p-4 mt-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Trip Ideas for a Great Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tripIdeas.map((idea, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md transition-shadow duration-300 p-4 flex items-start transform hover:scale-105 hover:shadow-lg"
              >
                <div className="text-2xl mr-3">{idea.icon}</div>
                <p className="text-gray-600">{idea.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceDetailsPage;
