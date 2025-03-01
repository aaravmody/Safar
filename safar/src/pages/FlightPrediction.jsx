import { useState } from "react";
import Select from "react-select"; // Import react-select
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

// Dropdown Options
const cities = [
    { label: "Bangalore", value: "Bangalore" },
    { label: "Mumbai", value: "Mumbai" },
    { label: "Chennai", value: "Chennai" },
    { label: "Hyderabad", value: "Hyderabad" },
    { label: "Kolkata", value: "Kolkata" },
    { label: "Delhi", value: "Delhi" },
];

const airlines = [
    { label: "SpiceJet", value: "SpiceJet" },
    { label: "AirAsia", value: "AirAsia" },
    { label: "Vistara", value: "Vistara" },
    { label: "GO_FIRST", value: "GO_FIRST" },
    { label: "Indigo", value: "Indigo" },
    { label: "Air India", value: "Air India" },
];

const flightClasses = [
    { label: "Economy", value: "Economy" },
    { label: "Business", value: "Business" },
];

const FlightPrediction = () => {
    const [formData, setFormData] = useState({
        source: null,
        destination: null,
        travelDate: "",
        airline: null,
        flightClass: "", 
    });

    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.source || !formData.destination || !formData.airline) {
            alert("Please fill in all fields.");
            setLoading(false);
            return;
        }

        // Convert frontend form data to backend format
        const requestData = {
            airline: formData.airline.value,
            source_city: formData.source.value,
            destination_city: formData.destination.value,
            departure_time: "10:00", // Hardcoded for now
            arrival_time: "12:30", // Hardcoded for now
            stops: "1", // Hardcoded, make dynamic if needed
            duration: 2.5, // Example value
            class: formData.flightClass.value, // Economy or Business
            days_left: 30,
        };

        // Calculate days left until travel
        const today = new Date();
        const travelDate = new Date(formData.travelDate);
        requestData.days_left = Math.max(
            Math.ceil((travelDate - today) / (1000 * 60 * 60 * 24)),
            0
        );

        try {
            const response = await fetch("http://localhost:5001/predict-flight-price", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();
            console.log(data);
            setPrediction(data.predicted_price);
        } catch (error) {
            console.error("Error fetching prediction:", error);
        }

        setLoading(false);
    };

    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-blue-600 to-indigo-900 text-white">
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 mt-24">
                <motion.h1
                    className="text-4xl font-bold mb-6 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Flight Price Prediction ✈️
                </motion.h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md"
                >
                    {/* Source Dropdown */}
                    <label className="block mb-2 font-semibold">Source</label>
                    <Select
                        options={cities}
                        value={formData.source}
                        onChange={(selectedOption) =>
                            setFormData({ ...formData, source: selectedOption })
                        }
                        placeholder="Select Source"
                        isSearchable
                        className="mb-4"
                    />

                    {/* Destination Dropdown */}
                    <label className="block mb-2 font-semibold">Destination</label>
                    <Select
                        options={cities}
                        value={formData.destination}
                        onChange={(selectedOption) =>
                            setFormData({ ...formData, destination: selectedOption })
                        }
                        placeholder="Select Destination"
                        isSearchable
                        className="mb-4"
                    />

                    {/* Travel Date Input */}
                    <label className="block mb-2 font-semibold">Travel Date</label>
                    <input
                        type="date"
                        name="travelDate"
                        value={formData.travelDate}
                        onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                        required
                        className="w-full p-2 border rounded mb-4"
                    />

                    {/* Airline Dropdown */}
                    <label className="block mb-2 font-semibold">Airline</label>
                    <Select
                        options={airlines}
                        value={formData.airline}
                        onChange={(selectedOption) =>
                            setFormData({ ...formData, airline: selectedOption })
                        }
                        placeholder="Select Airline"
                        isSearchable
                        className="mb-4"
                    />

                    {/* Class Dropdown */}
                    <label className="block mb-2 font-semibold">Class</label>
                    <Select
                        options={flightClasses}
                        value={formData.flightClass}
                        onChange={(selectedOption) =>
                            setFormData({ ...formData, flightClass: selectedOption })
                        }
                        className="mb-4"
                    />

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded"
                    >
                        Predict Price
                    </motion.button>
                </form>

                {loading && <p className="mt-4 text-lg">Predicting...</p>}
                {prediction && (
                    <motion.div
                        className="mt-6 bg-white text-blue-900 p-6 rounded-lg shadow-lg text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-lg font-semibold">Estimated Flight Price:</p>
                        <p className="text-4xl font-bold mt-2 text-blue-700">₹{prediction}</p>
                    </motion.div>
                )}

            </div>
        </div>
    );
};

export default FlightPrediction;
