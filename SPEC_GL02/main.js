
// Menu principal
const {prompt} = require("./utilis");
const menuPrincipal = [
    {
        type: 'list',
        name: 'choix',
        message: 'Que voulez-vous faire ?',
        choices: [
            'Rechercher',
            'Créer un examen',
            'Quitter'
        ],
    },
];

// Fonction principale
async function main() {
    let inquirer;

    try {
        inquirer = require('inquirer');
    } catch (error) {
        if (error.code === 'ERR_REQUIRE_ESM') {
            // Utiliser import() pour ESM
            const inquirerModule = await import('inquirer');
            inquirer = inquirerModule.default;
        } else {
            throw error;
        }
    }

    let continuer = true;

    const {
        create_exam,
        recherche,
        json_to_tab,
        prompt
    } = require('./utilis');

    while (continuer) {
        const reponse = await inquirer.prompt(menuPrincipal);
        switch (reponse.choix) {
            case 'Rechercher':
                var tag = prompt("Saisir le tag de la recherche : ","")
                var text_question = prompt("Saisir la chaine de caractère de la question : ","")
                console.table(recherche(text_question,tag));
                break;
            case 'Créer un examen':
                create_exam();
                console.log('Les données ont été écrites dans le fichier avec succès.');
                break;
            case 'Quitter':
                continuer = false;
                console.log('Au revoir !');
                break;
        }
    }
}

// Appel de la fonction principale
main();
