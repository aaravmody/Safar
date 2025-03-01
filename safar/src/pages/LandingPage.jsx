import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import { Plane, MapPin, Search } from "lucide-react";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-900 text-white overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center mt-32 px-4">
        <motion.h1
          className="text-6xl font-extrabold leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Explore the World with <span className="text-yellow-400">Safar</span>
        </motion.h1>
        <p className="text-lg mt-4 max-w-2xl">
          Find the best flights, hotels, and experiences at unbeatable prices. Let AI guide your journey!
        </p>

        {/* Search Bar */}
        <div className="mt-8 flex bg-white p-2 rounded-full shadow-lg w-full max-w-lg">
          <div className="flex items-center gap-2 px-4 flex-1">
            <MapPin className="text-gray-500" />
            <input
              type="text"
              placeholder="From where?"
              className="focus:outline-none text-gray-800 w-full"
            />
          </div>
          <div className="flex items-center gap-2 px-4 border-l border-gray-300 flex-1">
            <MapPin className="text-gray-500" />
            <input
              type="text"
              placeholder="To where?"
              className="focus:outline-none text-gray-800 w-full"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full text-white font-semibold flex items-center gap-2">
            <Search size={18} />
            Search
          </button>
        </div>

        {/* CTA Buttons */}
        <div className="mt-6 flex gap-4">
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-6 py-3 rounded-full font-semibold shadow-lg">
            Book Now
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
            Learn More
          </Button>
        </div>
      </div>

      {/* Animated Plane */}
      <motion.div
        className="absolute bottom-10 right-10 text-white"
        animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Plane size={60} />
      </motion.div>
    </div>
  );
};

export default LandingPage;
