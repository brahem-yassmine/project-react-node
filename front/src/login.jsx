import "./login.css";
import labo from "./assets/fillelab.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("✅ Réponse serveur :", data);

      if (!response.ok) {
        setError(data.message || "Identifiants incorrects");
        return;
      }

      // ✅ Vérification minimale
      if (!data.token || !data.role) {
        setError("Réponse serveur invalide");
        return;
      }

      // ✅ Stockage dans le localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("firstName", data.firstName);
      localStorage.setItem("lastName", data.lastName);
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);

      // ✅ Redirection selon rôle
      switch (data.role) {
        case "patient":
          navigate("/patient");
          break;
        case "analyst":
          navigate("/analyst");
          break;
        case "counter_clerk":
          navigate("/formulaire");
          break;
        default:
          setError("Rôle inconnu");
          break;
      }
    } catch (err) {
      console.error("Erreur connexion :", err);
      setError("Erreur serveur");
    }
  };

  return (
    <div className="all">
      <div className="main">
        <div className="formulaire">
          <h1>BioCheck</h1>
          <h2>Reliable Testing. Real-Time Results</h2>

          {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

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

          <button onClick={handleLogin} className="mybtnLog">
            Login
          </button>
          <button onClick={() => navigate("/sign")} className="btn1">
            Create an Account
          </button>
        </div>
        <img className="image" src={labo} alt="labo" />
      </div>
    </div>
  );
}
