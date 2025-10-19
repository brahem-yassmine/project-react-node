const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const analyseTypeRoutes = require("./routes/analyseTypes");

const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/labo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connecté à MongoDB"))
  .catch((err) => console.error("Erreur MongoDB", err));

app.use("/api/auth", authRoutes);
app.use("/api/analyse", require("./routes/analyse"));
app.use("/api/reqAnalyses", require("./routes/reqAnalyses"));
app.use("/api/analyseTypes", analyseTypeRoutes);
app.use("/uploads", express.static("uploads"));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
