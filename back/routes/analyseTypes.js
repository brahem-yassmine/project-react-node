const express = require("express");
const router = express.Router();
const AnalyseType = require("../models/analyseType"); // Import du modèle

// Route : /api/analyseTypes/:type
router.get("/:type", async (req, res) => {
  try {
    // On normalise le type reçu
    const rawType = req.params.type;
    const normalizedType = rawType.toLowerCase().replace(/\s+/g, "_");

    console.log("Type reçu :", rawType);
    console.log("Type normalisé :", normalizedType);

    const analyse = await AnalyseType.findOne({ type: normalizedType });

    if (!analyse) {
      return res.status(404).json({ message: "Type d'analyse non trouvé" });
    }

    res.json(analyse.questions);
  } catch (error) {
    console.error("Erreur lors de la récupération des questions :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
