const fs = require('fs');
const path = require('path');

// Spécifiez le chemin du répertoire
const cheminDuRepertoire = './SujetB_data';

// Tableaux pour stocker les questions et les tags
const questions = [];
const tags = [][3];

// Lire le contenu du répertoire
fs.readdir(cheminDuRepertoire, (err, fichiers) => {
    if (err) {
        console.error("Erreur lors de la lecture du répertoire :", err);
        return
    }

    // Filtrer les fichiers avec l'extension .gift
    const fichiersGift = fichiers.filter(fichier => path.extname(fichier) === '.gift');

    // Afficher le contenu de chaque fichier .gift
    fichiersGift.forEach((fichier) => {
        const cheminDuFichier = path.join(cheminDuRepertoire, fichier);

        // Lire le contenu du fichier
        fs.readFile(cheminDuFichier, 'utf-8', (err, contenu) => {
            if (err) {
                console.error(`Erreur lors de la lecture du fichier ${fichier} :`, err);
            } else {
                // Ajouter le nom du fichier et son contenu
                console.log(`Fichier : ${fichier}, Contenu : ${contenu}`);

                // Analyser le contenu GIFT
                const lignes = contenu.split('\n');
                let tag = null;
                let question = null;
                let reponses = [];

                for (let ligne of lignes) {
                    // Extraire le tag
                    const tagMatch = ligne.match(/^::(.*?)::/);
                    if (tagMatch) {
                        tag = tagMatch[1];
                        tags.push(tag);
                    }

                    // Extraire la question
                    const questionMatch = ligne.match(/^{(.*?)}/);
                    if (questionMatch) {
                        // Extraire le titre de la question
                        question = questionMatch[1].trim();
                        questions.push({ tag, question, reponses });
                        console.log(`  Titre de la question : ${question}`);
                    }

                    // Extraire les réponses
                    const reponseMatch = ligne.match(/^[=~].*?(\b.*)/);
                    if (reponseMatch) {
                        reponses.push(reponseMatch[1].trim());
                    }
                }
            }
        });
    });
});

// Attendre la fin de l'exécution de toutes les lectures de fichiers
setTimeout(() => {
    // Afficher les questions et les tags
    console.log('\nTags :', tags);
    console.log('\nQuestions :', questions);
}, 1000); // Utilisez une temporisation pour attendre la fin des lectures de fichiers (peut nécessiter ajustement)
