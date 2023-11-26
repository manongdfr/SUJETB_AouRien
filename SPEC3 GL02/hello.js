const fs = require('fs');

// Lecture du fichier JSON
const jsonFilePath = './data.json';
const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
const tableauDeDonnees = JSON.parse(jsonData);

// Définition de la fonction exam
function exam(tableauDeDonnees) {
    let tableauQuestionJoint = [];

    for (let j = 0; j < tableauDeDonnees.length; j++) {
        tableauDeDonnees[j][0] = "::" + tableauDeDonnees[j][0] + "::";
        tableauDeDonnees[j][2] = "{" + tableauDeDonnees[j][2] + "}";
        tableauQuestionJoint[j] = tableauDeDonnees[j].join("\n");
    }

    // Afficher les éléments du tableau tableauQuestionJoint
    for (let u = 0; u < tableauQuestionJoint.length; u++) {
        console.log(tableauQuestionJoint[u]);
    }
}

// Appeler la fonction exam avec le tableau tableauDeDonnees
exam(tableauDeDonnees);
