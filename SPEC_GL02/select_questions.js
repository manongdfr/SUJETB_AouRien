function select_questions() {
    const fs = require('fs');
    const {
        prompt,
        recherche,
        pass_exam,
        create_exam
    } = require('./utilis');
    let choix2 = "0";
    var tab_values = [];
    var tab_select = [];
    var can_create = false;
    var first_insert = true;
    while (choix2 !== "n") {
        if (tab_select.length >= 20) {
            console.log("Nombre maximum de questions ajouté");
            choix2 = "n";
        } else {
            choix2 = prompt("Effectuer une nouvelle recherche ? (y/n) : ", "n");
            if (choix2.toLowerCase() === "y") {
                var tag = prompt("Saisir le tag de la recherche : ","")
                var text_question = prompt("Saisir la chaine de caractère de la question : ","")
                if (tag || text_question) {
                    tab_values = recherche(text_question, tag);
                }
                console.log("Voici les résultats de votre recherche");
                console.table(tab_values);
                let choix = "0";
                while (choix !== "stop") {
                    if (tab_select.length>=20){
                        console.log("Nombre maximum de question ajouté");
                        choix = "stop";
                        choix2 = "n";
                    }
                    else {
                        choix = "stop";
                        choix = prompt("Sélectionnez l'index de votre question a sélectionner (tapez stop pour arrêter la sélection) : ", "stop")
                        if (choix.toLowerCase() !== "stop") {
                                if (choix <= tab_values.length && choix >= 0) {
                                    if (first_insert) {
                                        var entry = {
                                            tag: tab_values[choix]["tag"],
                                            questionText: tab_values[choix]["questionText"],
                                            reponses: tab_values[choix]["reponses"],
                                            typeDeQuestion : tab_values[choix]["typeDeQuestion"],
                                            associations : tab_values[choix]["associations"]
                                        };
                                        first_insert = false
                                        tab_select.push(entry);
                                        console.log("Votre sélection actuelle : ")
                                        console.table(tab_select);
                                        console.log(`Il vous reste encore ${20 - tab_select.length} places `)
                                        if (tab_select.length < 15) {
                                            console.log(`Vous devez rajouter encore ${15 - tab_select.length} questions au minimum pour former un exam `)
                                        } else {
                                            console.log("Vous avez ajouté suffisamment de questions pour créer un exam")
                                            can_create = true;
                                        }
                                    }
                                    else {
                                        if (!(tab_select.includes(tab_values[choix]))) {
                                            var entry = {
                                                tag: tab_values[choix]["tag"],
                                                questionText: tab_values[choix]["questionText"],
                                                reponses: tab_values[choix]["reponses"],
                                                typeDeQuestion : tab_values[choix]["typeDeQuestion"],
                                                associations : tab_values[choix]["associations"]
                                            };
                                            first_insert = false
                                            tab_select.push(entry);
                                            console.log("Votre sélection actuelle : ")
                                            console.table(tab_select);
                                            console.log(`Il vous reste encore ${20 - tab_select.length} places `)
                                            if (tab_select.length < 15) {
                                                console.log(`Vous devez rajouter encore ${15 - tab_select.length} questions au minimum pour former un exam `)
                                            } else {
                                                console.log("Vous avez ajouté suffisamment de questions pour créer un exam")
                                                can_create = true;
                                            }
                                        }
                                        else {
                                            console.log("La valeur est déjà dans le tableau")
                                        }
                                    }
                                }
                                    else {
                                    console.log("Veuillez choisir un index valide")
                                }
                        }
                    }
                }
            }
        }
    }
    if (can_create){
        console.log("1-Créer un exam\n2-Passer un exam\n")
var choix = prompt("Votre choix : ","0")
            if (choix === "1") {
                create_exam(tab_select);
            } else if (choix === "2") {
                pass_exam(tab_select);
            }
    }
    else {
        var choix3 = prompt("Vous n'avez pas rempli les conditions nécessaires pour créer l'examen, voulez-vous recommencer ? (y/n) : ","n")
        if (choix3.toLowerCase() === "y"){
            select_questions()
        }
    }
}
module.exports = select_questions;

