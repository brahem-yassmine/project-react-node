const express = require("express");
const router = express.Router();
const Analyse = require("../models/analyse.model");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // 🔐 Chargement des variables .env
const path = require("path");
const fs = require("fs");

const authenticate = require("../middleware/token"); //

const SECRET_KEY = process.env.SECRET_KEY; // 💡 Clé secrète JWT depuis .env

// Middleware CORS

router.get("/all", async (req, res) => {
  console.log("Requête reçue sur /api/reqAnalyses/all"); // Debug

  try {
    console.log("Tentative de connexion à la base de données...");
    const analyses = await Analyse.find().populate("userId");
    console.log(`Nombre d'analyses trouvées : ${analyses.length}`);

    res.status(200).json({
      success: true,
      count: analyses.length,
      data: analyses,
    });
  } catch (err) {
    console.error("ERREUR COMPLÈTE:", err);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
});
router.get("/mes-analyses", authenticate, async (req, res) => {
  try {
    // Vérifie que le token a bien été décodé et contient un userId
    const userId = req.user?.userId;

    if (!userId) {
      return res
        .status(403)
        .json({ message: "Accès refusé : utilisateur non authentifié" });
    }

    // Recherche les analyses liées à l'utilisateur, triées par date décroissante
    const analyses = await Analyse.find({ userId }).sort({ date: -1 });

    res.status(200).json(analyses);
  } catch (err) {
    console.error("Erreur lors de la récupération des analyses :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

const generatePDF = require("../utils/pdfGenerator");

// Mise à jour du statut + enregistrement des réponses du formulaire
// Route PUT pour mettre à jour le statut
router.put("/:id/statut", authenticate, async (req, res) => {
  try {
    const { responses } = req.body;
    const { id } = req.params;

    // 1. Vérification des données
    if (!responses || typeof responses !== "object") {
      return res.status(400).json({
        success: false,
        message: "Les réponses doivent être un objet",
      });
    }

    // 2. Trouver l'analyse d'abord
    const analyse = await Analyse.findById(id);
    if (!analyse) {
      return res.status(404).json({
        success: false,
        message: "Analyse non trouvée",
      });
    }

    // 3. Générer le PDF d'abord
    let pdfFileName;
    try {
      pdfFileName = await generatePDF({
        ...analyse.toObject(),
        reponsesFormulaire: responses,
      });
      console.log("PDF généré avec succès:", pdfFileName);
    } catch (pdfError) {
      console.error("Erreur génération PDF:", pdfError);
      // On continue quand même sans échouer
      pdfFileName = null;
    }

    // 4. Mettre à jour l'analyse
    const updated = await Analyse.findByIdAndUpdate(
      id,
      {
        statut: "terminée",
        reponsesFormulaire: responses,
        pdfPath: pdfFileName || undefined,
      },
      { new: true }
    );

    res.json({
      success: true,
      data: updated,
      pdfGenerated: !!pdfFileName,
    });
  } catch (err) {
    console.error("Erreur complète:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Erreur serveur",
      error: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
});

module.exports = router;
