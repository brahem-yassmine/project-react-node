import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./patient.css";

export default function Patient() {
  const [analyses, setAnalyses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
  const fetchAnalyses = async () => {
    try {
      const token = localStorage.getItem("token");
      const first = localStorage.getItem("firstName");
      const last = localStorage.getItem("lastName");

      setFirstName(first || "");
      setLastName(last || "");
      if (!token) {
        navigate("/signin");
        return;
      }

      const response = await fetch("http://localhost:5000/api/reqAnalyses/mes-analyses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("token");
          navigate("/signin");
          return;
        }
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      setAnalyses(data);
    } catch (err) {
      console.error("Erreur récupération analyses :", err);
      setError(err.message);
    }
  };

  fetchAnalyses();
}, [navigate]);

  return (
    <div className="all">
      <div className="mainPatient">
        <nav>
          <ul className="navi">
            <li className="logo">BioCheck</li>
            <li className="link" onClick={() => navigate("/aboutUs")}>About Us</li>
          </ul>
        </nav>

       <h1 className="title-per">Welcome : {firstName} {lastName}</h1>

        <h2 className="subtitle">Mes analyses</h2>
        {analyses.length === 0 ? (
          <p className="no-data">Aucune analyse trouvée</p>
        ) : (
          <table className="analysis-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Docteur</th>
                <th>Date</th>
                <th>Statut</th>
                <th>PDF</th>
              </tr>
            </thead>
            <tbody>
              {analyses.map((analyse) => (
                <tr key={analyse._id}>
                  <td>{analyse.type}</td>
                  <td>{analyse.doctorName}</td>
                  <td>{new Date(analyse.date).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${analyse.statut.replace(" ", "-")}`}>
                      {analyse.statut}
                    </span>
                  </td>
                  <td>
                    {analyse.statut === "terminée" && analyse.pdfPath ? (
                      <a
                        href={`http://localhost:5000/uploads/${analyse.pdfPath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="download-link"
                      >
                        <i className="fas fa-download"></i> Télécharger
                      </a>
                    ) : (
                      <span className="not-available">Non disponible</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}