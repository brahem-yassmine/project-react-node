const mongoose = require("mongoose");
const AnalyseType = require("./models/analyseType");

mongoose.connect("mongodb://localhost:27017/labo");

const seed = async () => {
  await AnalyseType.deleteMany(); // Supprime les anciens si tu veux reset

  await AnalyseType.insertMany([
    {
      type: "blood_test",
      nom: "Blood Test",
      questions: [
        {
          cle: "rbc",
          label: "Red Blood Cell Count",
          type: "number",
          unite: "M/µL",
        },
        {
          cle: "wbc",
          label: "White Blood Cell Count",
          type: "number",
          unite: "K/µL",
        },
        {
          cle: "platelets",
          label: "Platelet Count",
          type: "number",
          unite: "K/µL",
        },
        {
          cle: "hemoglobin",
          label: "Hemoglobin Level",
          type: "number",
          unite: "g/dL",
        },
        { cle: "hematocrit", label: "Hematocrit", type: "number", unite: "%" },
      ],
    },
    {
      type: "urinalysis",
      nom: "Urinalysis",
      questions: [
        { cle: "color", label: "Urine Color", type: "text" },
        { cle: "ph", label: "pH Level", type: "number" },
        { cle: "glucose", label: "Glucose", type: "text" },
        { cle: "protein", label: "Protein", type: "text" },
        { cle: "ketones", label: "Ketones", type: "text" },
      ],
    },
    {
      type: "mri_scan",
      nom: "MRI Scan",
      questions: [
        { cle: "region", label: "Scanned Region", type: "text" },
        { cle: "contrast", label: "Contrast Used", type: "text" },
        { cle: "findings", label: "Findings", type: "text" },
        { cle: "impression", label: "Impression", type: "text" },
      ],
    },
    {
      type: "x_ray",
      nom: "X-Ray",
      questions: [
        { cle: "body_part", label: "Body Part", type: "text" },
        { cle: "position", label: "Position", type: "text" },
        { cle: "findings", label: "Findings", type: "text" },
        {
          cle: "exposure_time",
          label: "Exposure Time",
          type: "number",
          unite: "ms",
        },
      ],
    },
    {
      type: "biopsy",
      nom: "Biopsy",
      questions: [
        { cle: "sample_site", label: "Sample Site", type: "text" },
        { cle: "method", label: "Method Used", type: "text" },
        { cle: "cell_type", label: "Cell Type", type: "text" },
        { cle: "malignant", label: "Malignant Cells Found?", type: "text" },
      ],
    },
    {
      type: "genetic_testing",
      nom: "Genetic Testing",
      questions: [
        { cle: "gene_tested", label: "Gene Tested", type: "text" },
        { cle: "mutation_found", label: "Mutation Found", type: "text" },
        { cle: "risk_level", label: "Risk Level", type: "text" },
        { cle: "recommendation", label: "Doctor Recommendation", type: "text" },
      ],
    },
  ]);

  console.log("AnalyseTypes inserted !");
  mongoose.disconnect();
};

seed();
