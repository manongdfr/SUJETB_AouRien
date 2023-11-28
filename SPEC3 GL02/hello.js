const fs = require('fs');
const path = require('path');
// Lecture du fichier JSON
const jsonFilePath = './data.json';
const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
const tableauDeDonnees = JSON.parse(jsonData);

// Définition de la fonction exam
function exam(tableauDeDonnees) {

    let tableauQuestionJoint = tableauDeDonnees.map(({ tag, questionText, reponses }) => {
        tag = "::" + tag + "::";
        reponses = "{" + reponses + "}";
        return [tag, questionText, reponses].join(' ');
    });

    console.log(tableauQuestionJoint);
}

// Appeler la fonction exam avec le tableau tableauDeDonnees
exam(tableauDeDonnees);
//stocker l'exam dans un fichier
let data = tableauDeDonnees.join('\n')

let dossier = 'C:\\Users\\bapti\\Documents\\20232024\\GL02\\projet\\ProjetGIT\\SUJETB_AouRien\\SPEC3 GL02\\exam crée'
let examen = path.join(dossier,'exam.gif')
fs.writeFile(examen, data, (err) => {
    if (err) throw err;
    console.log('Les données ont été écrites dans le fichier avec succès.');
});