import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "react-responsive";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogInContext } from "@/Context/LogInContext/Login";
import { getPlaceDetails, PHOTO_URL } from "@/Service/GlobalApi";

function PlaceCards({ place }) {
  const isMobile = useMediaQuery({ query: "(max-width: 445px)" });
  const isSmall = useMediaQuery({ query: "(max-width: 640px)" });
  console.log("Place",place)
  const { trip } = useContext(LogInContext);
  const city = trip?.tripData?.location;
  const navigate = useNavigate(); // Hook to navigate

  const [placeDets, setPlaceDets] = useState([]);
  const [photos, setPhotos] = useState("");
  const [Url, setUrl] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");

  const getPlaceInfo = async () => {
    const data = {
      textQuery: place.name + city,
    };
    try {
      const res = await getPlaceDetails(data);
      console.log("Place Details",res.data)
      setPlaceDets(res.data.places[0]);
      setPhotos(res.data.places[0].photos[0].name);
      setAddress(res.data.places[0].formattedAddress);
      setLocation(res.data.places[0].googleMapsUri);
    } catch (err) {
      console.error("Hello"+err);
    }
  };

  useEffect(() => {
    if (trip) getPlaceInfo();
  }, [trip]);

  useEffect(() => {
    const url = PHOTO_URL.replace("{replace}", photos);
    setUrl(url);
  }, [photos]);

  const handleAddButtonClick = () => {
    // Navigate to another page and pass the place details, including the image URL
    navigate("/place-details", { state: { place, address, location, photos: Url } });
  };

  return (
    <div className="mb-6">
      <Popover className="sm:text-left">
        <PopoverTrigger>
          <Card className="mt-4 transition-transform duration-300 ease-in-out hover:scale-105 text-left bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="img h-full rounded-lg overflow-hidden mb-4">
              <img
                src={Url || "/logo.png"}
                className="h-48 w-full object-cover"
                alt={place.name}
              />
            </div>
            <div className="text-content p-4 flex flex-col">
              <CardHeader>
                <CardTitle className="font-semibold text-xl">{place.name}</CardTitle>
                <CardDescription className="text-sm text-gray-500 line-clamp-2">
                  {place.details}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-2">
                <div className="text-base text-gray-700">
                  <span className="text-base font-medium">🕒 Timings:</span>{" "}
                  {place.timings} <br />
                  <span className="text-base font-medium">💵 Price: </span>{" "}
                  {place.pricing} <br />
                  <span className="text-base font-medium">📍 Location:{" "}</span>{" "}
                  {address ? address : place.address} <br />
                  <br />
                </div>
                <Button
                  className="mt-4 w-full bg-blue-500 text-white"
                  onClick={handleAddButtonClick}
                >
                  Explore
                </Button>
              </CardContent>
            </div>
          </Card>
        </PopoverTrigger>
        <PopoverContent className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-medium leading-none">Details:</h3>
          <p className="text-muted-foreground">{place.details}</p>
          <div className="mt-4">
            <Link
              to={location ? location : `https://www.google.com/maps/search/${place.name},${city}`}
              target="_blank"
              className="mt-3"
            >
              <Button className="w-full">See in Map</Button>
            </Link>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default PlaceCards;
