const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const extractionDesDonnees = () => {
    const cheminDuRepertoire = './SujetB_data';
    const questionsData = [];

    return new Promise((resolve, reject) => {
        fs.readdir(cheminDuRepertoire, (err, fichiers) => {
            if (err) {
                console.error("Erreur lors de la lecture du répertoire :", err);
                reject(err);
                return;
            }

            const fichiersGift = fichiers.filter(fichier => path.extname(fichier) === '.gift');
            let filesProcessed = 0;

            const processFile = (fichier, contenu) => {
                const questions = contenu.split('\n\n');

                questions.forEach(questionData => {
                    if (!questionData.startsWith('//')) {
                        const tagMatch = questionData.match(/::(.*?)::/);
                        const tag = tagMatch ? tagMatch[1].trim() : null;
                        const questionTextMatch = questionData.match(/::.*?::(.*?)[\r\n]/);
                        const questionText = questionTextMatch ? questionTextMatch[1].trim() : null;

                        const cleanedQuestionText = questionText
                            ? questionText.replace(/\[html\]/g, '').replace(/{.*?}/g, '').replace(/<br>/g, '')
                            : null;

                        if (tag !== null && cleanedQuestionText !== null) {
                            questionsData.push({ tag, questionText: cleanedQuestionText });
                        }
                    }
                });

                filesProcessed++;

                if (filesProcessed === fichiersGift.length) {
                    resolve(questionsData);
                }
            };

            const askUserToDisplayQuestionsData = () => {
                rl.question('Voulez-vous afficher les données ? (oui/non) ', (reponse) => {
                    if (reponse.toLowerCase() === 'oui') {
                        displayQuestionsData();
                    } else {
                        console.log('Données non affichées.');
                    }

                    rl.close();
                });
            };

            const displayQuestionsData = () => {
                console.table(questionsData);
                console.log(questionsData);
            };

            fichiersGift.forEach((fichier) => {
                const cheminDuFichier = path.join(cheminDuRepertoire, fichier);

                fs.readFile(cheminDuFichier, 'utf-8', (err, contenu) => {
                    if (err) {
                        console.error(`Erreur lors de la lecture du fichier ${fichier} :`, err);
                    } else {
                        processFile(fichier, contenu);
                    }
                });
            });
        });
    });
};

module.exports = extractionDesDonnees;
