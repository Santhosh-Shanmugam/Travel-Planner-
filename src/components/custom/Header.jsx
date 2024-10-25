import React, { useContext } from "react";
import { Button } from "../ui/button.jsx";
import { LogInContext } from "@/Context/LogInContext/Login.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaGlobe, FaMapMarkedAlt } from "react-icons/fa"; // Replaced icons with Font Awesome
import { AiOutlineUser } from "react-icons/ai"; // New user icon

function Header() {
  const { user, isAuthenticated, logout, loginWithPopup } = useContext(LogInContext);

  const LogOut = () => {
    logout();
  };

  const LogIn = () => {
    loginWithPopup();
  };

  return (
    <div className="w-full flex items-center justify-between shadow-lg bg-gradient-to-r from-blue-500 to-indigo-500 p-3 md:px-5 text-white">
      {/* Logo Section */}
      <div className="logo flex gap-2 items-center justify-between">
        <div className="img inline-block h-8 w-8 md:h-12 md:w-12">
          <Link to="/">
            <img src="/logoipsum-247.svg" alt="Logo" className="rounded-full shadow-md" />
          </Link>
        </div>
        <h1 className="text-lg md:text-3xl font-bold tracking-wide">Travel Planner</h1>
      </div>

      {/* User Section */}
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="">
            <div className="user flex items-center gap-2 mr-3">
              <h2 className="hidden sm:block font-medium text-white">{user.given_name}</h2>
              <div className="userimg overflow-hidden h-10 w-10 rounded-full">
                <img src={user.picture} alt="User Profile" />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="text-center sm:text-left bg-white text-gray-900 rounded-md shadow-lg">
            <DropdownMenuLabel className="font-semibold text-xl flex items-center gap-2">
              <AiOutlineUser /> My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-lg hover:bg-gray-100 p-2">
              <Link to="/all-trips" className="flex items-center gap-2">
                <FaMapMarkedAlt className="h-5 w-5 text-orange-500" />
                My Trips
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-lg hover:bg-gray-100 p-2">
              <Link to="/plan-a-trip" className="flex items-center gap-2">
                <FaGlobe className="h-5 w-5 text-green-500" />
                Create Trip
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-lg">
              <Button onClick={LogOut} className="w-full">
                Log Out
                <DropdownMenuShortcut>
                  <FaSignOutAlt className="h-4 ml-2" />
                </DropdownMenuShortcut>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={LogIn} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 transition duration-300">
          Sign In
          <DropdownMenuShortcut>
            <FaSignInAlt className="h-4" />
          </DropdownMenuShortcut>
        </Button>
      )}
    </div>
  );
}

export default Header;
