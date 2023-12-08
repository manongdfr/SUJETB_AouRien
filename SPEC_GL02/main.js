const {
    fs,
    path,
    readline,
    extractionDesDonnees,
    json_to_tab,
    cheminVersFichierJSON,
    recherche,
    prompt,
    select_question,
    create_exam,
    pass_exam,
    generateur_exam,
    generateur_graph,
    exam_type,
    vcard
} = require('./utilis');
extractionDesDonnees();
// Crée une interface de lecture pour que l'utilisateur puisse remplir des informations depuis le terminal
const interfaceLecture = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Fonction permettant à l'utilisateur de sélectionner l'option qu'il souhaite parmi une liste
async function main() {
    // Affiche au début du programme la liste des options disponibles pour l'utilisateur
    console.log("Liste des options :\n1. Rechercher des questions\n2. Sélectionner des questions\n3. Créer un examen automatiquement \n4. Générer l'histogramme d'un examen\n5. Comparer un examen à un examen type\n6. Créer des VCARDs d'enseignants\n7. Rappeler les options possibles\n8. Arrêter le programme\n");
    demanderOption()
    function demanderOption() {
        // L'interfaceLecture permet à l'utilisateur de saisir la valeur qu'il souhaite depuis le terminal
        interfaceLecture.question("Veuillez entrer le nombre correspondant a l'option qui vous intéresse (7 = rappel des options) : ", (choix) => {
            ChoixOption = parseInt(choix);
            traiterOption(ChoixOption);
        });
    }


// Fonction permettant d'exécuter l'option sélectionnée par l'utilisateur.
function traiterOption(ChoixOption) {
    // En fonction de la saisie de l'utilisateur, le programme va exécuter des instructions différentes
    switch (ChoixOption) {
        case 1:
            // Importe les fonctions des autres programmes
            var tag = prompt("Saisir le tag de la recherche : ","");
            var text_question = prompt("Saisir la chaine de caractère de la question : ","");
            console.table(recherche(text_question,tag));
            demanderOption();
            break;
        case 2:
            select_question();
            demanderOption();
            break;
        case 3:
            console.log("A la fin de l'exécution de cette section, appuyez sur la flèche du haut du clavier.");
            generateur_exam();
            demanderOption();
            break;
        case 4:
            console.log("A la fin de l'exécution de cette section, appuyez sur la flèche du haut du clavier en cas de problèmes");
            generateur_graph();
            demanderOption();
            break;
        case 5:
            console.log("A la fin de l'exécution de cette section, appuyez sur la flèche du haut du clavier");
            exam_type();
            demanderOption();
            break;
        case 6:
            console.log("A la fin de l'exécution de cette section, appuyez sur la flèche du haut du clavier");
            vcard();
            demanderOption();
            break;
        case 7:
            console.log("Liste des options :\n1. Rechercher des questions\n2. Sélectionner des questions\n3. Créer un examen automatiquement \n4. Générer l'histogramme d'un examen\n5. Comparer un examen à un examen type\n6. Créer des VCARDs d'enseignants\n7. Rappeler les options possibles\n8. Arrêter le programme\n");
            demanderOption();
            break;
        case 8:
            console.log("Fin du programme.");
            interfaceLecture.close();
            break;
        default:
            // La saisie de l'utilisateur est incorrecte, un message d'erreur s'affiche mais le programme continue
            console.log("Option non reconnue");
            demanderOption();
            break;
    }
}
}
// Initialise la demande d'options
main();