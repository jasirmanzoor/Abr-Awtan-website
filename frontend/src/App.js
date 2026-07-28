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
import ExecutiveDeck from "./pages/ExecutiveDeck";
import AIAssistant from "./components/AIAssistant";
import { Toaster } from "./components/ui/toaster";
import { LangProvider } from "./context/LangContext";

function App() {
  return (
    <div className="App">
      <LangProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/deck" element={<ExecutiveDeck />} />
            <Route path="/executive" element={<ExecutiveDeck />} />
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
      </LangProvider>
    </div>
  );
}

export default App;
