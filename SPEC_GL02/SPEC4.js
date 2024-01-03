

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
    //ticket correction : il aurait fallu un parseur et donc que l'élément objet du tableau de réponse soit des éléments parsés et non des chaines de caractères divisées
    //la correction est difficile voire impossible sans changer l'entièreté du code : prendre au cas par cas manuellement au lieu de rajouter une simple règle dans le parseur par type de question..

    //cela pose des problèmes pour la plupart des tickets de TEST_5 :
    /*
    1. vérifier les bonnes/mauvaises réponse : le split ne donne toujours qu'une chaine de caractère, ne permet pas de donner une moitié de point si la réponse est partiellement juste
    1 piste d'amélioration à mettre en place avec un parseur : typologie des questions en regex, parser l'objet réponse pour avoir un tableau de réponse [{question à 100% des points}, {questions à 50%}] par exemple
    2. Donner plus d'information par rapport à la question posée : sansa contexte, l'utilisateur peut difficilement répondre et cela est problématique dans la simulation de l'examen.
    Sauf qu'à force de split, des informations se perdent ou ne sont pas log dans la console : il aurait fallu un objet {question} parsé, dans lequel nous pouvions donner par exemple
    le type de la questions displayed dans la console, des pistes de réponse personnalisé "texte à trou, remplacez le ... par une réponse" qui n'est pas lisible dans la console (il faut deviner quoi mettre et où)
    2 piste d'amélioration : un parseur qui créer des objets construits sous le même modèles afin d'avoir des informations complémentaire à donner à l'utilisateur

    lors de la résolution de ce ticket, j'aurai du pouvoir améliorer le code, mais sans parseur il m'est très difficile d'apporter plus de lumière sur ce projet. Split fait perdre des informations, les données sont à faire 
    au cas par cas pour chaque grammaire ABNF de questions différente. J'espère que ce commentaire détaillé aura permis d'éclairé la situation.
    */

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
                console.log(tableauDeDonnees[i].reponses[0].substring(1).split('=', '#'));
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
