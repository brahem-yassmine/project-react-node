import "./home.css";
import fillelabo from "./assets/fillelab.jpg";
import laboImage from "./assets/labo.jpg";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Menu avec logo et About Us */}
      <div className="top-bar">
        <div className="logo">BioCheck</div>
        <div className="nav-links">
          <span onClick={() => navigate("/aboutUs")}>About Us</span>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="main-content">
        <div className="image-section left-image">
          <img src={fillelabo} alt="Fille au laboratoire" />
        </div>

        <div className="text-section">
          <h1>Reliable Testing. Real-Time Results</h1>
          <p>
            Our smart medical laboratory platform makes patient test tracking easier and faster.
            It connects receptionists, analysts, and patients to ensure smooth communication and
            real-time updates. Access your results, follow progress, and stay informed — all in one place.
          </p>
          <button onClick={() => navigate("/signin")}>Let’s Start</button>
        </div>

        <div className="image-section right-image">
          <img src={laboImage} alt="Laboratoire" />
        </div>
      </div>

      {/* Footer clair avec icônes */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>BioCheck</h3>
            <p>Smart Lab Platform — reliable and fast results for everyone.</p>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: contact@biocheck.com</p>
            <p>Phone: +216 12 345 678</p>
            <p>Address: 123 Rue des Laboratoires, Tunis, Tunisie</p>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} BioCheck — All rights reserved.
        </div>
      </footer>
    </div>
  );
}
