import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  PROMPT,
  SelectBudgetOptions,
  SelectNoOfPersons,
} from "../../constants/Options"; // Removed SelectTransportOptions import
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { chatSession } from "@/Service/AiModel";
import { LogInContext } from "@/Context/LogInContext/Login";
import { db } from "@/Service/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState("");
  const [formData, setFormData] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const navigate = useNavigate();

  const { user, loginWithPopup, isAuthenticated } = useContext(LogInContext);

  const handleInputChange = (name, value) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const SignIn = async () => {
    await loginWithPopup();
  };

  const SaveUser = async () => {
    const User = JSON.parse(localStorage.getItem("User"));
    const id = User?.email;

    if (!id) {
      console.error("No valid user ID found!");
      return;
    }

    try {
      await setDoc(doc(db, "Users", id), {
        userName: User?.name || "Unnamed User",
        userEmail: User?.email || "No Email",
        userPicture: User?.picture || "",
        userNickname: User?.nickname || "",
      });
      console.log("User saved successfully");
    } catch (error) {
      console.error("Error saving user: ", error);
    }
  };

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAP_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = () => setIsScriptLoaded(true);
      document.body.appendChild(script);
    };

    loadScript();
  }, []);

  useEffect(() => {
    if (user && isAuthenticated) {
      localStorage.setItem("User", JSON.stringify(user));
      SaveUser();
    }
  }, [user, isAuthenticated]);

  const SaveTrip = async (TripData) => {
    const User = JSON.parse(localStorage.getItem("User"));
    const id = Date.now().toString(); // Generate a unique trip ID
  
    try {
      await setDoc(doc(db, "Trips", id), {
        tripId: id,
        userSelection: formData,
        tripData: TripData,
        userName: User?.name,
        userEmail: User?.email,
      });
      console.log("Trip saved successfully");
  
      // Redirect to the specific trip details page
      navigate(`/my-trips/${id}`, { state: { trip: TripData } });
  
    } catch (error) {
      console.error("Error saving trip: ", error);
    }
  };
  
  

  const generateTrip = async () => {
    if (!isAuthenticated) {
      toast("Sign In to continue", { icon: "⚠️" });
      return setIsDialogOpen(true);
    }
    if (!formData?.noOfDays || !formData?.location || !formData?.People || !formData?.Budget) {
      return toast.error("Please fill out every field or select every option.");
    }
    if (formData?.noOfDays > 5 || formData?.noOfDays < 1) {
      return toast.error("Please enter a valid number of Trip Days (1-5).");
    }
  
    const FINAL_PROMPT = PROMPT.replace(/{location}/g, formData?.location)
      .replace(/{noOfDays}/g, formData?.noOfDays)
      .replace(/{People}/g, formData?.People)
      .replace(/{Budget}/g, formData?.Budget);
  
    try {
      const toastId = toast.loading("Generating Trip", { icon: "✈️" });
      setIsLoading(true);
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const trip = JSON.parse(result.response.text());
  
      // Save the trip and navigate directly to the specific trip details page
      await SaveTrip(trip);
      toast.dismiss(toastId);
      toast.success("Trip Generated Successfully");
  
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Failed to generate trip. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="bg-gradient-to-b from-blue-100 via-blue-50 to-white p-10 rounded-md shadow-lg max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-800">Share Your Travel Preferences 🌟🚀</h2>
        <p className="text-md text-gray-500 mt-4">
          Help us craft your perfect adventure with just a few details. JourneyJolt will generate a tailored itinerary based on your preferences.
        </p>
      </div>

      <div className="form mt-10 space-y-12">
        <div className="place">
          <h2 className="font-semibold text-lg text-gray-800">Where do you want to Explore? 🏖️</h2>
          {isScriptLoaded ? (
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
              selectProps={{
                value: place,
                onChange: (place) => {
                  setPlace(place);
                  handleInputChange("location", place.label);
                },
              }}
            />
          ) : (
            <p>Loading Google Places...</p>
          )}
        </div>

        <div className="day">
          <h2 className="font-semibold text-lg text-gray-800">How long is your Trip? 🕜</h2>
          <Input
            className="border-2 border-gray-200 rounded-lg p-2"
            placeholder="Ex: 2"
            type="number"
            onChange={(day) => handleInputChange("noOfDays", day.target.value)}
          />
        </div>

        <div className="budget">
          <h2 className="font-semibold text-lg text-gray-800">What is your Budget? 💳</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {SelectBudgetOptions.map((item) => (
              <div
                key={item.id}
                onClick={() => handleInputChange("Budget", item.title)}
                className={`option cursor-pointer p-6 rounded-lg border-2 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg
                ${formData?.Budget === item.title && "border-blue-500 shadow-xl"}`}
              >
                <h3 className="font-bold text-lg text-gray-700">{item.icon} {item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="people">
          <h2 className="font-semibold text-lg text-gray-800">Who are you traveling with? 🚗</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {SelectNoOfPersons.map((item) => (
              <div
                key={item.id}
                onClick={() => handleInputChange("People", item.no)}
                className={`option cursor-pointer p-6 rounded-lg border-2 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg
                ${formData?.People === item.no && "border-green-500 shadow-xl"}`}
              >
                <h3 className="font-bold text-lg text-gray-700">{item.icon} {item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
                <p className="text-sm text-gray-500">{item.no}</p>
              </div>
            ))}
          </div>
        </div>

        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md w-full mt-10"
          onClick={generateTrip}
          disabled={isLoading}
        >
          {isLoading ? <AiOutlineLoading3Quarters className="animate-spin" /> : "Generate My Trip"}
        </Button>
      </div>

      {/* Sign In Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in to Proceed</DialogTitle>
            <DialogDescription>Sign in to create and save your trips!</DialogDescription>
          </DialogHeader>
          <Button className="bg-gray-200 text-gray-800" onClick={SignIn}>
            <FcGoogle className="mr-2" /> Sign in with Google
          </Button>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
