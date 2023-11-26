const fs = require('fs');

function jsonVersTableau(cheminDuFichier) {
    try {
        // Lire le fichier JSON
        const jsonData = fs.readFileSync(cheminDuFichier, 'utf-8');

        // Convertir la chaîne JSON en tableau
        const tableauDeDonnees = JSON.parse(jsonData);

        return tableauDeDonnees;
    } catch (erreur) {
        console.error(`Erreur lors de la conversion du fichier JSON en tableau : ${erreur.message}`);
        return null;
    }
}
module.exports = jsonVersTableau;
