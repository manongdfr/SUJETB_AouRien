const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Lecture du fichier JSON
const jsonFilePath = './data.json';
const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
const tableauDeDonnees = JSON.parse(jsonData);

// Créer une interface de lecture
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function demanderUneReponse(question) {
    return new Promise((resolve) => {
        rl.question(question, (reponseUtilisateur) => {
            resolve(reponseUtilisateur);
        });
    });
}

// Définition de la fonction exam
function exam(tableauDeDonnees) {
    let tableauQuestionJoint = tableauDeDonnees.map(({ tag, questionText, reponses }) => {
        tag = "::" + tag + "::";
        reponses = "{" + reponses + "}";
        return [tag, questionText, reponses].join(' ');
    });
    return tableauQuestionJoint;
}

// Appeler la fonction exam avec le tableau tableauDeDonnees
let tableauQuestionJoint = exam(tableauDeDonnees);

let valeur = fs.readFileSync('valeur.txt', 'utf-8');

(async () => {
    // Poser une question à l'utilisateur
    let chemin = await demanderUneReponse("\nVeuillez entrer le chemin du fichier ou vous voulez stocker votre exam :");

    // Convertir le tableau en chaîne de texte
    let data = tableauQuestionJoint.join('\n');

    // Trouver le chemin du dossier
    let dossier = chemin;

    // Créer le chemin complet pour le fichier d'examen
    let examen = path.join(dossier, 'exam'+ valeur +'.gift');

    // Stocker l'examen dans un fichier
    fs.writeFile(examen, data, (err) => {
        if (err) throw err;
        console.log('Les données ont été écrites dans le fichier avec succès.');

        // Fermer l'interface de lecture
        rl.close();
    });
})();
valeur = parseInt(valeur)
valeur += 1
fs.writeFileSync('valeur.txt', valeur.toString());