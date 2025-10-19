import React, { useEffect, useState } from 'react';
import './analyst.css';

const AnalystTable = () => {
  const [analyses, setAnalyses] = useState([]);
  const [selectedAnalyse, setSelectedAnalyse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/reqAnalyses/all");
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Gestion des différents formats de réponse
        if (Array.isArray(result)) {
          setAnalyses(result);
        } else if (result.data && Array.isArray(result.data)) {
          setAnalyses(result.data);
        } else {
          throw new Error("Format de données invalide");
        }
      } catch (err) {
        console.error("Erreur:", err);
        setError(err.message);
        setAnalyses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyses();
  }, []);

  const handleOpenForm = async (analyse) => {
    setSelectedAnalyse(analyse);
    const typeNormalise = analyse.type
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/%20/g, '_');

    try {
      const res = await fetch(`http://localhost:5000/api/analyseTypes/${typeNormalise}`);
      if (!res.ok) throw new Error('Erreur lors de la récupération des questions');
      const data = await res.json();
      setQuestions(data);
      setResponses({});
    } catch (err) {
      console.error("Erreur serveur :", err);
      setError(err.message);
    }
  };

  const handleSubmitForm = async (e) => {
  e.preventDefault();
  
  // Récupère le token depuis le localStorage
  const token = localStorage.getItem('token');
  
  try {
    const res = await fetch(
      `http://localhost:5000/api/reqAnalyses/${selectedAnalyse._id}/statut`,
      {
        method: "PUT",
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Ajoute le token ici
        },
        body: JSON.stringify({ responses })
      }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Échec de l\'enregistrement');
    }
    
    const updated = await res.json();
    setAnalyses(prev => prev.map(a => a._id === updated.data._id ? updated.data : a));
    setSelectedAnalyse(null);
    
  } catch (err) {
    console.error("Erreur lors de l'envoi:", err);
    setError(err.message);
  }
};

  if (loading) return <div className="loading">Chargement en cours...</div>;
  if (error) return <div className="error">Erreur: {error}</div>;

  return (
    <div className="analyst-page">
      <nav>
        <ul className="navi">
          <li className="logo">BioCheck</li>
        </ul>
      </nav>

      <h2 className='titleAnalyse'>Liste des demandes d'analyses</h2>

      <div className="table-wrapper">
        <table className="analysis-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Type</th>
              <th>Docteur</th>
              <th>Date</th>
              <th>Statut</th>
              <th>Imprimer</th>
            </tr>
          </thead>
          <tbody>
            {analyses.length > 0 ? (
              analyses.map((analyse) => (
                <tr key={analyse._id || Math.random()}>
                  <td>{analyse.firstName || 'N/A'}</td>
                  <td>{analyse.lastName || 'N/A'}</td>
                  <td>{analyse.email || 'N/A'}</td>
                  <td className='type'>{analyse.type || 'N/A'}</td>
                  <td>{analyse.doctorName || 'N/A'}</td>
                  <td>{analyse.date ? new Date(analyse.date).toLocaleDateString() : 'N/A'}</td>
                  <td>
                    <button
                      className={`statut-btn ${analyse.statut === "terminée" ? "done" : ""}`}
                      onClick={() => handleOpenForm(analyse)}
                    >
                      {analyse.statut || 'N/A'}
                    </button>
                  </td>
                  <td>
                    {analyse.statut === "terminée" && analyse.pdfPath ? (
                      <a
                        href={`http://localhost:5000/uploads/${analyse.pdfPath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pdf-link"
                      >
                        Télécharger
                      </a>
                    ) : (
                      <span className="not-available">
                        {analyse.statut === "terminée" ? "Génération en cours..." : "Non disponible"}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">Aucune analyse disponible</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedAnalyse && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Questions pour l'analyse : {selectedAnalyse.type}</h3>
            <form className="questions-form" onSubmit={handleSubmitForm}>
              {questions.map((q, index) => (
                <div key={q.cle || index} className="form-group">
                  <label>{q.label || 'Question sans titre'}</label>
                  <input
                    type={q.type === "number" ? "number" : "text"}
                    name={q.cle}
                    value={responses[q.cle] || ""}
                    onChange={(e) =>
                      setResponses((prev) => ({ ...prev, [q.cle]: e.target.value }))
                    }
                  />
                  {q.unite && <span className="unit">{q.unite}</span>}
                </div>
              ))}
              <div className="modal-buttons">
                <button type="submit">Enregistrer</button>
                <button type="button" onClick={() => setSelectedAnalyse(null)}>
                  Fermer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalystTable;