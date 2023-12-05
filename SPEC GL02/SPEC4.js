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
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function demanderUneReponse(question) {
    return new Promise((resolve) => {
        rl.question(question, (reponseUtilisateur) => {
            resolve(reponseUtilisateur);
        });
    });
}

async function simuleexam(tableauDeDonnees) {
    let bonneReponse
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
            bonneReponse = bonneReponse + 1
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
                    bonneReponse = bonneReponse + 1
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
                bonneReponse = bonneReponse + 1
            } else {
                console.log('Mauvaise réponse')
            }
            */
        //question type relié les mots entre eux

        for (let i = 0; i < tableauDeDonnees.length; i++) {
            let correctAnswers = tableauDeDonnees[i].reponses.map(reponse => {
                if (reponse) {
                    let [term, definition] = reponse.substring(1).split('->').map(str => str.trim().toLowerCase());
                    return {term, definition, selected: false};
                }
            }).filter(Boolean);

            // Mélanger l'ordre des réponses
            correctAnswers = shuffle(correctAnswers);

            for (let j = 0; j < correctAnswers.length; j++) {
                console.log(`Quelle est la définition de "${correctAnswers[j].term}" ?`);

                let availableAnswers = correctAnswers.map(answer => ({...answer}));

                availableAnswers.push({definition: 'Aucune des réponses'});

                // Mélanger l'ordre des réponses disponibles
                availableAnswers = shuffle(availableAnswers);

                for (let k = 0; k < availableAnswers.length; k++) {
                    console.log(`${k + 1}. ${availableAnswers[k].definition}`);
                }

                let reponse = (await demanderUneReponse("\nVeuillez entrer le numéro de la bonne dé'finition :"))'.trim().toLowerCase();

                if (reponse >= 1 && reponse <= availableAnswers.length) {
                    if (availableAnswers[reponse - 1].definition == correctAnswers[j].definition) {
                        console.log('Bonne réponse');
                        correctAnswers[j].selected = true; // Marque la réponse comme sélectionnée
                        bonneReponse = bonneReponse + 1
                    } else {
                        console.log('Mauvaise réponse');
                    }

                    // Mise à jour du tableau correctAnswers en fonction des réponses sélectionnées
                    correctAnswers = correctAnswers.filter(answer => !answer.selected);
                } else {
                    console.log('Numéro de réponse non valide. Veuillez entrer un nombre entre 1 et ' + availableAnswers.length);
                }
            }

            // Fermeture de la saisie après la dernière question
            if (i == tableauDeDonnees.length - 1) {
                rl.close();
                rl.removeAllListeners();
            }
        }
    }
    console.log("vous avez obtenu la note de :" +bonneReponse+"/"+tableauDeDonnees.length)
}
// Appel de la fonction simuleexam avec le tableau de données
simuleexam(tableauDeDonnees);

