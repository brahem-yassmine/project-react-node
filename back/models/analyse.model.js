const mongoose = require("mongoose");

const analyseSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    type: { type: String, required: true },
    doctorName: { type: String },
    date: { type: Date, default: Date.now },
    statut: { type: String, default: "en cours" },
    pdfPath: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reponsesFormulaire: { type: Object },
  },
  { timestamps: true }
);

// Créez le modèle correctement
const Analyse = mongoose.model("Analyse", analyseSchema);

module.exports = Analyse; // Exportez le modèle
