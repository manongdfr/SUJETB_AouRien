

function pass_exam(tableau) {
    var bonneReponse =0
    var mauvaise_reponses =0
    const {prompt} = require("./utilis");

    const fs = require('fs');
    const path = require('path');
    const readline = require('readline');

// Lecture du fichier JSON
    const tableauDeDonnees = tableau

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

  function simuleexam(tableauDeDonnees) {

        for (let i = 0; i < tableauDeDonnees.length; i++) {
            // je crée des questions propre
            tableauDeDonnees[i].questionText = tableauDeDonnees[i].questionText.replace(/[{]/g, "")
            tableauDeDonnees[i].questionText = tableauDeDonnees[i].questionText.replace(/ *\([^)]*\) */g, "");
            tableauDeDonnees[i].questionText = tableauDeDonnees[i].questionText.replace(/ *\<[^>]*\> */g, "");
            tableauDeDonnees[i].questionText = tableauDeDonnees[i].questionText.replace(/ *\[[^]*\] */g, "");
            console.log(tableauDeDonnees[i].questionText)

            //Type question choix multiple
            if (tableauDeDonnees[i].typeDeQuestion == "Question classique") {
                for (let index = 0; index < tableauDeDonnees[i].reponses.length; index++) {
                    let reponse = tableauDeDonnees[i].reponses[index];
                    if (reponse === "") {
                        console.log(`${index + 1}. Aucune réponse`);
                    } else if (reponse.includes("~") || reponse.includes("=")) {
                        console.log(`${index + 1}. ${reponse.replace("~", "").replace("=", "")}`);
                        if (reponse.includes("=")) {
                            correctAnswer = `${index + 1}`;
                        }
                    }
                }
                reponse = prompt("\nVeuillez entrer le numéro de votre réponse :");
                if (reponse == correctAnswer) {
                    console.log('Bonne réponse');
                    bonneReponse = bonneReponse + 1;
                } else {
                    console.log('Mauvaise réponse');
                    mauvaise_reponses = mauvaise_reponses +1;
                }
            }


            //Question type texte à trou
            else if (tableauDeDonnees[i].typeDeQuestion == "Question à trou") {
                correctAnswers = tableauDeDonnees[i].reponses[0].substring(1).split('=').map(answer => answer.trim().toLowerCase()); // Supprime le signe égal, divise les réponses, supprime les espaces supplémentaires et convertit en minuscules
                let reponse = prompt("\nVeuillez entrer votre réponse :").trim().toLowerCase(); // Supprime les espaces supplémentaires et convertit en minuscules
                console.log(`Vous avez choisi la réponse : ${reponse}`);
                if (correctAnswers.includes(reponse)) {
                    console.log('Bonne réponse')
                    bonneReponse = bonneReponse + 1
                } else {
                    console.log('Mauvaise réponse')
                    mauvaise_reponses = mauvaise_reponses +1
                }
            }
            //question type relié les mots entre eux

            else if (tableauDeDonnees[i].typeDeQuestion == "Question à association") {
                // Filtrer les associations pour supprimer les lignes vides
                let associations = tableauDeDonnees[i].associations.filter(association => association.left !== "" && association.right !== "");

                // Variable pour suivre si l'utilisateur a fait une erreur
                let aFaitUneErreur = false;

                // Poser chaque question d'association à l'utilisateur
                for (let j = 0; j < associations.length; j++) {
                    console.log(`Quelle est la bonne association pour "${associations[j].left}" ?`);

                    // Mélanger les associations de droite
                    let associationsDroites = shuffle(associations.map(association => association.right));

                    // Afficher toutes les options de droite à l'utilisateur
                    for (let k = 0; k < associationsDroites.length; k++) {
                        console.log((k + 1) + '. ' + associationsDroites[k]);
                    }

                    let reponseUtilisateur = prompt('Veuillez entrer le numéro de votre réponse : ').trim().toLowerCase();
                    console.log('Vous avez choisi : ' + associationsDroites[reponseUtilisateur - 1]);

                    // Vérifier si la réponse de l'utilisateur est correcte
                    if (associationsDroites[reponseUtilisateur - 1] === associations[j].right) {
                        console.log('Bonne réponse !');
                    } else {
                        console.log('Mauvaise réponse. La bonne réponse était : ' + associations[j].right);
                        aFaitUneErreur = true;

                    }
                }

                // Afficher le résultat final pour la question à association
                if (!aFaitUneErreur) {
                    console.log('Vous avez répondu correctement à toutes les associations pour cette question.');
                    bonneReponse++;
                } else {
                    console.log('Vous avez fait au moins une erreur pour cette question.');
                    mauvaise_reponses = mauvaise_reponses +1
                }
            }
        }

        console.log(`Note finale : ${bonneReponse} / ${ bonneReponse + mauvaise_reponses}`)
    }

// Appel de la fonction simuleexam avec le tableau de données
    simuleexam(tableauDeDonnees);
}

module.exports = pass_exam;
