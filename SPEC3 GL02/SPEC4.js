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
        console.log(tableauDeDonnees[i].questionText)

        //Type question choix multiple
        /*
        for (let index = 0; index < tableauDeDonnees[i].reponses.length; index++) {
            let reponse = tableauDeDonnees[i].reponses[index];
            if (reponse.includes("~") || reponse.includes("=")) {
                console.log(`${index + 1}. ${reponse.replace("~", "").replace("=", "")}`);
                if (reponse.includes("=")) {
                    correctAnswer = `${index + 1}`;
                    break;
                }
            }
        }
        let reponse = await demanderUneReponse("\nVeuillez entrer le numéro de votre réponse :");
        console.log(`Vous avez choisi la réponse numéro: ${reponse}`);
        if (reponse == correctAnswer) {
            console.log('Bonne réponse');
        } else {
            console.log('Mauvaise réponse');
        }*/

        // question Type Vrai ou faux
        /*
            if (tableauDeDonnees.type == 'T/F') {
                correctAnswer = tableauDeDonnees[i].reponses.substring(1).split('=')
                let reponse = await demanderUneReponse("\nVeuillez entrer le numéro de votre réponse : \n1 pour TRUE \n2 pour FALSE:");
                console.log(`Vous avez choisi la réponse numéro: ${reponse}`);
                if (reponse == '1') {
                    reponse = 'T';
                } else if (reponse == '2') {
                    reponse = 'F';
                }
                if (reponse == correctAnswer) {
                    console.log('Bonne réponse');
                } else {
                    console.log('Mauvaise réponse');
                }
            }
        }
        */
        //Question type texte à trou
        /*
            correctAnswers = tableauDeDonnees[i].reponses[0].substring(1).split('=').map(answer => answer.trim().toLowerCase()); // Supprime le signe égal, divise les réponses, supprime les espaces supplémentaires et convertit en minuscules
            let reponse = (await demanderUneReponse("\nVeuillez entrer votre réponse :")).trim().toLowerCase(); // Supprime les espaces supplémentaires et convertit en minuscules
            console.log(`Vous avez choisi la réponse numéro: ${reponse}`);
            if (correctAnswers.includes(reponse)) {
                console.log('Bonne réponse')
            } else {
                console.log('Mauvaise réponse')
            }
            */
        let correctAnswers = tableauDeDonnees[i].reponses.map(reponse => {
            if (reponse) { // Vérifie si la réponse n'est pas une chaîne vide
                let [term, definition] = reponse.substring(1).split('->').map(str => str.trim().toLowerCase());
                return {term, definition};
            }
        }).filter(Boolean); // Filtre les valeurs undefined du tableau

        for (let j = 0; j < 6; j++) {
            console.log(`Quelle est la définition de "${correctAnswers[j].term}" ?`);
            let availableAnswers = [...correctAnswers];
            availableAnswers.push({definition: 'Aucune des réponses'}); // Ajoute l'option "Aucune des réponses"

            for (let k = 0; k < availableAnswers.length; k++) {
                console.log(`${k + 1}. ${availableAnswers[k].definition}`);
            }

            let reponse = (await demanderUneReponse("\nVeuillez entrer le numéro de la bonne définition :")).trim().toLowerCase();
            if (reponse >= 1 && reponse <= availableAnswers.length) {
                if (availableAnswers[reponse - 1].definition == correctAnswers[j].definition) {
                    console.log('Bonne réponse');
                } else {
                    console.log('Mauvaise réponse');
                }

                // Supprime la réponse sélectionnée du tableau des réponses disponibles
                if (reponse != availableAnswers.length) { // Si l'utilisateur n'a pas choisi "Aucune des réponses"
                    correctAnswers = correctAnswers.filter(answer => answer.definition != availableAnswers[reponse - 1].definition);
                }
            } else {
                console.log('Numéro de réponse non valide. Veuillez entrer un nombre entre 1 et ' + availableAnswers.length);
            }

            if (j == correctAnswers.length - 1) { // Si c'est la dernière question d'appariement
                rl.close();
                rl.removeAllListeners();
            }
        }
    }
    }
simuleexam(tableauDeDonnees);
