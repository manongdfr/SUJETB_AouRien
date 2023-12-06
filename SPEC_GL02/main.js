
// Menu principal
const menuPrincipal = [
    {
        type: 'list',
        name: 'choix',
        message: 'Que voulez-vous faire ?',
        choices: [
            'Rechercher',
            'Selectioner des questions',
            'Generateur Exam',
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
        select_question,
        recherche,
        prompt,
        generateur_exam
    } = require('./utilis');

    while (continuer) {
        const reponse = await inquirer.prompt(menuPrincipal);
        switch (reponse.choix) {
            case 'Rechercher':
                var tag = prompt("Saisir le tag de la recherche : ","")
                var text_question = prompt("Saisir la chaine de caractère de la question : ","")
                console.table(recherche(text_question,tag));
                break;
            case 'Selectioner des questions':
                select_question();
                break;
            case 'Generateur Exam':
                generateur_exam();
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
