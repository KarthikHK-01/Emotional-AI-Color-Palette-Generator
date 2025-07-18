import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Home() {
    const [mood, setMood] = useState("");
    const navigate = useNavigate();

    function handleGenerate(){
        localStorage.setItem("mood", mood);
        navigate("/generate-colors");
    }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-4xl font-semibold mb-6">
            What's your mood today?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center">
            <input
              type="text"
              placeholder="Enter your mood"
              className="border p-2 rounded-md sm:mr-4 mb-4 sm:mb-0 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-700" name="mood" onChange={(e) => {setMood(e.target.value)}}
            />
            <button className="bg-indigo-700 text-white px-4 py-2 rounded-md font-semibold hover:bg-indigo-500" onClick={handleGenerate}>
              Generate Colors
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
