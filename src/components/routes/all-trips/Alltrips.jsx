import { LogInContext } from "@/Context/LogInContext/Login";
import { db } from "@/Service/Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import AlltripsCard from "./AlltripsCard";
import { Link } from "react-router-dom";

function Alltrips() {
  const { user } = useContext(LogInContext);
  const [allTrips, setAllTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllTrips = async () => {
    try {
      setLoading(true);
      const queryRef = query(
        collection(db, "Trips"),
        where("userEmail", "==", user?.email)
      );
      const querySnapshot = await getDocs(queryRef);

      const trips = querySnapshot.docs.map(doc => doc.data());
      setAllTrips(trips);
    } catch (err) {
      console.error(err);
      setError("Failed to load trips. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) getAllTrips();
  }, [user]);

  return (
    <div className="p-5 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="font-medium text-lg text-center sm:text-left sm:text-2xl sm:font-bold mb-5 text-blue-700">
        All Trips
      </h1>
      <div className="container mx-auto flex gap-4 flex-wrap justify-center">
        {loading ? (
          <div className="w-full flex justify-center py-10">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid border-opacity-50"></div>
          </div>
        ) : error ? (
          <div className="w-full text-center text-red-500">
            {error}
          </div>
        ) : allTrips?.length > 0 ? (
          allTrips.map((trip, idx) => (
            <Link key={idx} to={`/my-trips/${trip.tripId}`} className="transform transition-transform duration-300 hover:scale-105">
              <AlltripsCard trip={trip} />
            </Link>
          ))
        ) : (
          <div className="w-full text-center text-gray-500">
            No trips found. Start planning your adventures!
          </div>
        )}
      </div>
    </div>
  );
}

export default Alltrips;
