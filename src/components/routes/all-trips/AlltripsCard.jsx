// AlltripsCard.jsx
import { getCityDetails, PHOTO_URL } from "@/Service/GlobalApi";
import React, { useEffect, useState } from "react";

function AlltripsCard({ trip }) {
  const [cityDets, setCityDets] = useState([]);
  const [photos, setPhotos] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const city = trip?.tripData?.location;

  const getCityInfo = async () => {
    setLoading(true);
    const data = {
      textQuery: city,
    };
    try {
      const res = await getCityDetails(data);
      setCityDets(res.data.places[0]);
      setPhotos(res.data.places[0].photos[0].name);
    } catch (err) {
      console.error(err);
      setError("Failed to load city details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (trip) getCityInfo();
  }, [trip]);

  useEffect(() => {
    if (photos) {
      const url = PHOTO_URL.replace("{replace}", photos);
      setUrl(url);
    }
  }, [photos]);

  return (
    <div className="bg-white hover:scale-105 transition-transform duration-300 hover:shadow-xl w-72 min-h-48 rounded-lg border border-gray-200 p-3 shadow-sm">
      <div className="h-32 w-full border border-gray-200 overflow-hidden rounded-lg relative">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <span className="loader">Loading...</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-red-500">{error}</span>
          </div>
        ) : (
          <img
            src={url || "/logo.png"}
            alt={`Trip to ${city}`}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        )}
      </div>
      <div className="text flex flex-col mt-2">
        <h2 className="font-semibold text-sm text-center text-gray-800 p-1">
          {trip.userSelection.location}
        </h2>
        <h2 className="font-normal text-xs text-center text-gray-600 p-1">
          {trip.userSelection.noOfDays} Days Trip
        </h2>
        <h2 className="font-normal text-xs text-center text-gray-600 p-1">
          with {trip.userSelection.Budget} Level Budget
        </h2>
      </div>
    </div>
  );
}

export default AlltripsCard;
