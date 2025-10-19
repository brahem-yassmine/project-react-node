const express = require("express");
const router = express.Router();
const User = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Charger les variables d’environnement

const SECRET_KEY = process.env.SECRET_KEY; // ✅ Extraire la clé
const authenticate = require("../middleware/token");

const Analyse = require("../models/analyse.model");

router.get("/analyses", authenticate, async (req, res) => {
  const analyses = await Analyse.find({ userId: req.userId });
  res.json(analyses);
});

// sign
router.post("/signup", async (req, res) => {
  try {
    const { email, password, role, firstName, lastName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      role,
      firstName,
      lastName,
    });

    await newUser.save();

    res.status(201).json({
      message: "Account created successfully",
      userId: newUser._id,
      role: newUser.role,
      email: newUser.email,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during account creation" });
  }
});

// login
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier que l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // Générer le token JWT
    const token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY, {
      expiresIn: "2h",
    });

    // Répondre avec token + infos
    res.status(200).json({
      message: "Login successful",
      token,
      userId: user._id,
      role: user.role,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
