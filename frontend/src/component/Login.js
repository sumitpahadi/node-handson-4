import React, { useState } from "react";
import "./Style.css"; // Create a Login.css file for styling
import axios from "axios";

function Login() {
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add code to handle form submission here
    console.log("Form submitted:", formData);
    const token = localStorage.getItem("token");
    console.log("token is "+token);

    axios
      .post("http://localhost:5001/login", formData)
      .then((response) => {
        if (response.data.msg==null) {
          alert(response.data)
          
        }
        else{
          alert(response.data.msg)
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
