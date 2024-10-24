import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

function HotelCards({ hotel }) {
  const isMobile = useMediaQuery({ query: "(max-width: 445px)" });
  const isSmall = useMediaQuery({ query: "(max-width: 640px)" });

  const [placeDets, setPlaceDets] = useState([]);
  const [photos, setPhotos] = useState("");
  const [Url, setUrl] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");

  const { trip } = useContext(LogInContext);
  const city = trip?.tripData?.location;

  const getPlaceInfo = async () => {
    const data = {
      textQuery: hotel.name + city,
    };
    try {
      const res = await getPlaceDetails(data);
      setPlaceDets(res.data.places[0]);
      setPhotos(res.data.places[0].photos[0].name);
      setAddress(res.data.places[0].formattedAddress);
      setLocation(res.data.places[0].googleMapsUri);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (trip) getPlaceInfo();
  }, [trip]);

  useEffect(() => {
    const url = PHOTO_URL.replace("{replace}", photos);
    setUrl(url);
  }, [photos]);

  return (
    <div className="mb-6"> {/* Added margin bottom for spacing */}
      <Popover className="sm:text-left">
        <PopoverTrigger>
          <Card className="grid mt-4 transition-transform duration-300 ease-in-out hover:scale-105 text-left bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="img h-full rounded-t-lg bg-gray-200 overflow-hidden">
              <img
                src={Url || "/logo.png"}
                className="h-48 w-full object-cover"
                alt={hotel.name}
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="text-content p-4 flex flex-col">
              <CardHeader>
                <CardTitle className="font-semibold text-xl">{hotel.name}</CardTitle>
                <CardDescription className="text-sm text-gray-500 line-clamp-2">
                  {hotel.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-2">
                <div className="text-base text-gray-700">
                  ⭐ Rating: {hotel.rating} <br />
                  💵 Price: {hotel.price} <br />
                  📍 Location: {address ? address : hotel.address}
                </div>
              </CardContent>
            </div>
          </Card>
        </PopoverTrigger>
        <PopoverContent className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-medium leading-none">Description:</h3>
          <p className="text-muted-foreground">{hotel.description}</p>
          <div className="mt-4">
            <Link
              to={location ? location : `https://www.google.com/maps/search/${hotel.name},${city}`}
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

export default HotelCards;
