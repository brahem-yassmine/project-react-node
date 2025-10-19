const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generatePDF = (analyse) => {
  return new Promise((resolve, reject) => {
    try {
      // 1. Vérification des données obligatoires
      if (!analyse?._id || !analyse?.type) {
        throw new Error("Données d'analyse manquantes");
      }

      // 2. Création du dossier uploads
      const uploadsDir = path.join(__dirname, "../uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      // 3. Configuration du PDF
      const fileName = `analyse_${analyse._id}_${Date.now()}.pdf`;
      const outputPath = path.join(uploadsDir, fileName);
      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(outputPath);

      doc.pipe(stream);

      // 4. En-tête
      doc
        .fontSize(26)
        .font("Helvetica-Bold")
        .fillColor("#2E86C1")
        .text("Laboratoire BioCheck", { align: "center" })
        .moveDown(0.5);

      // 5. Titre du document
      doc
        .fontSize(18)
        .fillColor("black")
        .text(`Rapport d'analyse: ${analyse.type}`, {
          align: "center",
          underline: true,
        })
        .moveDown(1.5);

      // 6. Section Patient (VERIFIE CES CHAMPS)
      doc
        .font("Helvetica-Bold")
        .text("INFORMATIONS PATIENT", { underline: true })
        .moveDown(0.5)
        .font("Helvetica")
        .text(`Nom: ${analyse.lastName || "Non spécifié"}`)
        .text(`Prénom: ${analyse.firstName || "Non spécifié"}`)
        .text(`Email: ${analyse.email || "Non spécifié"}`)
        .text(`Médecin: ${analyse.doctorName || "Non spécifié"}`)
        .text(
          `Date: ${
            new Date(analyse.date).toLocaleDateString() || "Non spécifié"
          }`
        )
        .moveDown(1.5);

      // 7. Section Résultats (PARTIE CRITIQUE)
      doc
        .font("Helvetica-Bold")
        .text("RÉSULTATS D'ANALYSE", { underline: true })
        .moveDown(0.5)
        .font("Helvetica");

      // Vérifie le format de reponsesFormulaire
      if (
        analyse.reponsesFormulaire &&
        typeof analyse.reponsesFormulaire === "object"
      ) {
        Object.entries(analyse.reponsesFormulaire).forEach(
          ([question, reponse]) => {
            doc.text(`• ${question}: ${reponse}`).moveDown(0.3);
          }
        );
      } else {
        doc.text("Aucun résultat disponible").moveDown(0.3);
      }

      doc.moveDown(1.5);

      // 8. Pied de page
      doc
        .fontSize(10)
        .fillColor("gray")
        .text("Document généré automatiquement - Laboratoire BioCheck", {
          align: "center",
        });

      doc.end();

      stream.on("finish", () => resolve(fileName));
      stream.on("error", reject);
    } catch (err) {
      console.error("Erreur dans generatePDF:", err);
      reject(err);
    }
  });
};

module.exports = generatePDF;
