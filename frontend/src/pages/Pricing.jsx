import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Pricing() {
  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900">
      <Navbar />

      {/* Main Section */}
      <main className="flex-grow p-6">
        <h2 className="text-4xl font-semibold mb-4">
          Our Pricing Plans
        </h2>

        <div className="flex space-x-4">
          {/* Plan 1 */}
          <div className="bg-gray-50 p-6 rounded-md shadow-md">
            <h3 className="text-2xl font-semibold">Basic</h3>
            <p>Free</p>
            <ul className="list-inside list-decimal mt-4">
              <li>5 color generations per day</li>
              <li>Save up to 5 color palettes</li>
            </ul>
          </div>

          {/* Plan 2 */}
          <div className="bg-gray-50 p-6 rounded-md shadow-md">
            <h3 className="text-2xl font-semibold">Pro</h3>
            <p>$9.99/mo</p>
            <ul className="list-inside list-decimal mt-4">
              <li>Unlimited color generations</li>
              <li>Save unlimited color palettes</li>
              <li>Export color palettes</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Pricing;
