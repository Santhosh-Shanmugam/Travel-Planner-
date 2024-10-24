import { LogInContext } from "@/Context/LogInContext/Login";
import { getCityDetails, PHOTO_URL } from "@/Service/GlobalApi";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Locationinfo() {
  const { trip } = useContext(LogInContext);
  const [cityDets, setCityDets] = useState([]);
  const [photos, setPhotos] = useState('');
  const [Url, setUrl] = useState('');

  const city = trip?.tripData?.location;

  const getCityInfo = async () => {
    const data = {
      textQuery: city
    }
    const result = await getCityDetails(data).then((res) => {
      setCityDets(res.data.places[0]);
      setPhotos(res.data.places[0].photos[0].name);
    }).catch((err) => console.log(err));
  }

  useEffect(() => {
    trip && getCityInfo();
  }, [trip]);

  useEffect(() => {
    const url = PHOTO_URL.replace('{replace}', photos);
    setUrl(url);
  }, [photos]);

  return (
    <div className="bg-white shadow-md rounded-lg p-5">
      <Link to={cityDets.googleMapsUri} className="cursor-pointer">
        <img
          src={Url || '/images/main_img_placeholder.jpg'}
          className="h-[300px] w-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
          alt="place"
        />
      </Link>
      <h2 className="mt-4 font-bold text-lg sm:text-xl text-blue-800">Travel Details</h2>
      <div className="location-info flex flex-wrap gap-2 mt-2">
        <h3 className="name w-fit bg-blue-100 text-blue-800 p-2 px-4 rounded-full font-semibold text-sm md:text-lg">
          📍 {trip?.userSelection?.location}
        </h3>
        <h3 className="name w-fit bg-blue-100 text-blue-800 p-2 px-4 rounded-full font-semibold text-sm md:text-lg">
          💵 {trip?.userSelection?.Budget}
        </h3>
        <h3 className="name w-fit bg-blue-100 text-blue-800 p-2 px-4 rounded-full font-semibold text-sm md:text-lg">
          🤝 {trip?.userSelection?.People}
        </h3>
        <h3 className="name w-fit bg-blue-100 text-blue-800 p-2 px-4 rounded-full font-semibold text-sm md:text-lg">
          📆 {trip?.userSelection?.noOfDays} Day
        </h3>
      </div>
    </div>
  );
}

export default Locationinfo;
