const {
    prompt,
recherche,
} = require('./utilis');

function select_questions() {
    let choix2 = "0";
    var tab_result = [];
    var tab_select = [];
    while (choix2 !== "n" || choix2 !== null) {
        choix2 = prompt("Effectuer une nouvelle recherche (y/n) : ");
            if (choix2.toLowerCase() === "y") {
                var tag = prompt("Saisir le tag de la recherche : ")
                var  text_question = prompt("Saisir la chaine de caractère de la question : ")
                if (tag || text_question) {
                    tab_result = recherche(text_question, tag);
                }
                print("Voici les resultat de votre recherche");
                console.table(tab_result);
                let choix = "0";
                while (choix !== "stop" || choix !== null) {
                    choix = null;
                    choix = prompt("Selectionner l'index de votre question a selectionner ( stop pour arreter la selection) : ")
                        if (choix.toLowerCase() !== "stop") {
                            if (choix <= tab_result.length && choix >= 0) {
                                var entry = {
                                    tag: tab_values[choix]["tag"],
                                    questionText: tab_values[choix]["questionText"],
                                    reponses: tab_values[choix]["reponses"]
                                };
                                tab_select.push(entry);
                                console.log("Votre selection actuelle : ")
                                console.table(tab_select);
                            } else {
                                console.log("Veuillez choisir un index valide")
                            }
                        }
                }
            }
    }
}
select_questions()