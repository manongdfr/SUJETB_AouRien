
// Menu principal
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
        select_question,
        recherche,
        json_to_tab,
    } = require('./utilis');

    while (continuer) {
        const reponse = await inquirer.prompt(menuPrincipal);
        switch (reponse.choix) {
            case 'Rechercher':
                recherche();
                break;
            case 'Créer un examen':
                select_question();
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
