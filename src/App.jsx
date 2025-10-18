import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./views/home";
import About from "./views/About";
import Contact from "./views/Contact";

const App = () => {
  return (
    <div>
      <nav style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default App;
