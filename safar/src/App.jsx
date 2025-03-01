import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import FlightPrediction from "./pages/FlightPrediction";
import FlightTracker from "./pages/MapView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/predict-flight" element={<FlightPrediction />} />
      <Route path="/track-flight" element={<FlightTracker />} />
    </Routes>
  );
}

export default App;
