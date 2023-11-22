const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Interface pour la lecture depuis la console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Fonction d'extraction des données
const extractionDesDonnees = () => {
    // Spécifiez le chemin du répertoire
    const cheminDuRepertoire = './SuetB_data';

    // Tableau pour stocker les données (tag et texte de la question)
    const questionsData = [];

    // Lire le contenu du répertoire
    fs.readdir(cheminDuRepertoire, (err, fichiers) => {
        if (err) {
            console.error("Erreur lors de la lecture du répertoire :", err);
            return;
        }

        // Filtrer les fichiers avec l'extension .gift
        const fichiersGift = fichiers.filter(fichier => path.extname(fichier) === '.gift');

        // Compteur pour les fichiers
        let filesProcessed = 0;

        // Fonction pour traiter un fichier
        const processFile = (fichier, contenu) => {
            // Analyser le contenu GIFT
            const questions = contenu.split('\n\n'); // Séparer les questions par une ligne vide

            questions.forEach(questionData => {
                // Ignorer les commentaires
                if (!questionData.startsWith('//')) {
                    // Extraire le tag et le texte de la question
                    const tagMatch = questionData.match(/::(.*?)::/);
                    const tag = tagMatch ? tagMatch[1].trim() : null;
                    const questionTextMatch = questionData.match(/::.*?::(.*?)[\r\n]/);
                    const questionText = questionTextMatch ? questionTextMatch[1].trim() : null;

                    // Supprimer les balises [html], les accolades {} et les balises <br>
                    const cleanedQuestionText = questionText
                        ? questionText.replace(/\[html\]/g, '').replace(/{.*?}/g, '').replace(/<br>/g, '')
                        : null;

                    // Ajouter les données au tableau si le tag et le texte sont définis
                    if (tag !== null && cleanedQuestionText !== null) {
                        questionsData.push({ tag, questionText: cleanedQuestionText });
                    }
                }
            });

            // Augmenter le compteur des fichiers traités
            filesProcessed++;

            // Si tous les fichiers ont été traités, demander à l'utilisateur s'il veut afficher les données
            if (filesProcessed === fichiersGift.length) {
                askUserToDisplayQuestionsData();
            }
        };

        // Fonction pour demander à l'utilisateur s'il veut afficher les données
        const askUserToDisplayQuestionsData = () => {
            rl.question('Voulez-vous afficher les données ? (oui/non) ', (reponse) => {
                if (reponse.toLowerCase() === 'oui') {
                    displayQuestionsData();
                } else {
                    console.log('Données non affichées.');
                }

                // Fermer l'interface de lecture
                rl.close();
            });
        };

        // Fonction pour afficher les données
        const displayQuestionsData = () => {
            // Afficher les données sous forme de tableau
            console.table(questionsData)
            console.log(questionsData);
        };

        // Traiter chaque fichier .gift
        fichiersGift.forEach((fichier) => {
            const cheminDuFichier = path.join(cheminDuRepertoire, fichier);

            // Lire le contenu du fichier
            fs.readFile(cheminDuFichier, 'utf-8', (err, contenu) => {
                if (err) {
                    console.error(`Erreur lors de la lecture du fichier ${fichier} :`, err);
                } else {
                    // Appeler la fonction pour traiter le fichier
                    processFile(fichier, contenu);
                }
            });
        });
    });
    return questionsData;
};

