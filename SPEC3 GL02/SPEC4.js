const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Lecture du fichier JSON
const jsonFilePath = path.join(__dirname, 'data.json');
const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
let tableauDeDonnees = JSON.parse(jsonData);

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

async function simuleexam(tableauDeDonnees) {
    for (let i = 0; i < tableauDeDonnees.length; i++) {
        // je crée des questions propre
        tableauDeDonnees[i].questionText = tableauDeDonnees[i].questionText.replace(/[{]/g, "")
        tableauDeDonnees[i].questionText = tableauDeDonnees[i].questionText.replace(/ *\([^)]*\) */g, "");
        tableauDeDonnees[i].questionText = tableauDeDonnees[i].questionText.replace(/ *\<[^>]*\> */g, "");
        tableauDeDonnees[i].questionText = tableauDeDonnees[i].questionText.replace(/ *\[[^]*\] */g, "");
        console.log(tableauDeDonnees[i].questionText);
        tableauDeDonnees[i].reponses.forEach((reponse, index) => {
            if (tableauDeDonnees[i]1.reponses.includes("~")) {
                console.log(`${index + 1}. ${reponse.replace("~", "")}`);
            }
        });
        let reponse = await demanderUneReponse("\nVeuillez entrer le numéro de votre réponse :");
        console.log(`Vous avez choisi la réponse numéro: ${reponse}`);
    }
    rl.close();
}

simuleexam(tableauDeDonnees);
