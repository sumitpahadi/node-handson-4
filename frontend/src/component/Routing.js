import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import { Link } from "react-router-dom";
import "./Style.css";
function Routing() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Register</Link>
          </li>
          <li>
            <Link to={"/login"}>login</Link>
          </li>
          <li>
            <Link to={"/home"}>Home</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default Routing;
