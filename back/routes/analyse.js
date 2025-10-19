const express = require("express");
const router = express.Router();
const User = require("../models/user.models");
const Analyse = require("../models/analyse.model");
const bcrypt = require("bcryptjs"); // Ajoutez bcrypt pour hacher les mots de passe

router.post("/formulaire", async (req, res) => {
  console.log("BODY REÇU DU FORMULAIRE :", req.body);
  try {
    const { firstName, lastName, email, doctorName, type } = req.body;

    // Vérifie tous les champs
    if (!firstName || !lastName || !email || !type || !doctorName) {
      return res
        .status(400)
        .json({ message: "Tous les champs sont obligatoires" });
    }

    // Trouver ou créer l'utilisateur
    let user = await User.findOne({ email });

    if (!user) {
      // Créer un nouveau compte patient par défaut
      const hashedPassword = await bcrypt.hash("isra", 10);
      user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: "patient", // Rôle par défaut
      });

      await user.save();
    }

    // Créer l'analyse avec la référence au user
    const newAnalyse = new Analyse({
      firstName,
      lastName,
      email,
      type,
      doctorName,
      userId: user._id,
      date: new Date(),
    });

    await newAnalyse.save();

    res.status(201).json({
      message: "Analyse enregistrée avec succès",
      userCreated: !user.createdAt, // Indique si un nouvel utilisateur a été créé
    });
  } catch (err) {
    console.error("Erreur serveur :", err);

    if (err.code === 11000) {
      // Erreur de duplication d'email
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    res.status(500).json({
      message: "Erreur serveur lors de la création",
      error: err.message,
    });
  }
});

module.exports = router;
