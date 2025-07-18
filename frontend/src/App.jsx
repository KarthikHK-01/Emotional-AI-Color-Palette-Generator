import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import Pricing from "./pages/Pricing";
import Profile from "./pages/Profile";
import GenerateColors from "./pages/GenerateColors";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pricing" element={<Pricing/>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
        <Route path="/favourites" element={<ProtectedRoute><Favourites/></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/generate-colors" element={<ProtectedRoute><GenerateColors/></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App;
