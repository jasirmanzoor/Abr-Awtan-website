import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Fleet from "./pages/Fleet";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import ShipNow from "./pages/ShipNow";
import TrackPage from "./pages/TrackPage";
import RateCalculator from "./pages/RateCalculator";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AIAssistant from "./components/AIAssistant";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/ship-now" element={<ShipNow />} />
          <Route path="/track" element={<TrackPage />} />
          <Route path="/rate-calculator" element={<RateCalculator />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
        <AIAssistant />
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
