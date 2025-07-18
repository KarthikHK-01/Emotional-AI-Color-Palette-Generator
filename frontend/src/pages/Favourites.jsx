import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import axios from "axios";

function Favourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    async function fetchFavourites() {
      try {
        const res = await axios.get("http://localhost:3000/api/getFavourites", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFavourites(res.data.favourites);
        console.log("Fetched favourites:", res.data.favourites);
      } catch (err) {
        console.error("Error fetching favourites:", err);
      }
    }

    fetchFavourites();
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      

      <main className="flex-grow p-6">
        <h2 className="text-4xl font-semibold mb-4">Your Favourites</h2>
        <div className="flex flex-col items-center space-y-4">
          {favourites.map((fav, index) => (
            <Card key={index} mood={fav.mood} colors={fav.colors} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Favourites;
