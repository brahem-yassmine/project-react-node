import "./login.css";
import labo from "./assets/fillelab.jpg";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sign() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || "Compte créé avec succès !");
        setError("");

        
        setTimeout(() => {
          if (role === "patient") {
            navigate("/patient");
          } else if (role === "analyst") {
            navigate("/analyst");
          } else if (role === "counter_clerk") {
            navigate("/formulaire");
          } else {
            navigate("/login");
          }
        }, 1000);
      } else {
        setError(data.message || "Échec de l'inscription");
        setSuccess("");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Erreur serveur");
      setSuccess("");
    }
  };

  return (
    <div className="all">
      <div className="main" id="main2">
        <div className="formulaire">
          <h1>BioCheck</h1>
          <h2>Reliable Testing. Real-Time Results</h2>

          <label>First Name</label>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label>Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="role-selector">
            <label>Select your role:</label>
            <div>
              <input
                type="radio"
                id="patient"
                name="role"
                value="patient"
                checked={role === "patient"}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="patient">Patient</label>
            </div>
            <div>
              <input
                type="radio"
                id="analyst"
                name="role"
                value="analyst"
                checked={role === "analyst"}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="analyst">Analyst</label>
            </div>
            <div>
              <input
                type="radio"
                id="counter_clerk"
                name="role"
                value="counter_clerk"
                checked={role === "counter_clerk"}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="counter_clerk">Counter Clerk</label>
            </div>
          </div>

          {error && <p className="message error">{error}</p>}
          {success && <p className="message success">{success}</p>}

          <button onClick={handleRegister} className="mybtn">
            Register
          </button>
          <button onClick={() => navigate("/signin")} className="btn">
            I already have an account
          </button>
        </div>
        <img className="image" src={labo} alt="lab" />
      </div>
    </div>
  );
}
