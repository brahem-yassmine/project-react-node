const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  cle: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, enum: ["text", "number", "boolean"], required: true },
  unite: { type: String, default: null },
});

const analyseTypeSchema = new mongoose.Schema({
  type: { type: String, required: true, unique: true }, // ex: "blood_test"
  nom: { type: String, required: true }, // ex: "Blood Test"
  questions: [questionSchema],
});

module.exports = mongoose.model("AnalyseType", analyseTypeSchema);
