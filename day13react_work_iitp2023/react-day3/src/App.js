import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Profile from "./components/Profile";
import Nav from "./components/Nav";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/about" element={<About />} ></Route>
        <Route path="/gallery" element={<Gallery />} ></Route>
        <Route path="/Profile" element={<Profile />} ></Route>
      </Routes>
    </Router>
  );
}

export default App;
