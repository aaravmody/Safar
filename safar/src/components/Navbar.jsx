import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-5 bg-transparent absolute w-full">
      <Link to="/" className="text-3xl font-bold tracking-wide">Safar</Link>
      <div className="flex gap-6">
        <Link to="/predict-flight" className="text-white hover:text-yellow-400 font-semibold">
          Flight Prediction
        </Link>
        <Link to="/plan-itinerary" className="text-white hover:text-yellow-400 font-semibold">
          Itinerary Planner
        </Link>
        <Link to="/track-flight" className="text-white hover:text-yellow-400 font-semibold">
          Track Flight
        </Link>
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold shadow-lg"
      >
        Sign In
      </motion.button>
    </nav>
  );
};

export default Navbar;
