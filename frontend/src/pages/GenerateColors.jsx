import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function GenerateColors() {
    const navigate = useNavigate();
    const [colors, setColors] = useState([
    "#FFFFFF",
    "#FFFFFF",
    "#FFFFFF",
    "#FFFFFF",
    "#FFFFFF"
  ]);

  const location = useLocation();
  const mood = localStorage.getItem("mood") || location.state?.mood || "neutral";

  useEffect(() => {
  async function useAI(){
    try {
      const result = await axios.post("http://localhost:3000/api/generate-colors", { mood });
      let apiColors = result.data.colors;

      if (typeof apiColors === "string") {
        apiColors = JSON.parse(apiColors);
      }

      if (Array.isArray(apiColors)) {
        setColors(apiColors);
      } else {
        console.error("Colors is not an array:", apiColors);
      }

    } catch (err) {
      console.log("Error fetching colors:", err);
    }
  }

  useAI();
}, []);


  async function handleSave() {
    try{
      const result = await axios.post("http://localhost:3000/api/save-colors", {colors, mood}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if(result.status !== 200){
        console.log("Some error, please try again later.");
      }else{
        alert("Added to your favourites");
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex flex-col">
        <div className="flex-1 grid grid-rows-5">
          {colors.map((color, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-center text-white text-xl font-semibold"
              style={{ backgroundColor: color }}>
              {color}
            </div>
          ))}
        </div>

        <div className="flex justify-center p-4 bg-gray-100 border-t">
        <h1 className="bg-indigo-700 text-white font-semibold px-6 py-3 transition duration-300 mr-5">Mood: {mood}</h1>
        <button className="bg-indigo-700 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-600 transition duration-300 mr-5" onClick={() => navigate("/home")}>Back to home</button>
          <button
            onClick={handleSave}
            className="bg-indigo-700 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-600 transition duration-300"
          >
            Save as Favourite
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default GenerateColors; 
