import { useNavigate } from "react-router-dom";
import "./about.css";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="all">
      <nav>
        <ul className="navi">
          <li className="logo">BioCheck</li>
        </ul>
      </nav>

      <section className='mainAbout'>
        <div className="boxAbout">
          <h2 className="miniTitle">Our Mission</h2>
          <p className="paraAbout">
            At BioCheck, our mission is to revolutionize laboratory services through smart automation and digital access. We aim to offer patients a fast, accurate, and transparent experience. Whether you're coming in for a routine check-up or a specialized test, our system ensures efficiency from start to finish.
          </p>
        </div>

        <div className="boxAbout">
          <h2 className="miniTitle">How It Works</h2>
          <p className="paraAbout">
            Every patient has a secure personal space on our platform to check the status and results of their analysis at any time. Once a request is submitted at the front desk by our administrative team, the laboratory analyst receives a detailed request form and begins the analysis using advanced automated tools.
          </p>
        </div>

        <div className="boxAbout">
          <h2 className="miniTitle">From Sample to Result</h2>
          <p className="paraAbout">
            After the analysis is complete, the analyst confirms the result in the system by clicking "OK". Instantly, the patient is notified and can view the results in their personal space. This seamless workflow ensures clarity, reduces human error, and saves valuable time for both staff and patients.
          </p>
        </div>

        <div className="boxAbout">
          <h2 className="miniTitle">Our Technology</h2>
          <p className="paraAbout">
            We utilize cutting-edge laboratory automation systems and AI-powered analysis tools to deliver results with unprecedented speed and accuracy. Our digital platform integrates seamlessly with healthcare providers' systems for complete interoperability.
          </p>
          <button onClick={() => navigate("/")}>
            ← Return to Home
          </button>
        </div>
      </section>
    </div>
  );
}