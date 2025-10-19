require("dotenv").config(); // Charger les variables d'environnement
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY; // Clé extraite une seule fois

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    console.log(" Aucun token reçu");
    return res.status(401).json({ message: "Token manquant" });
  }

  try {
    // 🔍 Debug (peut être supprimé en production)
    console.log(" Clé secrète utilisée :", SECRET_KEY);
    console.log(" Token reçu :", token);

    const decoded = jwt.verify(token, SECRET_KEY); // Utilisation cohérente
    console.log("Token décodé :", decoded);

    req.user = decoded;
    next();
  } catch (err) {
    console.error(" Erreur lors de la vérification du token :", err.message);
    return res.status(403).json({ message: "Token invalide" });
  }
};

module.exports = authenticate;
