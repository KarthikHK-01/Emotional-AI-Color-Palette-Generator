import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const name = localStorage.getItem("username");

  function handleMenuClick() {
    setIsMenuClicked(!isMenuClicked);
  }

  async function handleLogout() {
  try {
    const res = await axios.post("http://localhost:3000/api/logout", { name });
    if (res.status === 200) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/");
    }
  } catch (err) {
    console.error("Logout failed:", err.message);
  }
}


  return (
    <nav className="bg-indigo-700 p-4 flex justify-between items-center w-full">
      <button onClick={() => navigate("/home")} ><h1 className="text-2xl font-semibold text-gray-50">ColorBuddy</h1></button>
      <div className="flex items-center space-x-4">
        <a
          href="/pricing"
          className="text-gray-50 font-semibold hover:text-gray-300">
          Pro Version
        </a>
        <div className="group relative">
          <button onClick={handleMenuClick} className="bg-gray-50 px-4 py-2 hover:bg-gray-200 rounded-md font-semibold">
            Menu ▼
          </button>
          {isMenuClicked ? <ul className="absolute mt-2 p-2 bg-gray-50 rounded-md shadow-md w-full justify-center">
            <li>
              <a
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-100 items-center">
                Your Profile
              </a>
            </li>
            <li>
              <a
                href="/favourites"
                className="block px-4 py-2 hover:bg-gray-100 items-center">
                Favourites
              </a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left block px-4 py-2 hover:bg-gray-100 items-center"
              >
                Sign Out
              </button>
            </li>

          </ul> : null}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
